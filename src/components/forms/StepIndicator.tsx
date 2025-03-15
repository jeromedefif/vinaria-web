"use client"

import { FormStep } from '@/types/questionnaire';
import { motion } from 'framer-motion';
import { User, Building, Wine, Target, Send } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: FormStep;
}

const steps = [
  { label: 'Kontakt', icon: User },
  { label: 'Podnikání', icon: Building },
  { label: 'Produkty', icon: Wine },
  { label: 'Očekávání', icon: Target },
  { label: 'Komunikace', icon: Send },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="hidden sm:flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isPast = index + 1 < currentStep;

          return (
            <div key={index} className="relative flex flex-col items-center">
              {/* Spojovací čáry */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-full top-4 -translate-y-1/2 h-1 w-full ${
                    isPast ? 'bg-wine-burgundy' : 'bg-gray-300'
                  }`}
                  style={{ width: 'calc(100% - 2rem)', left: '50%' }}
                ></div>
              )}

              {/* Krok */}
              <motion.div
                animate={
                  isActive
                    ? { scale: [1, 1.1, 1], transition: { duration: 0.5 } }
                    : {}
                }
                className={`z-10 mb-2 flex items-center justify-center w-8 h-8 rounded-full ${
                  isActive || isPast
                    ? 'bg-wine-burgundy text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {<step.icon size={16} />}
              </motion.div>

              {/* Popisek */}
              <span className={`text-xs font-medium ${
                isActive ? 'text-wine-burgundy font-semibold' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobilní verze */}
      <div className="sm:hidden flex justify-between items-center mb-4">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isPast = index + 1 < currentStep;

          return (
            <div key={index} className="relative flex flex-col items-center">
              <motion.div
                animate={
                  isActive
                    ? { scale: [1, 1.1, 1], transition: { duration: 0.5 } }
                    : {}
                }
                className={`z-10 w-6 h-6 rounded-full ${
                  isActive || isPast
                    ? 'bg-wine-burgundy text-white'
                    : 'bg-gray-200 text-gray-500'
                } flex items-center justify-center`}
              >
                {index + 1}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Aktuální krok - mobilní popisek */}
      <div className="sm:hidden text-center text-gray-700 font-medium mb-6">
        Krok {currentStep}: {steps[currentStep - 1]?.label}
      </div>
    </div>
  );
}
