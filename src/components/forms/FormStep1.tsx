"use client"

import { useState, useEffect } from 'react';
import { ContactInfo } from '@/types/questionnaire';
import { User, Mail, Phone, Building, CreditCard } from 'lucide-react';

interface FormStep1Props {
  data: ContactInfo;
  updateData: (data: ContactInfo) => void;
  onNext: () => void;
}

export default function FormStep1({ data, updateData, onNext }: FormStep1Props) {
  const [formData, setFormData] = useState<ContactInfo>(data);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});

  // Aktualizace lokálních dat, když se změní props
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Handler pro změnu vstupů
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Vyčistíme chybu pro dané pole při změně
    if (errors[name as keyof ContactInfo]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Validace formuláře
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactInfo, string>> = {};

    // Kontrola jména
    if (!formData.fullName || formData.fullName.trim() === '') {
      newErrors.fullName = 'Jméno je povinné';
    }

    // Kontrola emailu
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'E-mail je povinný';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Zadejte platný e-mail';
    }

    // Kontrola telefonu
    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = 'Telefon je povinný';
    } else if (!/^(\+\d{1,3})?\s?\d{9,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Zadejte platné telefonní číslo';
    }

    // Kontrola názvu firmy
    if (!formData.companyName || formData.companyName.trim() === '') {
      newErrors.companyName = 'Název společnosti je povinný';
    }

    // Validace IČO (nepovinné)
    if (formData.ico && !/^\d{8}$/.test(formData.ico.trim())) {
      newErrors.ico = 'IČO musí mít 8 číslic';
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
      <h2 className="text-xl font-bold text-wine-burgundy mb-4">Kontaktní údaje</h2>

      {/* Jméno a příjmení */}
      <div>
        <label htmlFor="fullName" className="block text-gray-700 mb-2 font-medium">
          Jméno a příjmení *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <User size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full pl-10 p-3 border ${
              errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="Jan Novák"
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
          E-mail *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Mail size={18} className="text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 p-3 border ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="jan.novak@example.cz"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Telefon */}
      <div>
        <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
          Telefon *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Phone size={18} className="text-gray-400" />
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full pl-10 p-3 border ${
              errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="+420 777 888 999"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Společnost */}
      <div>
        <label htmlFor="companyName" className="block text-gray-700 mb-2 font-medium">
          Název společnosti *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Building size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className={`w-full pl-10 p-3 border ${
              errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="Moje Firma s.r.o."
          />
        </div>
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
        )}
      </div>

      {/* IČO (nepovinné) */}
      <div>
        <label htmlFor="ico" className="block text-gray-700 mb-2 font-medium">
          IČO (nepovinné)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <CreditCard size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            id="ico"
            name="ico"
            value={formData.ico || ''}
            onChange={handleChange}
            className={`w-full pl-10 p-3 border ${
              errors.ico ? 'border-red-300 bg-red-50' : 'border-gray-300'
            } rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy`}
            placeholder="12345678"
          />
        </div>
        {errors.ico && (
          <p className="mt-1 text-sm text-red-600">{errors.ico}</p>
        )}
      </div>

      {/* Navigační tlačítka */}
      <div className="pt-4 flex justify-end">
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
