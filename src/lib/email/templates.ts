import { QuestionnaireData } from '@/types/questionnaire';

/**
 * Formátování času - bezpečně zpracuje jak Date objekt, tak string
 */
export function formatDate(date: Date | string): string {
  try {
    // Pokud je date string, převedeme ho na Date objekt
    const dateObj = date instanceof Date ? date : new Date(date);

    // Ověříme, zda je datum platné
    if (isNaN(dateObj.getTime())) {
      // Pokud je datum neplatné, vrátíme aktuální datum a čas
      console.warn('Neplatné datum, použití aktuálního času:', date);
      return new Intl.DateTimeFormat('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date());
    }

    return new Intl.DateTimeFormat('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  } catch (error) {
    console.error('Chyba při formátování data:', error);
    // Při jakékoliv chybě vrátíme aktuální datum
    return new Intl.DateTimeFormat('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  }
}

/**
 * Převod pole na odrážkový seznam
 */
export function arrayToList(arr: string[]): string {
  return arr.map(item => `  - ${item}`).join('\n');
}

/**
 * Generování obsahu e-mailu s dotazníkem pro obchodního manažera
 */
export function generateEmailContent(data: QuestionnaireData): string {
  const { contactInfo, businessInfo, productInterest, expectations, communicationPreference } = data;

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

/**
 * Generování obsahu potvrzovacího e-mailu pro zákazníka
 */
export function generateConfirmationEmailContent(data: QuestionnaireData): string {
  const { contactInfo } = data;

  return `
Dobrý den, ${contactInfo.fullName},

děkujeme za vyplnění dotazníku a váš zájem o spolupráci s VINARIA s.r.o.

Váš požadavek jsme přijali a bude zpracován v nejbližším možném termínu.
Náš obchodní manažer Ing. Roman Fiala vás bude kontaktovat do 24 hodin (v pracovní dny)
s nabídkou šitou na míru vašim potřebám.

Pokud byste měli jakékoliv dotazy, neváhejte nás kontaktovat na:
- Telefon: +420 734 720 994
- E-mail: fiala@vinaria.cz

S pozdravem,
Tým VINARIA s.r.o.
Jugoslávská 868/4a
613 00 Brno
www.vinaria.cz
`;
}
