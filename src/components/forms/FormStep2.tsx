"use client"

import { useState, useEffect } from 'react';
import { BusinessInfo } from '@/types/questionnaire';
import { Building, MapPin, Calendar } from 'lucide-react';

interface FormStep2Props {
  data: BusinessInfo;
  updateData: (data: BusinessInfo) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function FormStep2({ data, updateData, onNext, onPrev }: FormStep2Props) {
  const [formData, setFormData] = useState<BusinessInfo>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessInfo, string>>>({});

  // Aktualizace lokálních dat, když se změní props
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Handler pro změnu vstupů
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vyčistíme chybu pro dané pole při změně
    if (errors[name as keyof BusinessInfo]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validace formuláře
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BusinessInfo, string>> = {};

    // Kontrola typu podnikání
    if (formData.businessType === 'other' && (!formData.businessTypeOther || formData.businessTypeOther.trim() === '')) {
      newErrors.businessTypeOther = 'Prosím specifikujte typ vašeho podnikání';
    }

    // Kontrola města
    if (!formData.city || formData.city.trim() === '') {
      newErrors.city = 'Město je povinné';
    }

    // Kontrola let v podnikání
    if (!formData.businessYears || formData.businessYears.trim() === '') {
      newErrors.businessYears = 'Délka podnikání je povinná';
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
      <h2 className="text-xl font-bold text-wine-burgundy mb-4">Informace o podnikání</h2>

      {/* Typ podnikání */}
      <div>
        <label htmlFor="businessType" className="block text-gray-700 mb-2 font-medium">
          Typ podniku *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Building size={18} className="text-gray-400" />
          </div>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy appearance-none"
          >
            <option value="vinoteka">Vinotéka</option>
            <option value="restaurace">Restaurace</option>
            <option value="hotel">Hotel</option>
            <option value="vinarna">Vinárna</option>
            <option value="distributor">Distribuční síť</option>
            <option value="other">Jiné</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Jiný typ podnikání - Zobrazí se pouze pokud je vybráno 'Jiné' */}
      {formData.businessType === 'other' && (
        <div>
          <label htmlFor="businessTypeOther" className="block text-gray-700 mb-2 font-medium">
            Upřesněte typ podnikání *
          </label>
          <input
            type="text"
            id="businessTypeOther"
            name="businessTypeOther"
            value={formData.businessTypeOther || ''}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.businessTypeOther ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="Popište váš typ podnikání"
          />
          {errors.businessTypeOther && (
            <p className="mt-1 text-sm text-red-600">{errors.businessTypeOther}</p>
          )}
        </div>
      )}

      {/* Město */}
      <div>
        <label htmlFor="city" className="block text-gray-700 mb-2 font-medium">
          Město *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full pl-10 p-3 border ${
              errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="Praha, Brno, Ostrava..."
          />
        </div>
        {errors.city && (
          <p className="mt-1 text-sm text-red-600">{errors.city}</p>
        )}
      </div>

      {/* Adresa (nepovinné) */}
      <div>
        <label htmlFor="address" className="block text-gray-700 mb-2 font-medium">
          Adresa provozovny (nepovinné)
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
          placeholder="Ulice, číslo popisné, PSČ"
        />
      </div>

      {/* Jak dlouho podniká */}
      <div>
        <label htmlFor="businessYears" className="block text-gray-700 mb-2 font-medium">
          Jak dlouho podnikáte v oboru? *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Calendar size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            id="businessYears"
            name="businessYears"
            value={formData.businessYears}
            onChange={handleChange}
            className={`w-full pl-10 p-3 border ${
              errors.businessYears ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="Např. 5 let, začínáme, ..."
          />
        </div>
        {errors.businessYears && (
          <p className="mt-1 text-sm text-red-600">{errors.businessYears}</p>
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
