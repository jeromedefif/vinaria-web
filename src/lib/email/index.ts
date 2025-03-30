// Export pouze nejnutnějších věcí z každého modulu
export { generateEmailContent, generateConfirmationEmailContent } from './templates';
export type { EmailConfig, EmailOptions, QuestionnaireEmailOptions } from './types';
export { businessManagerEmail, testEmailConnection } from './config';
export { sendQuestionnaireEmailWithResend } from './resend';
