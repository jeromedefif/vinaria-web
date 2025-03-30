// Exporty z původních modulů
export * from './types';
export * from './templates';
export { EmailConfig, EmailOptions, QuestionnaireEmailOptions } from './types';

// Exporty z config.ts
export {
  createTransporter,
  transporter,
  defaultSender as smtpDefaultSender,
  businessManagerEmail,
  testEmailConnection
} from './config';

// Exporty z resend.ts
export {
  resend,
  sendWithResend,
  sendQuestionnaireEmailWithResend,
  defaultSender as resendDefaultSender
} from './resend';
