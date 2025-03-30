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
    // Přidáváme další nastavení pro větší spolehlivost
    tls: {
      // Neověřujeme certifikát (může být potřeba pro některé SMTP servery)
      rejectUnauthorized: false
    },
    // Timeout 30 sekund
    connectionTimeout: 30000,
    // Počet pokusů při selhání
    maxConnections: 5,
    maxMessages: 100,
  };

  // Sloučení výchozí konfigurace s poskytnutou konfigurací
  const finalConfig = { ...defaultConfig, ...config };

  // Logování konfiguračních detailů (bez hesla)
  console.log('Email server configuration:', {
    host: finalConfig.host,
    port: finalConfig.port,
    secure: finalConfig.secure,
    user: finalConfig.auth.user,
    // heslo nelogujeme z bezpečnostních důvodů
  });

  // Vytvoření transportéru
  return nodemailer.createTransport(finalConfig);
}

// Výchozí transportér s konfigurací z proměnných prostředí
export const transporter = createTransporter();

// Výchozí e-mailová adresa odesílatele
export const defaultSender = process.env.EMAIL_FROM || 'fiala@vinaria.cz';

// Adresa obchodního manažera pro přijímání dotazníků
export const businessManagerEmail = process.env.BUSINESS_MANAGER_EMAIL || 'fiala@vinaria.cz';

// Funkce pro testování připojení k emailovému serveru
export async function testEmailConnection() {
  try {
    console.log('Testování připojení k emailovému serveru...');
    const result = await transporter.verify();
    console.log('Připojení k emailovému serveru úspěšné:', result);
    return true;
  } catch (error) {
    console.error('Chyba připojení k emailovému serveru:', error);
    return false;
  }
}
