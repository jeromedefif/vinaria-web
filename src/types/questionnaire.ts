// Typy pro jednotlivé kroky dotazníku

// Krok 1: Základní kontaktní údaje
export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  ico?: string; // Nepovinné
}

// Krok 2: Typ podnikání a lokalita
export interface BusinessInfo {
  businessType: 'vinoteka' | 'restaurace' | 'hotel' | 'vinarna' | 'distributor' | 'other';
  businessTypeOther?: string; // Jen pokud je businessType === 'other'
  city: string;
  address?: string;
  businessYears: string; // Kolik let podniká v oboru (textové pole)
}

// Krok 3: Zájem o produkty
export interface ProductInterest {
  wineTypes: Array<'revova' | 'ovocna' | 'burcak' | 'napoje' | 'plyny' | 'pet'>;
  originCountries: Array<'cesko' | 'rakousko' | 'italie' | 'spanelsko' | 'francie' | 'moldavie' | 'other'>;
  originCountriesOther?: string;
  monthlyVolume: 'do50l' | '50-200l' | '200-500l' | '500-1000l' | 'nad1000l';
  preferredPackaging: Array<'keg' | 'bib' | 'pet' | 'lahve'>;
}

// Krok 4: Očekávání od spolupráce
export interface Expectations {
  priorities: Array<'kvalita' | 'cena' | 'logistika' | 'sortiment' | 'other'>;
  prioritiesOther?: string;
  specialRequirements?: string;
}

// Krok 5: Preference komunikace
export interface CommunicationPreference {
  preferredContact: 'phone' | 'email' | 'osobne';
  preferredTime?: string; // Preferovaný čas pro kontakt
  timeFrame: 'immediate' | 'week' | 'month' | 'quarter';
  additionalNotes?: string;
  gdprConsent: boolean; // Souhlas se zpracováním osobních údajů
}

// Kompletní data dotazníku
export interface QuestionnaireData {
  contactInfo: ContactInfo;
  businessInfo: BusinessInfo;
  productInterest: ProductInterest;
  expectations: Expectations;
  communicationPreference: CommunicationPreference;
  submittedAt: Date;
}

// Typ pro aktuální stav formuláře
export type FormStep = 1 | 2 | 3 | 4 | 5;
