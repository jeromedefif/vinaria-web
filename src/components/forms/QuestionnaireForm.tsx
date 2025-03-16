"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormStep, QuestionnaireData, ContactInfo, BusinessInfo, ProductInterest, Expectations, CommunicationPreference } from '@/types/questionnaire';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormStep4 from './FormStep4';
import FormStep5 from './FormStep5';
import StepIndicator from './StepIndicator';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_DATA: Partial<QuestionnaireData> = {
  contactInfo: {
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    ico: '',
  },
  businessInfo: {
    businessType: 'vinoteka',
    city: '',
    businessYears: '',
  },
  productInterest: {
    wineTypes: [],
    originCountries: [],
    monthlyVolume: 'do50l',
    preferredPackaging: [],
  },
  expectations: {
    priorities: [],
  },
  communicationPreference: {
    preferredContact: 'phone',
    preferredTime: '',
    timeFrame: 'week',
    additionalNotes: '',
    gdprConsent: false, // Výchozí hodnota false
  },
};

export default function QuestionnaireForms() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<Partial<QuestionnaireData>>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Funkce pro aktualizaci formulářových dat
  const updateFormData = (stepData: Partial<QuestionnaireData>) => {
    setFormData(prevData => ({
      ...prevData,
      ...stepData,
    }));
  };

  // Funkce pro přechod na další krok
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => (prev + 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Funkce pro návrat na předchozí krok
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1) as FormStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Funkce pro odeslání formuláře
  const submitForm = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Vytvoření kompletních dat a ujištění, že gdprConsent je true
      // (když jsme se dostali až do fáze odeslání, uživatel musel zaškrtnout checkbox)
      const completeFormData = {
        ...formData as QuestionnaireData,
        submittedAt: new Date(),
        communicationPreference: {
          ...formData.communicationPreference as CommunicationPreference,
          gdprConsent: true // Explicitně nastavíme na true
        }
      };

      console.log('Odesílám data formuláře, GDPR explicitně nastaven na TRUE:',
                 JSON.stringify(completeFormData, null, 2));

      const response = await fetch('/api/dotaznik', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeFormData),
      });

      const responseData = await response.json();
      console.log('Odpověď ze serveru:', responseData);

      if (!response.ok) {
        console.error('Chyba při odesílání:', responseData);
        throw new Error(responseData.message || 'Něco se pokazilo při odesílání dotazníku.');
      }

      // Přesměrování na stránku s poděkováním
      router.push('/dotaznik/success');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Něco se pokazilo při odesílání dotazníku.');
      setIsSubmitting(false);
    }
  };
  // Funkce pro renderování aktuálního kroku formuláře
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep1
            data={formData.contactInfo as ContactInfo}
            updateData={(data) => updateFormData({ contactInfo: data })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <FormStep2
            data={formData.businessInfo as BusinessInfo}
            updateData={(data) => updateFormData({ businessInfo: data })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <FormStep3
            data={formData.productInterest as ProductInterest}
            updateData={(data) => updateFormData({ productInterest: data })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <FormStep4
            data={formData.expectations as Expectations}
            updateData={(data) => updateFormData({ expectations: data })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <FormStep5
            data={formData.communicationPreference as CommunicationPreference}
            updateData={(data) => updateFormData({ communicationPreference: data })}
            onSubmit={submitForm}
            onPrev={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <StepIndicator currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          <p className="text-sm mt-1">Prosím zkuste to znovu, nebo nás kontaktujte telefonicky.</p>
        </div>
      )}
    </div>
  );
}
