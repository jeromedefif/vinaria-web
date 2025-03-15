"use client"

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, Users, MapPin, ArrowRight } from 'lucide-react';

export default function Kontakt() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-8">
          Kontaktujte nás
        </h1>

        {/* Banner odkazu na obchodního zástupce */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-wine-burgundy text-white rounded-lg p-8 mb-12 shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="font-playfair text-2xl font-bold mb-2">
                Jste firma a máte zájem o spolupráci?
              </h2>
              <p className="font-montserrat">
                Kontaktujte přímo našeho obchodního manažera, který vám pomůže s registrací do B2B portálu a zodpoví všechny vaše dotazy.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/obchodni-zastupce"
                className="inline-flex items-center gap-2 bg-wine-gold text-wine-burgundy font-montserrat font-medium px-6 py-3 rounded-md"
              >
                <Users size={20} />
                <span>Kontaktovat obchodního manažera</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-6">
            Kontaktní údaje
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="font-montserrat space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-wine-cream p-3 rounded-full">
                  <MapPin className="text-wine-burgundy" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sídlo společnosti:</h3>
                  <address className="not-italic">
                    <strong>VINARIA s.r.o.</strong><br />
                    Jugoslávská 868/4a<br />
                    613 00 Brno<br />
                    IČ: 26904730
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-wine-cream p-3 rounded-full">
                  <Phone className="text-wine-burgundy" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Telefon:</h3>
                  <p>+420 734 720 994</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-wine-cream p-3 rounded-full">
                  <Mail className="text-wine-burgundy" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">E-mail:</h3>
                  <p><a href="mailto:info@vinaria.cz" className="text-wine-burgundy hover:text-wine-red transition">info@vinaria.cz</a></p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Otevírací doba:</h3>
                <p>Pondělí - Pátek: 8:00 - 16:00</p>
              </div>
            </div>

            <div>
              <h3 className="font-playfair text-xl font-bold text-wine-burgundy mb-4">
                Kde nás najdete
              </h3>
              <div className="bg-gray-200 h-48 rounded-lg">
                {/* Zde bude interaktivní mapa */}
                <div className="w-full h-full flex items-center justify-center text-gray-600 font-montserrat">
                  Interaktivní mapa
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 font-montserrat">
                Přímo v areálu se nachází parkoviště pro zákazníky.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
