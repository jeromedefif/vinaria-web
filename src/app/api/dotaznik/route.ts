import { NextResponse } from 'next/server';
import { QuestionnaireData } from '@/types/questionnaire';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { sendQuestionnaireEmail } from '@/lib/email/sender';

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Funkce pro validaci formulářových dat
function validateFormData(data: any): { isValid: boolean; errors?: string[] } {
  console.log('Validace dat formuláře:', JSON.stringify(data, null, 2));

  const errors: string[] = [];

  // Kontrola, zda data existují
  if (!data) {
    console.error('Žádná data nebyla poskytnuta');
    return { isValid: false, errors: ['Nebyla poskytnuta žádná data'] };
  }

  // Kontrola kontaktních údajů
  if (!data.contactInfo) {
    errors.push('Chybí kontaktní údaje');
    console.error('Chybí kontaktní údaje');
  } else {
    const { fullName, email, phone, companyName } = data.contactInfo;
    if (!fullName) {
      errors.push('Chybí jméno a příjmení');
      console.error('Chybí jméno a příjmení');
    }
    if (!email) {
      errors.push('Chybí e-mail');
      console.error('Chybí e-mail');
    }
    if (!phone) {
      errors.push('Chybí telefonní číslo');
      console.error('Chybí telefonní číslo');
    }
    if (!companyName) {
      errors.push('Chybí název společnosti');
      console.error('Chybí název společnosti');
    }
  }

  // Kontrola informací o podnikání
  if (!data.businessInfo) {
    errors.push('Chybí informace o podnikání');
    console.error('Chybí informace o podnikání');
  } else {
    const { businessType, city, businessYears } = data.businessInfo;
    if (!businessType) {
      errors.push('Chybí typ podnikání');
      console.error('Chybí typ podnikání');
    }
    if (!city) {
      errors.push('Chybí město');
      console.error('Chybí město');
    }
    if (!businessYears) {
      errors.push('Chybí délka podnikání');
      console.error('Chybí délka podnikání');
    }
  }

  // Kontrola zájmu o produkty
  if (!data.productInterest) {
    errors.push('Chybí informace o zájmu o produkty');
    console.error('Chybí informace o zájmu o produkty');
  } else {
    const { wineTypes, originCountries, monthlyVolume, preferredPackaging } = data.productInterest;
    if (!wineTypes || wineTypes.length === 0) {
      errors.push('Nevybrán žádný typ produktu');
      console.error('Nevybrán žádný typ produktu');
    }
    if (!originCountries || originCountries.length === 0) {
      errors.push('Nevybrána žádná země původu');
      console.error('Nevybrána žádná země původu');
    }
    if (!monthlyVolume) {
      errors.push('Chybí předpokládaný měsíční odběr');
      console.error('Chybí předpokládaný měsíční odběr');
    }
    if (!preferredPackaging || preferredPackaging.length === 0) {
      errors.push('Nevybráno žádné preferované balení');
      console.error('Nevybráno žádné preferované balení');
    }
  }

  // Kontrola očekávání
  if (!data.expectations) {
    errors.push('Chybí informace o očekáváních');
    console.error('Chybí informace o očekáváních');
  } else {
    const { priorities } = data.expectations;
    if (!priorities || priorities.length === 0) {
      errors.push('Nevybrána žádná priorita');
      console.error('Nevybrána žádná priorita');
    }
  }

  // Kontrola preferencí komunikace
  if (!data.communicationPreference) {
    errors.push('Chybí preference komunikace');
    console.error('Chybí preference komunikace');
  } else {
    const { preferredContact, timeFrame } = data.communicationPreference;
    if (!preferredContact) {
      errors.push('Chybí preferovaný způsob kontaktu');
      console.error('Chybí preferovaný způsob kontaktu');
    }
    if (!timeFrame) {
      errors.push('Chybí časový horizont');
      console.error('Chybí časový horizont');
    }

    // GDPR souhlas - automaticky nastavíme na true, pokud chybí nebo je false
    // Předpokládáme, že pokud uživatel odeslal formulář, souhlasí s GDPR
    if (data.communicationPreference.gdprConsent === undefined ||
        data.communicationPreference.gdprConsent === false) {
      console.log('GDPR souhlas chybí nebo je false, automaticky nastavujeme na true');
      data.communicationPreference.gdprConsent = true;
    }
  }

  const isValid = errors.length === 0;
  console.log(`Validace ${isValid ? 'úspěšná' : 'neúspěšná'}, počet chyb: ${errors.length}`);
  if (!isValid) {
    console.log('Chyby:', errors);
  }

  return {
    isValid,
    errors: errors.length > 0 ? errors : undefined,
  };
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
// Hlavní handler pro HTTP POST požadavek
export async function POST(request: Request) {
  try {
    console.log('POST požadavek na /api/dotaznik');

    // Získání dat z požadavku
    const data = await request.json();
    console.log('Data přijata z formuláře');

    // Kontrola honeypot pole
    if (data.communicationPreference && data.communicationPreference.website) {
      console.log('Detekován bot - honeypot pole bylo vyplněno');
      return NextResponse.json(
        {
          success: true // Vracíme true, aby bot nemohl zjistit, že byl detekován
        },
        { status: 200 }
      );
    }

    // VLOŽIT ČASOVOU KONTROLU ZDE
    // Kontrola doby vyplnění - minimálně 10 sekund pro legitimní vyplnění
    if (data.formCompletionTime && data.formCompletionTime < 10000) {
      console.log('Podezřelé vyplnění - formulář vyplněn příliš rychle:', data.formCompletionTime, 'ms');
      // Můžeme formulář odmítnout nebo označit jako potenciální spam
      return NextResponse.json(
        {
          success: true // Vracíme true, aby bot nemohl zjistit, že byl detekován
        },
        { status: 200 }
      );
    }

    // Validace dat
    const validation = validateFormData(data);
    if (!validation.isValid) {
      console.error('Validace selhala:', validation.errors);
      return NextResponse.json(
        {
          success: false,
          message: 'Neplatná data formuláře',
          errors: validation.errors
        },
        { status: 400 }
      );
    }

    console.log('Validace úspěšná, zpracování dat');

    // Typování dat jako QuestionnaireData
    // Ujistíme se, že submittedAt je správně zpracované jako objekt Date
    const formData = {
      ...data,
      submittedAt: new Date() // Nastavíme aktuální čas serveru
    } as QuestionnaireData;

    console.log('Připraveno k odeslání e-mailu a uložení dat');

    // Odeslání e-mailu pomocí Nodemailer
    const emailResult = await sendQuestionnaireEmail(formData, {
      sendConfirmation: true // Odeslat potvrzovací e-mail zákazníkovi
    });

    console.log('Výsledek odesílání e-mailu:', emailResult);

    // Uložení dat do logu
    const dataLogged = await logFormData(formData);
    console.log('Uložení dat do logu:', dataLogged ? 'úspěšné' : 'neúspěšné');

    // Odpověď klientovi
    if (emailResult.success && dataLogged) {
      console.log('Formulář úspěšně zpracován');
      return NextResponse.json({
        success: true,
        customerEmailSent: emailResult.customerEmailSent
      }, { status: 200 });
    } else {
      console.error('Došlo k chybě při zpracování formuláře:', {
        emailSent: emailResult.success,
        dataLogged,
        error: emailResult.error
      });

      return NextResponse.json(
        {
          success: false,
          message: 'Došlo k chybě při zpracování formuláře',
          emailSent: emailResult.success,
          dataLogged,
          error: emailResult.error
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Neočekávaná chyba při zpracování dotazníku:', error);
    if (error instanceof Error) {
      console.error('Detail chyby:', error.message);
      console.error('Stack trace:', error.stack);
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Došlo k neočekávané chybě při zpracování formuláře',
        error: error instanceof Error ? error.message : 'Neznámá chyba'
      },
      { status: 500 }
    );
  }
}
