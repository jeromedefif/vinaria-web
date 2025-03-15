"use client"

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { motion } from 'framer-motion';
import QuestionnaireForms from '@/components/forms/QuestionnaireForm';

export default function Dotaznik() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-wine-burgundy mb-6 text-center">
            Dotazník pro novou spolupráci
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <p className="text-gray-700 mb-6 text-center">
              Děkujeme za váš zájem o spolupráci s VINARIA s.r.o. Abychom vám mohli připravit
              nabídku přesně podle vašich potřeb, prosíme o vyplnění tohoto dotazníku. Náš obchodní manažer
              vás bude kontaktovat do 24 hodin.
            </p>

            <div className="border-t border-gray-200 pt-6">
              <QuestionnaireForms />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-wine-burgundy mb-3">
              Ochrana osobních údajů
            </h2>
            <p className="text-sm text-gray-700">
              Vyplněním a odesláním tohoto dotazníku souhlasíte se zpracováním poskytnutých
              osobních údajů společností VINARIA s.r.o. za účelem obchodní komunikace a
              přípravy nabídky. Vaše údaje budou zpracovány v souladu s našimi
              <a href="/gdpr" className="text-wine-burgundy hover:underline ml-1">zásadami ochrany osobních údajů</a>.
              Máte právo kdykoli požádat o vymazání vašich dat z naší databáze.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
