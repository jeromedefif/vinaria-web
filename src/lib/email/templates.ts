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
 * Převod typu podniku na čitelný text
 */
function getBusinessTypeText(type: string, other?: string): string {
  switch(type) {
    case 'vinoteka': return 'Vinotéka';
    case 'restaurace': return 'Restaurace';
    case 'hotel': return 'Hotel';
    case 'vinarna': return 'Vinárna';
    case 'distributor': return 'Distribuční síť';
    case 'other': return other || 'Jiný typ podnikání';
    default: return type;
  }
}

/**
 * Převod země původu na čitelný text
 */
function getOriginCountryText(country: string): string {
  switch(country) {
    case 'cesko': return 'Česko/Morava';
    case 'rakousko': return 'Rakousko';
    case 'italie': return 'Itálie';
    case 'spanelsko': return 'Španělsko';
    case 'francie': return 'Francie';
    case 'moldavie': return 'Moldavsko';
    case 'other': return 'Jiná země';
    default: return country;
  }
}

/**
 * Převod měsíčního objemu na čitelný text
 */
function getMonthlyVolumeText(volume: string): string {
  switch(volume) {
    case 'do50l': return 'Do 50 litrů měsíčně';
    case '50-200l': return '50 - 200 litrů měsíčně';
    case '200-500l': return '200 - 500 litrů měsíčně';
    case '500-1000l': return '500 - 1000 litrů měsíčně';
    case 'nad1000l': return 'Nad 1000 litrů měsíčně';
    default: return volume;
  }
}

/**
 * Převod typu balení na čitelný text
 */
function getPackagingText(packaging: string): string {
  switch(packaging) {
    case 'keg': return 'KEG sudy (30L, 50L)';
    case 'bib': return 'Bag-in-Box (5L, 10L, 20L)';
    case 'pet': return 'PET lahve';
    case 'lahve': return 'Skleněné lahve';
    default: return packaging;
  }
}

/**
 * Převod priority na čitelný text
 */
function getPriorityText(priority: string): string {
  switch(priority) {
    case 'kvalita': return 'Kvalita produktů';
    case 'cena': return 'Cena';
    case 'logistika': return 'Spolehlivost dodávek / logistika';
    case 'sortiment': return 'Šíře sortimentu';
    case 'other': return 'Jiná priorita';
    default: return priority;
  }
}

/**
 * Převod typu produktu na čitelný text
 */
function getWineTypeText(type: string): string {
  switch(type) {
    case 'revova': return 'Révová vína';
    case 'ovocna': return 'Ovocná vína';
    case 'burcak': return 'Burčák';
    case 'napoje': return 'Ostatní alkoholické nápoje';
    case 'plyny': return 'Potravinářské plyny';
    case 'pet': return 'PET lahve';
    default: return type;
  }
}

/**
 * Převod preferovaného kontaktu na čitelný text
 */
function getPreferredContactText(contact: string): string {
  switch(contact) {
    case 'phone': return 'Telefonicky';
    case 'email': return 'E-mailem';
    case 'osobne': return 'Osobní návštěva obchodního zástupce';
    default: return contact;
  }
}

/**
 * Převod časového horizontu na čitelný text
 */
function getTimeFrameText(timeFrame: string): string {
  switch(timeFrame) {
    case 'immediate': return 'Co nejdříve (do týdne)';
    case 'week': return 'V horizontu týdnů';
    case 'month': return 'V horizontu měsíce';
    case 'quarter': return 'V horizontu 3 měsíců';
    default: return timeFrame;
  }
}

