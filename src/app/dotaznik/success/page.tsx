"use client"

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Phone } from 'lucide-react';

export default function Success() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-wine-burgundy mb-4">
            Děkujeme za vyplnění dotazníku
          </h1>

          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Vaše odpovědi byly úspěšně odeslány. Náš obchodní manažer Ing. Roman Fiala vás bude kontaktovat
            do 24 hodin s nabídkou šitou přímo na míru vašim potřebám.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-wine-burgundy mb-2">
              Kontaktní údaje
            </h2>
            <p className="text-gray-700 mb-2">
              V případě dotazů nás neváhejte kontaktovat:
            </p>
            <div className="flex items-center justify-center gap-2 text-wine-burgundy font-semibold">
              <Phone size={18} />
              <a href="tel:+420734720994" className="hover:text-wine-red">+420 734 720 994</a>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-wine-burgundy hover:text-wine-red transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Zpět na úvodní stránku</span>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
