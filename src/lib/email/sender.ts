import { transporter, defaultSender, businessManagerEmail, testEmailConnection } from './config';
import { EmailOptions, QuestionnaireEmailOptions } from './types';
import { QuestionnaireData } from '@/types/questionnaire';
import { generateEmailContent, generateConfirmationEmailContent } from './templates';

/**
 * Obecná funkce pro odesílání e-mailů
 */
export async function sendEmail(options: EmailOptions): Promise<{success: boolean, error?: string}> {
  try {
    // Otestujeme připojení k emailovému serveru
    const connectionOk = await testEmailConnection();
    if (!connectionOk) {
      console.error('Nepodařilo se připojit k emailovému serveru');
      return {
        success: false,
        error: 'Nepodařilo se připojit k emailovému serveru. Kontaktujte nás prosím telefonicky.'
      };
    }

    const mailOptions = {
      from: options.from || defaultSender,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo
    };

    console.log(`Odesílání e-mailu na adresu: ${options.to}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail úspěšně odeslán:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error);
    const errorMessage = error instanceof Error ? error.message : 'Neznámá chyba';
    return { success: false, error: errorMessage };
  }
}

/**
 * Funkce pro odeslání dotazníku obchodnímu manažerovi
 * a volitelně potvrzovacího e-mailu zákazníkovi
 */
export async function sendQuestionnaireEmail(
  data: QuestionnaireData,
  options?: Partial<QuestionnaireEmailOptions>
): Promise<{success: boolean, customerEmailSent?: boolean, error?: string}> {
  try {
    console.log('Odesílání dotazníkového e-mailu, data:', {
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

    const managerEmailResult = await sendEmail({
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
        const customerEmailResult = await sendEmail({
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