/**
 * Generování obsahu e-mailu s dotazníkem pro obchodního manažera (text verze)
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
Typ podniku: ${getBusinessTypeText(businessInfo.businessType, businessInfo.businessTypeOther)}
Město: ${businessInfo.city}
${businessInfo.address ? `Adresa: ${businessInfo.address}` : ''}
Délka podnikání: ${businessInfo.businessYears}

ZÁJEM O PRODUKTY
----------------------------------------
Typy produktů:
${productInterest.wineTypes.map(type => `  - ${getWineTypeText(type)}`).join('\n')}

Země původu:
${productInterest.originCountries.map(country => `  - ${getOriginCountryText(country)}`).join('\n')}
${productInterest.originCountriesOther ? `Další země: ${productInterest.originCountriesOther}` : ''}

Předpokládaný měsíční odběr: ${getMonthlyVolumeText(productInterest.monthlyVolume)}

Preferované balení:
${productInterest.preferredPackaging.map(packaging => `  - ${getPackagingText(packaging)}`).join('\n')}

OČEKÁVÁNÍ OD SPOLUPRÁCE
----------------------------------------
Priority:
${expectations.priorities.map(priority => `  - ${getPriorityText(priority)}`).join('\n')}
${expectations.prioritiesOther ? `Další priority: ${expectations.prioritiesOther}` : ''}

${expectations.specialRequirements ? `Speciální požadavky:\n${expectations.specialRequirements}` : ''}

PREFERENCE KOMUNIKACE
----------------------------------------
Preferovaný kontakt: ${getPreferredContactText(communicationPreference.preferredContact)}
${communicationPreference.preferredTime ? `Preferovaný čas: ${communicationPreference.preferredTime}` : ''}
Časový horizont: ${getTimeFrameText(communicationPreference.timeFrame)}
${communicationPreference.additionalNotes ? `Dodatečné poznámky:\n${communicationPreference.additionalNotes}` : ''}

GDPR souhlas: ${communicationPreference.gdprConsent ? 'Ano' : 'Ne'}
`;
}

/**
 * Generování HTML obsahu e-mailu s dotazníkem pro obchodního manažera
 */
