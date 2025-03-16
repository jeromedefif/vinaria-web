import nodemailer from 'nodemailer';
import { EmailConfig } from './types';

// Funkce pro vytvoření transportéru na základě konfigurace
export function createTransporter(config?: Partial<EmailConfig>) {
  // Výchozí konfigurace z proměnných prostředí
  const defaultConfig: EmailConfig = {
    host: process.env.EMAIL_SERVER_HOST || '',
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
    secure: process.env.EMAIL_SERVER_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_SERVER_USER || '',
      pass: process.env.EMAIL_SERVER_PASSWORD || '',
    },
  };

  // Sloučení výchozí konfigurace s poskytnutou konfigurací
  const finalConfig = { ...defaultConfig, ...config };

  // Vytvoření transportéru
  return nodemailer.createTransport(finalConfig);
}

// Výchozí transportér s konfigurací z proměnných prostředí
export const transporter = createTransporter();

// Výchozí e-mailová adresa odesílatele
export const defaultSender = process.env.EMAIL_FROM || 'noreply@vinaria.cz';

// Adresa obchodního manažera pro přijímání dotazníků
export const businessManagerEmail = process.env.BUSINESS_MANAGER_EMAIL || 'fiala@vinaria.cz';
