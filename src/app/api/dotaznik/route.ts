import { NextResponse } from 'next/server';
import { QuestionnaireData } from '@/types/questionnaire';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const appendFile = promisify(fs.appendFile);
const mkdir = promisify(fs.mkdir);

// Funkce pro validaci formulářových dat
function validateFormData(data: any): { isValid: boolean; errors?: string[] } {
  const errors: string[] = [];

  // Kontrola, zda data existují
  if (!data) {
    return { isValid: false, errors: ['Nebyla poskytnuta žádná data'] };
  }

  // Kontrola kontaktních údajů
  if (!data.contactInfo) {
    errors.push('Chybí kontaktní údaje');
  } else {
    const { fullName, email, phone, companyName } = data.contactInfo;
    if (!fullName) errors.push('Chybí jméno a příjmení');
    if (!email) errors.push('Chybí e-mail');
    if (!phone) errors.push('Chybí telefonní číslo');
    if (!companyName) errors.push('Chybí název společnosti');
  }

  // Kontrola informací o podnikání
  if (!data.businessInfo) {
    errors.push('Chybí informace o podnikání');
  } else {
    const { businessType, city, businessYears } = data.businessInfo;
    if (!businessType) errors.push('Chybí typ podnikání');
    if (!city) errors.push('Chybí město');
    if (!businessYears) errors.push('Chybí délka podnikání');
  }

  // Kontrola zájmu o produkty
  if (!data.productInterest) {
    errors.push('Chybí informace o zájmu o produkty');
  } else {
    const { wineTypes, originCountries, monthlyVolume, preferredPackaging } = data.productInterest;
    if (!wineTypes || wineTypes.length === 0) errors.push('Nevybrán žádný typ produktu');
    if (!originCountries || originCountries.length === 0) errors.push('Nevybrána žádná země původu');
    if (!monthlyVolume) errors.push('Chybí předpokládaný měsíční odběr');
    if (!preferredPackaging || preferredPackaging.length === 0) errors.push('Nevybráno žádné preferované balení');
  }

  // Kontrola očekávání
  if (!data.expectations) {
    errors.push('Chybí informace o očekáváních');
  } else {
    const { priorities } = data.expectations;
    if (!priorities || priorities.length === 0) errors.push('Nevybrána žádná priorita');
  }

  // Kontrola preferencí komunikace
  if (!data.communicationPreference) {
    errors.push('Chybí preference komunikace');
  } else {
    const { preferredContact, timeFrame, gdprConsent } = data.communicationPreference;
    if (!preferredContact) errors.push('Chybí preferovaný způsob kontaktu');
    if (!timeFrame) errors.push('Chybí časový horizont');
    if (!gdprConsent) errors.push('Chybí souhlas se zpracováním osobních údajů');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}

// Funkce pro generování obsahu e-mailu
function generateEmailContent(data: QuestionnaireData): string {
  const { contactInfo, businessInfo, productInterest, expectations, communicationPreference } = data;

  // Formátování času
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Převod pole na odrážkový seznam
  const arrayToList = (arr: string[]): string => {
    return arr.map(item => `  - ${item}`).join('\n');
  };

  // Sestavení e-mailu
  return `
Nový dotazník - zájemce o spolupráci
========================================
Odesláno: ${formatDate(data.submittedAt)}

KONTAKTNÍ ÚDAJE
----------------------------------------
Jméno a příjmení: ${contactInfo.fullName}
E-mail: ${contactInfo.email}
Telefon: ${contactInfo.phone}
Společnost: ${contactInfo.companyName}
${contactInfo.ico ? `IČO: ${contactInfo.ico}` : ''}

INFORMACE O PODNIKÁNÍ
----------------------------------------
Typ podniku: ${businessInfo.businessType === 'other' ? businessInfo.businessTypeOther : businessInfo.businessType}
Město: ${businessInfo.city}
${businessInfo.address ? `Adresa: ${businessInfo.address}` : ''}
Délka podnikání: ${businessInfo.businessYears}

ZÁJEM O PRODUKTY
----------------------------------------
Typy produktů:
${arrayToList(productInterest.wineTypes)}

Země původu:
${arrayToList(productInterest.originCountries)}
${productInterest.originCountriesOther ? `Další země: ${productInterest.originCountriesOther}` : ''}

Předpokládaný měsíční odběr: ${productInterest.monthlyVolume}

Preferované balení:
${arrayToList(productInterest.preferredPackaging)}

OČEKÁVÁNÍ OD SPOLUPRÁCE
----------------------------------------
Priority:
${arrayToList(expectations.priorities)}
${expectations.prioritiesOther ? `Další priority: ${expectations.prioritiesOther}` : ''}

${expectations.specialRequirements ? `Speciální požadavky:\n${expectations.specialRequirements}` : ''}

PREFERENCE KOMUNIKACE
----------------------------------------
Preferovaný kontakt: ${communicationPreference.preferredContact}
${communicationPreference.preferredTime ? `Preferovaný čas: ${communicationPreference.preferredTime}` : ''}
Časový horizont: ${communicationPreference.timeFrame}
${communicationPreference.additionalNotes ? `Dodatečné poznámky:\n${communicationPreference.additionalNotes}` : ''}

GDPR souhlas: ${communicationPreference.gdprConsent ? 'Ano' : 'Ne'}
`;
}

// Funkce pro odeslání e-mailu (placeholder - bude potřeba implementovat skutečné odesílání)
async function sendEmail(to: string, subject: string, content: string): Promise<boolean> {
  // V produkčním prostředí by zde bylo použito např. nodemailer nebo externí služby jako SendGrid, Mailgun atd.
  // Zde pouze log do konzole pro demonstraci
  console.log(`Odesílání e-mailu na: ${to}`);
  console.log(`Předmět: ${subject}`);
  console.log(`Obsah: ${content}`);

  // Pro testování zde uložíme e-mail jako soubor (v produkci by bylo nahrazeno skutečným odesláním)
  try {
    // Zajistíme, že existuje složka pro logy
    const logsDir = path.join(process.cwd(), 'logs');
    await mkdir(logsDir, { recursive: true });

    // Uložíme e-mail do souboru
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(logsDir, `email-${timestamp}.txt`);
    await writeFile(filePath, content);

    return true;
  } catch (error) {
    console.error('Chyba při ukládání e-mailu:', error);
    return false;
  }
}

// Funkce pro uložení dat
async function logFormData(data: QuestionnaireData): Promise<boolean> {
  try {
    // Zajistíme, že existuje složka pro logy
    const logsDir = path.join(process.cwd(), 'logs');
    await mkdir(logsDir, { recursive: true });

    // Připravíme data pro log
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      ...data,
    };

    // Přidáme záznam do logu
    const logFilePath = path.join(logsDir, 'form-submissions.json');
    let existingLog: any[] = [];

    try {
      // Pokud soubor existuje, načteme ho
      const fileContent = fs.readFileSync(logFilePath, 'utf-8');
      existingLog = JSON.parse(fileContent);
    } catch (err) {
      // Soubor neexistuje nebo je prázdný, vytvoříme nový log
      existingLog = [];
    }

    // Přidáme nový záznam
    existingLog.push(logEntry);

    // Uložíme aktualizovaný log
    await writeFile(logFilePath, JSON.stringify(existingLog, null, 2));

    return true;
  } catch (error) {
    console.error('Chyba při logování dat:', error);
    return false;
  }
}

// Hlavní handler pro HTTP POST požadavek
export async function POST(request: Request) {
  try {
    // Získání dat z požadavku
    const data = await request.json();

    // Validace dat
    const validation = validateFormData(data);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Neplatná data formuláře',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    // Typování dat jako QuestionnaireData
    const formData = data as QuestionnaireData;

    // Vytvoření obsahu e-mailu
    const emailContent = generateEmailContent(formData);

    // Odeslání e-mailu
    const emailSent = await sendEmail(
      'fiala@vinaria.cz', // Zde bude e-mail obchodního manažera
      'Nový dotazník - zájemce o spolupráci',
      emailContent
    );

    // Uložení dat do logu
    const dataLogged = await logFormData(formData);

    // Odpověď klientovi
    if (emailSent && dataLogged) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Došlo k chybě při zpracování formuláře'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Chyba při zpracování dotazníku:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Došlo k neočekávané chybě při zpracování formuláře'
      },
      { status: 500 }
    );
  }
}
