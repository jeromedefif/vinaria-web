"use client"

import { useState, useEffect } from 'react';
import { Expectations } from '@/types/questionnaire';
import { CheckCircle, FileText } from 'lucide-react';

interface FormStep4Props {
  data: Expectations;
  updateData: (data: Expectations) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function FormStep4({ data, updateData, onNext, onPrev }: FormStep4Props) {
  const [formData, setFormData] = useState<Expectations>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof Expectations, string>>>({});

  // Aktualizace lokálních dat, když se změní props
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Handler pro změnu priorit (checkboxy)
  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedPriorities = checked
      ? [...formData.priorities, value as any]
      : formData.priorities.filter(priority => priority !== value);

    setFormData({
      ...formData,
      priorities: updatedPriorities,
    });

    // Vyčistíme chybu
    if (errors.priorities) {
      setErrors({
        ...errors,
        priorities: undefined,
      });
    }
  };

  // Handler pro změnu vstupů
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vyčistíme chybu pro dané pole při změně
    if (errors[name as keyof Expectations]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validace formuláře
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Expectations, string>> = {};

    // Kontrola priorit
    if (!formData.priorities || formData.priorities.length === 0) {
      newErrors.priorities = 'Vyberte alespoň jednu prioritu';
    }

    // Kontrola pole "Jiné priority"
    if (
      formData.priorities.includes('other') &&
      (!formData.prioritiesOther || formData.prioritiesOther.trim() === '')
    ) {
      newErrors.prioritiesOther = 'Uveďte další priority';
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
      <h2 className="text-xl font-bold text-wine-burgundy mb-4">Očekávání od spolupráce</h2>

      {/* Priority */}
      <div>
        <label className="block text-gray-700 mb-3 font-medium">
          Co je pro vás při výběru dodavatele nejdůležitější? *
        </label>
        <div className="flex items-center gap-1 mb-2">
          <CheckCircle size={18} className="text-wine-burgundy" />
          <span className="text-sm text-gray-600 font-medium">Vyberte všechny důležité faktory</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="priority-kvalita"
              value="kvalita"
              checked={formData.priorities.includes('kvalita')}
              onChange={handlePriorityChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="priority-kvalita" className="ml-2 text-gray-700">
              Kvalita produktů
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="priority-cena"
              value="cena"
              checked={formData.priorities.includes('cena')}
              onChange={handlePriorityChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="priority-cena" className="ml-2 text-gray-700">
              Cena
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="priority-logistika"
              value="logistika"
              checked={formData.priorities.includes('logistika')}
              onChange={handlePriorityChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="priority-logistika" className="ml-2 text-gray-700">
              Spolehlivost dodávek / logistika
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="priority-sortiment"
              value="sortiment"
              checked={formData.priorities.includes('sortiment')}
              onChange={handlePriorityChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="priority-sortiment" className="ml-2 text-gray-700">
              Šíře sortimentu
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="priority-other"
              value="other"
              checked={formData.priorities.includes('other')}
              onChange={handlePriorityChange}
              className="w-4 h-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
            />
            <label htmlFor="priority-other" className="ml-2 text-gray-700">
              Jiné
            </label>
          </div>
        </div>
        {errors.priorities && (
          <p className="mt-1 text-sm text-red-600">{errors.priorities}</p>
        )}

        {/* Jiné priority - zobrazí se jen když je zaškrtnuto "Jiné" */}
        {formData.priorities.includes('other') && (
          <div className="mt-3">
            <label htmlFor="prioritiesOther" className="block text-gray-700 mb-2 text-sm font-medium">
              Uveďte další priority *
            </label>
            <input
              type="text"
              id="prioritiesOther"
              name="prioritiesOther"
              value={formData.prioritiesOther || ''}
              onChange={handleChange}
              className={`w-full p-3 border ${
                errors.prioritiesOther ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
              placeholder="Např. lokální výroba, ekologické aspekty, ..."
            />
            {errors.prioritiesOther && (
              <p className="mt-1 text-sm text-red-600">{errors.prioritiesOther}</p>
            )}
          </div>
        )}
      </div>

      {/* Speciální požadavky */}
      <div>
        <label htmlFor="specialRequirements" className="block text-gray-700 mb-2 font-medium">
          Máte nějaké speciální požadavky na dodavatele? (nepovinné)
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <FileText size={18} className="text-gray-400" />
          </div>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements || ''}
            onChange={handleChange}
            rows={4}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
            placeholder="Např. ekologické certifikace, konkrétní odrůdy, specifické logistické požadavky, ..."
          ></textarea>
        </div>
      </div>

      {/* Informační box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-wine-burgundy" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Detailní výběr pro vás
        </h3>
        <p className="text-gray-700 text-sm">
          Na základě vašich odpovědí vám náš obchodní manažer připraví individuální nabídku
          zahrnující produkty odpovídající vašim požadavkům. Čím přesnější informace poskytnete,
          tím lépe dokážeme nabídku přizpůsobit.
        </p>
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
