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
 * Funkce pro odeslání emailu přes Resend API
 */
export async function sendWithResend({
  to,
  subject,
  text,
  html,
  from = defaultSender,
  replyTo
}: {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
}) {
  try {
    if (!resendApiKey) {
      console.error('Chybí Resend API klíč');
      return { success: false, error: 'Chybí konfigurace pro odesílání emailů' };
    }

    console.log(`Odesílání e-mailu na adresu: ${to}`);

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html,
      reply_to: replyTo
    });

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

    const managerEmailResult = await sendWithResend({
      to: options?.to || businessManagerEmail,
      subject: options?.subject || 'Nový dotazník - zájemce o spolupráci',
      text: managerEmailContent,
      replyTo: data.contactInfo.email
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
