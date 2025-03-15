"use client"

import { useState, useEffect } from 'react';
import { ProductInterest } from '@/types/questionnaire';
import { Wine, Globe, BarChart3, Package } from 'lucide-react';

interface FormStep3Props {
  data: ProductInterest;
  updateData: (data: ProductInterest) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function FormStep3({ data, updateData, onNext, onPrev }: FormStep3Props) {
  const [formData, setFormData] = useState<ProductInterest>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductInterest, string>>>({});

  // Aktualizace lokálních dat, když se změní props
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Handler pro změnu checkboxů (wineTypes)
  const handleWineTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedTypes = checked
      ? [...formData.wineTypes, value as any]
      : formData.wineTypes.filter(type => type !== value);

    setFormData({
      ...formData,
      wineTypes: updatedTypes,
    });

    // Vyčistíme chybu
    if (errors.wineTypes) {
      setErrors({
        ...errors,
        wineTypes: undefined,
      });
    }
  };

  // Handler pro změnu checkboxů (originCountries)
  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedOrigins = checked
      ? [...formData.originCountries, value as any]
      : formData.originCountries.filter(origin => origin !== value);

    setFormData({
      ...formData,
      originCountries: updatedOrigins,
    });

    // Vyčistíme chybu
    if (errors.originCountries) {
      setErrors({
        ...errors,
        originCountries: undefined,
      });
    }
  };

  // Handler pro změnu checkboxů (preferredPackaging)
  const handlePackagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedPackaging = checked
      ? [...formData.preferredPackaging, value as any]
      : formData.preferredPackaging.filter(packaging => packaging !== value);

    setFormData({
      ...formData,
      preferredPackaging: updatedPackaging,
    });

    // Vyčistíme chybu
    if (errors.preferredPackaging) {
      setErrors({
        ...errors,
        preferredPackaging: undefined,
      });
    }
  };

  // Handler pro změnu ostatních vstupů
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vyčistíme chybu pro dané pole při změně
    if (errors[name as keyof ProductInterest]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validace formuláře
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductInterest, string>> = {};

    // Kontrola vybraných typů vín
    if (!formData.wineTypes || formData.wineTypes.length === 0) {
      newErrors.wineTypes = 'Vyberte alespoň jeden typ produktu';
    }

    // Kontrola zemí původu
    if (!formData.originCountries || formData.originCountries.length === 0) {
      newErrors.originCountries = 'Vyberte alespoň jednu zemi původu';
    }

    // Kontrola balení
    if (!formData.preferredPackaging || formData.preferredPackaging.length === 0) {
      newErrors.preferredPackaging = 'Vyberte alespoň jeden typ balení';
    }

    // Kontrola pole "Jiné země původu"
    if (
      formData.originCountries.includes('other') &&
      (!formData.originCountriesOther || formData.originCountriesOther.trim() === '')
    ) {
      newErrors.originCountriesOther = 'Uveďte další země původu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Odeslání formuláře
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      updateData(formData);
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-wine-burgundy mb-4">Zájem o produkty</h2>

      {/* Typy vín/produktů */}
      <div>
        <label className="block text-gray-700 mb-3 font-medium">
          Které typy produktů vás zajímají? *
        </label>
        <div className="flex items-center gap-1 mb-2">
          <Wine size={18} className="text-wine-burgundy" />
          <span className="text-sm text-gray-600 font-medium">Vyberte všechny, o které máte zájem</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wineType-revova"
              value="revova"
              checked={formData.wineTypes.includes('revova')}
              onChange={handleWineTypeChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="wineType-revova" className="ml-2 text-gray-700">
              Révová vína
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wineType-ovocna"
              value="ovocna"
              checked={formData.wineTypes.includes('ovocna')}
              onChange={handleWineTypeChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="wineType-ovocna" className="ml-2 text-gray-700">
              Ovocná vína
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wineType-burcak"
              value="burcak"
              checked={formData.wineTypes.includes('burcak')}
              onChange={handleWineTypeChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="wineType-burcak" className="ml-2 text-gray-700">
              Burčák
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wineType-napoje"
              value="napoje"
              checked={formData.wineTypes.includes('napoje')}
              onChange={handleWineTypeChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="wineType-napoje" className="ml-2 text-gray-700">
              Ostatní alkoholické nápoje
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wineType-plyny"
              value="plyny"
              checked={formData.wineTypes.includes('plyny')}
              onChange={handleWineTypeChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="wineType-plyny" className="ml-2 text-gray-700">
              Potravinářské plyny
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="wineType-pet"
              value="pet"
              checked={formData.wineTypes.includes('pet')}
              onChange={handleWineTypeChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="wineType-pet" className="ml-2 text-gray-700">
              PET lahve
            </label>
          </div>
        </div>
        {errors.wineTypes && (
          <p className="mt-1 text-sm text-red-600">{errors.wineTypes}</p>
        )}
      </div>

      {/* Země původu */}
      <div>
        <label className="block text-gray-700 mb-3 font-medium">
          Preferované země původu vín *
        </label>
        <div className="flex items-center gap-1 mb-2">
          <Globe size={18} className="text-wine-burgundy" />
          <span className="text-sm text-gray-600 font-medium">Vyberte všechny preferované země</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="origin-cesko"
              value="cesko"
              checked={formData.originCountries.includes('cesko')}
              onChange={handleOriginChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="origin-cesko" className="ml-2 text-gray-700">
              Česko / Morava
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="origin-rakousko"
              value="rakousko"
              checked={formData.originCountries.includes('rakousko')}
              onChange={handleOriginChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="origin-rakousko" className="ml-2 text-gray-700">
              Rakousko
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="origin-italie"
              value="italie"
              checked={formData.originCountries.includes('italie')}
              onChange={handleOriginChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="origin-italie" className="ml-2 text-gray-700">
              Itálie
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="origin-spanelsko"
              value="spanelsko"
              checked={formData.originCountries.includes('spanelsko')}
              onChange={handleOriginChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="origin-spanelsko" className="ml-2 text-gray-700">
              Španělsko
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="origin-francie"
              value="francie"
              checked={formData.originCountries.includes('francie')}
              onChange={handleOriginChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="origin-francie" className="ml-2 text-gray-700">
              Francie
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="origin-moldavie"
              value="moldavie"
              checked={formData.originCountries.includes('moldavie')}
              onChange={handleOriginChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="origin-moldavie" className="ml-2 text-gray-700">
              Moldávie
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="origin-other"
              value="other"
              checked={formData.originCountries.includes('other')}
              onChange={handleOriginChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="origin-other" className="ml-2 text-gray-700">
              Jiné
            </label>
          </div>
        </div>
        {errors.originCountries && (
          <p className="mt-1 text-sm text-red-600">{errors.originCountries}</p>
        )}

        {/* Jiné země původu - zobrazí se jen když je zaškrtnuto "Jiné" */}
        {formData.originCountries.includes('other') && (
          <div className="mt-3">
            <label htmlFor="originCountriesOther" className="block text-gray-700 mb-2 text-sm font-medium">
              Uveďte další země původu *
            </label>
            <input
              type="text"
              id="originCountriesOther"
              name="originCountriesOther"
              value={formData.originCountriesOther || ''}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.originCountriesOther ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
              placeholder="Např. Chile, Argentina, ..."
            />
            {errors.originCountriesOther && (
              <p className="mt-1 text-sm text-red-600">{errors.originCountriesOther}</p>
            )}
          </div>
        )}
      </div>

      {/* Měsíční objem */}
      <div>
        <label htmlFor="monthlyVolume" className="block text-gray-700 mb-2 font-medium">
          Předpokládaný měsíční odběr *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BarChart3 size={18} className="text-gray-400" />
          </div>
          <select
            id="monthlyVolume"
            name="monthlyVolume"
            value={formData.monthlyVolume}
            onChange={handleChange}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy appearance-none"
          >
            <option value="do50l">Do 50 litrů měsíčně</option>
            <option value="50-200l">50 - 200 litrů měsíčně</option>
            <option value="200-500l">200 - 500 litrů měsíčně</option>
            <option value="500-1000l">500 - 1000 litrů měsíčně</option>
            <option value="nad1000l">Nad 1000 litrů měsíčně</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Preferované balení */}
      <div>
        <label className="block text-gray-700 mb-3 font-medium">
          Preferované balení *
        </label>
        <div className="flex items-center gap-1 mb-2">
          <Package size={18} className="text-wine-burgundy" />
          <span className="text-sm text-gray-600 font-medium">Vyberte všechny typy balení, které preferujete</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="packaging-keg"
              value="keg"
              checked={formData.preferredPackaging.includes('keg')}
              onChange={handlePackagingChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="packaging-keg" className="ml-2 text-gray-700">
              KEG sudy (30L, 50L)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="packaging-bib"
              value="bib"
              checked={formData.preferredPackaging.includes('bib')}
              onChange={handlePackagingChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="packaging-bib" className="ml-2 text-gray-700">
              Bag-in-Box (5L, 10L, 20L)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="packaging-pet"
              value="pet"
              checked={formData.preferredPackaging.includes('pet')}
              onChange={handlePackagingChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="packaging-pet" className="ml-2 text-gray-700">
              PET lahve (1L, 2L, 5L)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="packaging-lahve"
              value="lahve"
              checked={formData.preferredPackaging.includes('lahve')}
              onChange={handlePackagingChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="packaging-lahve" className="ml-2 text-gray-700">
              Skleněné lahve (0.75L)
            </label>
          </div>
        </div>
        {errors.preferredPackaging && (
          <p className="mt-1 text-sm text-red-600">{errors.preferredPackaging}</p>
        )}
      </div>

      {/* Navigační tlačítka */}
      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
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
          className="bg-wine-burgundy text-white px-6 py-3 rounded-lg hover:bg-wine-red transition-colors flex items-center"
        >
          Pokračovat
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
