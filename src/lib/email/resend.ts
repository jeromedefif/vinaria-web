import { Resend } from 'resend';
import { QuestionnaireData } from '@/types/questionnaire';
import { generateEmailContent, generateConfirmationEmailContent } from './templates';
import { businessManagerEmail } from './config';

// Vytvoření instance Resend API klienta
const resendApiKey = process.env.RESEND_API_KEY || '';
export const resend = new Resend(resendApiKey);

// Výchozí e-mailová adresa odesílatele - používáme beginy.cz doménu
export const defaultSender = process.env.EMAIL_FROM || 'info@beginy.cz';

/**
 * Funkce pro vytvoření JSON přílohy s daty dotazníku
 */
function createFormDataAttachment(data: QuestionnaireData): string {
  // Formátujeme JSON s odsazením pro lepší čitelnost
  return JSON.stringify(data, null, 2);
}

/**
 * Funkce pro odeslání emailu přes Resend API
 */
export async function sendWithResend({
  to,
  subject,
  text,
  html,
  from = defaultSender,
  replyTo,
  attachments = []
}: {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{ filename: string; content: string | Buffer; }>;
}) {
  try {
    if (!resendApiKey) {
      console.error('Chybí Resend API klíč');
      return { success: false, error: 'Chybí konfigurace pro odesílání emailů' };
    }

    console.log(`Odesílání e-mailu na adresu: ${to}`);

    // Vytvoříme objekt s povinnými parametry
    const emailData: {
      from: string;
      to: string[];
      subject: string;
      html?: string;
      text?: string;
      reply_to?: string;
      attachments?: Array<{
        filename: string;
        content: string;
        content_type?: string;
        content_disposition?: string;
      }>;
    } = {
      from,
      to: Array.isArray(to) ? to : [to],
      subject
    };

    // Přidáme buď text nebo html, ne obojí
    if (html) {
      emailData.html = html;
    } else if (text) {
      emailData.text = text;
    } else {
      // Pokud nemáme ani jedno, použijeme prázdný text
      emailData.text = '';
    }

    // Přidáme reply_to, pokud existuje
    if (replyTo) {
      emailData.reply_to = replyTo;
    }

    // Přidáme přílohy, pokud existují
    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments.map(attachment => {
        // Pokud je obsah Buffer, převedeme ho na Base64 string
        let base64Content: string;

        if (Buffer.isBuffer(attachment.content)) {
          base64Content = attachment.content.toString('base64');
        } else {
          // Převedeme string na Buffer a pak na Base64
          base64Content = Buffer.from(attachment.content).toString('base64');
        }

        return {
          filename: attachment.filename,
          content: base64Content,
          content_type: attachment.filename.endsWith('.json') ? 'application/json' : 'text/plain',
          content_disposition: 'attachment'
        };
      });
    }

    // @ts-ignore - Ignorujeme typovou chybu, protože víme, že naše data jsou správná
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Chyba při odesílání e-mailu přes Resend:', error);
      return { success: false, error: error.message };
    }

    console.log('E-mail úspěšně odeslán přes Resend:', data?.id);
    return { success: true };
  } catch (error) {
    console.error('Neočekávaná chyba při odesílání e-mailu přes Resend:', error);
    const errorMessage = error instanceof Error ? error.message : 'Neznámá chyba';
    return { success: false, error: errorMessage };
  }
}

/**
 * Funkce pro odeslání dotazníku obchodnímu manažerovi přes Resend
 */
export async function sendQuestionnaireEmailWithResend(
  data: QuestionnaireData,
  options?: {
    to?: string;
    subject?: string;
    sendConfirmation?: boolean;
  }
): Promise<{success: boolean, customerEmailSent?: boolean, error?: string}> {
  try {
    console.log('Odesílání dotazníkového e-mailu přes Resend, data:', {
      contactInfo: data.contactInfo,
      submittedAt: data.submittedAt
    });

    // Příprava e-mailu pro obchodního manažera
    let managerEmailContent;
    try {
      managerEmailContent = generateEmailContent(data);
    } catch (err) {
      console.error('Chyba při generování obsahu e-mailu:', err);
      throw new Error('Nepodařilo se vygenerovat obsah e-mailu');
    }

    // Vytvoření přílohy s JSON daty z formuláře
    const formDataJson = createFormDataAttachment(data);

    // Vytvoření názvu souboru s aktuálním datem a jménem zákazníka
    const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
    const customerName = data.contactInfo.fullName.replace(/\s+/g, '_');
    const attachmentFilename = `dotaznik_${customerName}_${timestampStr}.json`;

    // Odeslání emailu s přílohou
    const managerEmailResult = await sendWithResend({
      to: options?.to || businessManagerEmail,
      subject: options?.subject || 'Nový dotazník - zájemce o spolupráci',
      text: managerEmailContent,
      replyTo: data.contactInfo.email,
      attachments: [
        {
          filename: attachmentFilename,
          content: formDataJson
        }
      ]
    });

    if (!managerEmailResult.success) {
      console.error('Nepodařilo se odeslat e-mail obchodnímu manažerovi:', managerEmailResult.error);
      return {
        success: false,
        error: `Nepodařilo se odeslat e-mail: ${managerEmailResult.error}`
      };
    }

    // Odeslání potvrzovacího e-mailu zákazníkovi, pokud je požadováno
    let customerEmailSent = false;
    if (options?.sendConfirmation && data.contactInfo.email) {
      try {
        const confirmationContent = generateConfirmationEmailContent(data);
        const customerEmailResult = await sendWithResend({
          to: data.contactInfo.email,
          subject: 'Potvrzení přijetí dotazníku - VINARIA s.r.o.',
          text: confirmationContent
        });
        customerEmailSent = customerEmailResult.success;

        if (!customerEmailResult.success) {
          console.warn('Nepodařilo se odeslat potvrzovací e-mail zákazníkovi:', customerEmailResult.error);
          // Pokračujeme i když se nepodaří odeslat potvrzovací email
        }
      } catch (err) {
        console.error('Chyba při odesílání potvrzovacího e-mailu:', err);
        // Pokračujeme i v případě, že se nepodaří odeslat potvrzovací e-mail
      }
    }

    return {
      success: true,
      customerEmailSent: options?.sendConfirmation ? customerEmailSent : undefined
    };
  } catch (error) {
    console.error('Chyba při odesílání dotazníkového e-mailu:', error);
    const errorMessage = error instanceof Error ? error.message : 'Neznámá chyba';
    return { success: false, error: errorMessage };
  }
}
