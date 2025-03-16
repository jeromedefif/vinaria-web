import { TransportOptions } from 'nodemailer';

// Konfigurace e-mailového serveru
export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Základní struktura e-mailu
export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
}

// Rozšíření pro dotazníkový e-mail
export interface QuestionnaireEmailOptions extends EmailOptions {
  customerEmail?: string; // E-mail zákazníka pro potvrzení
  sendConfirmation?: boolean; // Zda poslat potvrzovací e-mail zákazníkovi
}
