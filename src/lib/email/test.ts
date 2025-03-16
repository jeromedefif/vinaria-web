import { transporter, defaultSender } from './config';

/**
 * Funkce pro testování e-mailového připojení
 * Použití pouze pro vývojové/testovací účely
 */
export async function testEmailConnection() {
  try {
    // Otestování SMTP připojení
    const connection = await transporter.verify();

    if (connection) {
      console.log('SMTP Server je připraven k odesílání e-mailů');
      return true;
    } else {
      console.error('Chyba při ověřování SMTP připojení');
      return false;
    }
  } catch (error) {
    console.error('Chyba při testování e-mailového připojení:', error);
    return false;
  }
}

/**
 * Funkce pro odeslání testovacího e-mailu
 * Použití pouze pro vývojové/testovací účely
 */
export async function sendTestEmail(to: string) {
  try {
    const info = await transporter.sendMail({
      from: defaultSender,
      to,
      subject: 'Test e-mailového připojení - VINARIA s.r.o.',
      text: `Toto je testovací e-mail z aplikace VINARIA.

Čas odeslání: ${new Date().toLocaleString('cs-CZ')}

Pokud jste tento e-mail obdrželi, znamená to, že vaše e-mailové připojení funguje správně.

S pozdravem,
Tým VINARIA s.r.o.`
    });

    console.log('Testovací e-mail odeslán:', info.messageId);
    return true;
  } catch (error) {
    console.error('Chyba při odesílání testovacího e-mailu:', error);
    return false;
  }
}
