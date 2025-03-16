import { transporter, defaultSender, businessManagerEmail } from './config';
import { EmailOptions, QuestionnaireEmailOptions } from './types';
import { QuestionnaireData } from '@/types/questionnaire';
import { generateEmailContent, generateConfirmationEmailContent } from './templates';

/**
 * Obecná funkce pro odesílání e-mailů
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: options.from || defaultSender,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail úspěšně odeslán:', info.messageId);
    return true;
  } catch (error) {
    console.error('Chyba při odesílání e-mailu:', error);
    return false;
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

     const managerEmailSuccess = await sendEmail({
       to: options?.to || businessManagerEmail,
       subject: options?.subject || 'Nový dotazník - zájemce o spolupráci',
       text: managerEmailContent,
       replyTo: data.contactInfo.email
     });

     // Odeslání potvrzovacího e-mailu zákazníkovi, pokud je požadováno
     let customerEmailSent = false;
     if (options?.sendConfirmation && data.contactInfo.email) {
       try {
         const confirmationContent = generateConfirmationEmailContent(data);
         customerEmailSent = await sendEmail({
           to: data.contactInfo.email,
           subject: 'Potvrzení přijetí dotazníku - VINARIA s.r.o.',
           text: confirmationContent
         });
       } catch (err) {
         console.error('Chyba při odesílání potvrzovacího e-mailu:', err);
         // Pokračujeme i v případě, že se nepodaří odeslat potvrzovací e-mail
       }
     }

     return {
       success: managerEmailSuccess,
       customerEmailSent: options?.sendConfirmation ? customerEmailSent : undefined
     };
   } catch (error) {
     console.error('Chyba při odesílání dotazníkového e-mailu:', error);
     const errorMessage = error instanceof Error ? error.message : 'Neznámá chyba';
     return { success: false, error: errorMessage };
   }
 }