export function generateEmailHtmlContent(data: QuestionnaireData): string {
  const { contactInfo, businessInfo, productInterest, expectations, communicationPreference } = data;

  // HTML šablona
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Nový dotazník - zájemce o spolupráci</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      color: #4E1A1F;
      border-bottom: 2px solid #C8A355;
      padding-bottom: 10px;
      font-size: 24px;
    }
    h2 {
      color: #4E1A1F;
      font-size: 18px;
      margin-top: 25px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table, th, td {
      border: 1px solid #ddd;
    }
    th {
      background-color: #f5f5f5;
      font-weight: bold;
      text-align: left;
      padding: 8px;
      width: 30%;
    }
    td {
      padding: 8px;
    }
    .section {
      margin-bottom: 30px;
    }
    .special-note {
      background-color: #f8f8f8;
      padding: 10px;
      border-left: 4px solid #C8A355;
      margin: 10px 0;
    }
    .timestamp {
      color: #777;
      font-style: italic;
      margin-bottom: 20px;
    }
    ul {
      margin: 0;
      padding-left: 20px;
    }
    li {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <h1>Nový dotazník - zájemce o spolupráci</h1>
  <div class="timestamp">Odesláno: ${formatDate(data.submittedAt)}</div>

  <div class="section">
    <h2>Kontaktní údaje</h2>
    <table>
      <tr>
        <th>Jméno a příjmení</th>
        <td>${contactInfo.fullName}</td>
      </tr>
      <tr>
        <th>E-mail</th>
        <td><a href="mailto:${contactInfo.email}">${contactInfo.email}</a></td>
      </tr>
      <tr>
        <th>Telefon</th>
        <td><a href="tel:${contactInfo.phone}">${contactInfo.phone}</a></td>
      </tr>
      <tr>
        <th>Společnost</th>
        <td>${contactInfo.companyName}</td>
      </tr>
      ${contactInfo.ico ? `
      <tr>
        <th>IČO</th>
        <td>${contactInfo.ico}</td>
      </tr>
      ` : ''}
    </table>
  </div>

  <div class="section">
    <h2>Informace o podnikání</h2>
    <table>
      <tr>
        <th>Typ podniku</th>
        <td>${getBusinessTypeText(businessInfo.businessType, businessInfo.businessTypeOther)}</td>
      </tr>
      <tr>
        <th>Město</th>
        <td>${businessInfo.city}</td>
      </tr>
      ${businessInfo.address ? `
      <tr>
        <th>Adresa</th>
        <td>${businessInfo.address}</td>
      </tr>
      ` : ''}
      <tr>
        <th>Délka podnikání</th>
        <td>${businessInfo.businessYears}</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>Zájem o produkty</h2>
    <table>
      <tr>
        <th>Typy produktů</th>
        <td>
          <ul>
            ${productInterest.wineTypes.map(type => `<li>${getWineTypeText(type)}</li>`).join('')}
          </ul>
        </td>
      </tr>
      <tr>
        <th>Země původu</th>
        <td>
          <ul>
            ${productInterest.originCountries.map(country => `<li>${getOriginCountryText(country)}</li>`).join('')}
            ${productInterest.originCountriesOther ? `<li>Další: ${productInterest.originCountriesOther}</li>` : ''}
          </ul>
        </td>
      </tr>
      <tr>
        <th>Předpokládaný měsíční odběr</th>
        <td>${getMonthlyVolumeText(productInterest.monthlyVolume)}</td>
      </tr>
      <tr>
        <th>Preferované balení</th>
        <td>
          <ul>
            ${productInterest.preferredPackaging.map(packaging => `<li>${getPackagingText(packaging)}</li>`).join('')}
          </ul>
        </td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h2>Očekávání od spolupráce</h2>
    <table>
      <tr>
        <th>Priority</th>
        <td>
          <ul>
            ${expectations.priorities.map(priority => `<li>${getPriorityText(priority)}</li>`).join('')}
            ${expectations.prioritiesOther ? `<li>Další: ${expectations.prioritiesOther}</li>` : ''}
          </ul>
        </td>
      </tr>
      ${expectations.specialRequirements ? `
      <tr>
        <th>Speciální požadavky</th>
        <td>${expectations.specialRequirements.replace(/\n/g, '<br>')}</td>
      </tr>
      ` : ''}
    </table>
  </div>

  <div class="section">
    <h2>Preference komunikace</h2>
    <table>
      <tr>
        <th>Preferovaný kontakt</th>
        <td>${getPreferredContactText(communicationPreference.preferredContact)}</td>
      </tr>
      ${communicationPreference.preferredTime ? `
      <tr>
        <th>Preferovaný čas</th>
        <td>${communicationPreference.preferredTime}</td>
      </tr>
      ` : ''}
      <tr>
        <th>Časový horizont</th>
        <td>${getTimeFrameText(communicationPreference.timeFrame)}</td>
      </tr>
      ${communicationPreference.additionalNotes ? `
      <tr>
        <th>Dodatečné poznámky</th>
        <td>${communicationPreference.additionalNotes.replace(/\n/g, '<br>')}</td>
      </tr>
      ` : ''}
      <tr>
        <th>GDPR souhlas</th>
        <td>${communicationPreference.gdprConsent ? 'Ano' : 'Ne'}</td>
      </tr>
    </table>
  </div>

  <div class="special-note">
    <p>Tato zpráva obsahuje přílohu s kompletními daty dotazníku ve formátu JSON pro případné další zpracování.</p>
  </div>
</body>
</html>
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
Bude Vás kontaktovat obchodní manažer
s nabídkou šitou na míru vašim potřebám.

Pokud byste měli jakékoliv dotazy, neváhejte nás kontaktovat na:
- Telefon: +420 734 720 994
- E-mail: fiala@vinaria.cz

S pozdravem,
Tým VINARIA s.r.o.
Jugoslávská 868/4a
613 00 Brno
www.vinaria.cz
www.beginy.cz
`;
}

/**
 * Generování HTML obsahu potvrzovacího e-mailu pro zákazníka
 */
export function generateConfirmationEmailHtmlContent(data: QuestionnaireData): string {
  const { contactInfo } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Potvrzení přijetí dotazníku - VINARIA s.r.o.</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      max-width: 200px;
    }
    h1 {
      color: #4E1A1F;
      font-size: 22px;
      text-align: center;
      margin-bottom: 20px;
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 5px;
    }
    .contact {
      background-color: #f1f1f1;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
    a {
      color: #4E1A1F;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://vinaria.cz/images/logo.png" alt="VINARIA logo">
  </div>

  <h1>Potvrzení přijetí dotazníku</h1>

  <div class="content">
    <p>Dobrý den, <strong>${contactInfo.fullName}</strong>,</p>

    <p>děkujeme za vyplnění dotazníku a váš zájem o spolupráci s VINARIA s.r.o.</p>

    <p>Váš požadavek jsme přijali a bude zpracován v nejbližším možném termínu.
    Bude Vás kontaktovat obchodní manažer s nabídkou šitou na míru vašim potřebám.</p>
  </div>

  <div class="contact">
    <p><strong>Pokud byste měli jakékoliv dotazy, neváhejte nás kontaktovat:</strong></p>
    <p>- Telefon: <a href="tel:+420734720994">+420 734 720 994</a></p>
    <p>- E-mail: <a href="mailto:fiala@vinaria.cz">fiala@vinaria.cz</a></p>
  </div>

  <div class="footer">
    <p>S pozdravem,<br>
    Tým VINARIA s.r.o.<br>
    Jugoslávská 868/4a<br>
    613 00 Brno<br>
    <a href="https://www.vinaria.cz">www.vinaria.cz</a> | <a href="https://www.beginy.cz">www.beginy.cz</a></p>
  </div>
</body>
</html>
`;
}
