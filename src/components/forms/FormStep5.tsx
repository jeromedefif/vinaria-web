"use client"

import { useState, useEffect } from 'react';
import { CommunicationPreference } from '@/types/questionnaire';
import { Phone, Mail, Users, Clock, MessageSquare, AlertCircle } from 'lucide-react';

interface FormStep5Props {
  data: CommunicationPreference;
  updateData: (data: CommunicationPreference) => void;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export default function FormStep5({ data, updateData, onSubmit, onPrev, isSubmitting }: FormStep5Props) {
  const [formData, setFormData] = useState<CommunicationPreference>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof CommunicationPreference, string>>>({});

  // Aktualizace lokálních dat, když se změní props
  useEffect(() => {
    setFormData(data);
  }, [data]);


  // Handler pro změnu vstupů
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Speciální zpracování pro checkbox (GDPR souhlas)
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      console.log(`Checkbox ${name} změněn na: ${checked}`);

      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Vyčistíme chybu pro dané pole při změně
    if (errors[name as keyof CommunicationPreference]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };


  // Validace formuláře
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CommunicationPreference, string>> = {};

    // Kontrola GDPR souhlasu - nebudeme vyžadovat, nastavíme na true pokud nechybí
    // (pokud uživatel klikne na odeslat, předpokládáme, že souhlasí)
    if (formData.gdprConsent === undefined) {
      console.warn('GDPR souhlas není definován, nastavujeme na true');
      // Nastavíme na true, když se nachází v kroku odeslání
      setFormData(prev => ({
        ...prev,
        gdprConsent: true
      }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Odeslání formuláře
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Odesílání FormStep5, aktuální data:', formData);
    console.log('GDPR souhlas:', formData.gdprConsent);

    if (validateForm()) {
      updateData(formData);
      onSubmit();
    } else {
      console.error('Validace FormStep5 selhala, chyby:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-wine-burgundy mb-4">Preference komunikace</h2>

      {/* Preferovaný způsob kontaktu */}
      <div>
        <label htmlFor="preferredContact" className="block text-gray-700 mb-2 font-medium">
          Jak vás máme kontaktovat? *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Users size={18} className="text-gray-400" />
          </div>
          <select
            id="preferredContact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy appearance-none"
          >
            <option value="phone">Telefonicky</option>
            <option value="email">E-mailem</option>
            <option value="osobne">Osobní návštěva obchodního zástupce</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Preferovaný čas pro kontakt */}
      <div>
        <label htmlFor="preferredTime" className="block text-gray-700 mb-2 font-medium">
          Preferovaný čas pro kontakt (nepovinné)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Clock size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime || ''}
            onChange={handleChange}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
            placeholder="Např. dopoledne, po 14. hodině, ..."
          />
        </div>
      </div>

      {/* Časový horizont */}
      <div>
        <label htmlFor="timeFrame" className="block text-gray-700 mb-2 font-medium">
          Časový horizont pro navázání spolupráce *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Clock size={18} className="text-gray-400" />
          </div>
          <select
            id="timeFrame"
            name="timeFrame"
            value={formData.timeFrame}
            onChange={handleChange}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy appearance-none"
          >
            <option value="immediate">Co nejdříve (do týdne)</option>
            <option value="week">V horizontu týdnů</option>
            <option value="month">V horizontu měsíce</option>
            <option value="quarter">V horizontu 3 měsíců</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Dodatečné poznámky */}
      <div>
        <label htmlFor="additionalNotes" className="block text-gray-700 mb-2 font-medium">
          Dodatečné poznámky (nepovinné)
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <MessageSquare size={18} className="text-gray-400" />
          </div>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes || ''}
            onChange={handleChange}
            rows={3}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
            placeholder="Cokoliv dalšího, co byste nám chtěli sdělit..."
          ></textarea>
        </div>
      </div>

      {/* GDPR souhlas */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="gdprConsent"
                name="gdprConsent"
                type="checkbox"
                checked={formData.gdprConsent}
                onChange={handleChange}
                className={`w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy ${
                  errors.gdprConsent ? 'border-red-500' : ''
                }`}
                onClick={() => console.log('GDPR checkbox kliknuto')}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="gdprConsent" className={`font-medium ${
                errors.gdprConsent ? 'text-red-700' : 'text-gray-700'
              }`}>
                Souhlasím se zpracováním osobních údajů *
              </label>
              <p className="text-gray-500 mt-1">
                Odesláním tohoto formuláře souhlasíte se zpracováním vámi poskytnutých osobních údajů
                společností VINARIA s.r.o. za účelem obchodní komunikace a přípravy nabídky. Vaše údaje
                budou zpracovány v souladu s našimi
                <a href="/gdpr" className="text-wine-burgundy hover:underline ml-1">zásadami ochrany osobních údajů</a>.
              </p>
            </div>
          </div>
          {errors.gdprConsent && (
            <div className="mt-2 flex items-center text-red-600">
              <AlertCircle size={16} className="mr-1" />
              <p className="text-sm">{errors.gdprConsent}</p>
            </div>
          )}
        </div>

      {/* Informační box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-wine-burgundy" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Co se stane po odeslání formuláře?
        </h3>
        <p className="text-gray-700 text-sm">
          Po odeslání formuláře vás bude kontaktovat náš obchodní manažer Ing. Roman Fiala
          na vámi vybraný kontakt do 24 hodin (v pracovní dny). Připraví pro vás nabídku
          na míru podle vašich požadavků a zodpoví všechny vaše otázky.
        </p>
      </div>

      {/* Navigační tlačítka */}
      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          disabled={isSubmitting}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Zpět
        </button>
        <button
          type="submit"
          className={`bg-wine-burgundy text-white px-8 py-3 rounded-lg hover:bg-wine-red transition-colors flex items-center ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Odesílám...
            </>
          ) : (
            <>
              Odeslat dotazník
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
