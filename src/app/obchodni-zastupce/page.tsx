"use client"

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, Calendar, FileCheck, Building, ArrowRight, Info } from 'lucide-react';

export default function ObchodniZastupce() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-3">
            Váš obchodní zástupce
          </h1>
          <p className="font-montserrat text-xl text-gray-700 max-w-3xl mx-auto">
            První krok k úspěšné spolupráci začíná u našeho obchodního manažera,
            který je připraven vám pomoci se vším, co potřebujete.
          </p>
        </div>

        {/* Profil obchodního manažera */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 bg-wine-burgundy text-white p-8 flex flex-col justify-center items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-wine-gold">
                {/* Zde by ideálně byla fotografie obchodního manažera */}
                <div className="absolute inset-0 flex items-center justify-center bg-wine-red">
                  <span className="text-6xl font-bold">RF</span>
                </div>
              </div>

              <h2 className="font-playfair text-2xl font-bold mb-1">Ing. Roman Fiala</h2>
              <p className="font-montserrat mb-4">Obchodní manažer pro ČR</p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-2"
              >
                <a
                  href="tel:+420734720994"
                  className="flex items-center gap-2 bg-wine-gold text-wine-burgundy px-6 py-3 rounded-full font-medium hover:bg-white hover:text-wine-burgundy transition"
                >
                  <Phone size={20} />
                  <span>+420 734 720 994</span>
                </a>
              </motion.div>
            </div>

            <div className="md:w-2/3 p-8">
              <h3 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
                Jak se spojit s obchodním zástupcem
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-3 items-start">
                  <div className="bg-wine-cream p-3 rounded-full">
                    <Phone size={20} className="text-wine-burgundy" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg mb-1">Telefonicky</h4>
                    <p className="font-montserrat text-gray-700 mb-2">
                      Nejrychlejší způsob pro první kontakt. Jsme k dispozici v pracovních dnech od 8:00 do 16:00.
                    </p>
                    <a
                      href="tel:+420734720994"
                      className="font-montserrat text-wine-burgundy hover:text-wine-red transition"
                    >
                      +420 734 720 994
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="bg-wine-cream p-3 rounded-full">
                    <Mail size={20} className="text-wine-burgundy" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg mb-1">E-mailem</h4>
                    <p className="font-montserrat text-gray-700 mb-2">
                      Pošlete nám e-mail s vaším požadavkem a my se vám ozveme zpět do 24 hodin.
                    </p>
                    <a
                      href="mailto:fiala@vinaria.cz"
                      className="font-montserrat text-wine-burgundy hover:text-wine-red transition"
                    >
                      fiala@vinaria.cz
                    </a>
                  </div>
                </div>


                <div className="flex gap-3 items-start">
                  <div className="bg-wine-cream p-3 rounded-full">
                    <Building size={20} className="text-wine-burgundy" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg mb-1">Naše sídlo</h4>
                    <p className="font-montserrat text-gray-700">
                      VINARIA s.r.o.<br />
                      Jugoslávská 868/4a<br />
                      613 00 Brno
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex gap-2 items-center">
                  <span className="font-montserrat font-bold">Web:</span>
                  <a
                    href="https://www.vinaria.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-montserrat text-wine-burgundy hover:text-wine-red transition"
                  >
                    www.vinaria.cz
                  </a>
                </div>
                <div className="flex gap-2 items-center mt-1">
                  <span className="font-montserrat font-bold">B2B portál:</span>
                  <a
                    href="https://www.beginy.cz/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-montserrat text-wine-burgundy hover:text-wine-red transition"
                  >
                    www.beginy.cz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registrace a spolupráce */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4 flex items-center">
              <FileCheck size={24} className="mr-2 text-wine-gold" />
              Postup registrace do B2B systému
            </h3>

            <ol className="space-y-4">
              <li className="flex gap-3">
                <div className="flex-shrink-0 bg-wine-burgundy text-white w-7 h-7 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-playfair font-bold text-lg">Kontaktujte obchodního zástupce</h4>
                  <p className="font-montserrat text-gray-700">
                    Telefonicky nebo e-mailem nás informujte o vašem zájmu o spolupráci.
                  </p>
                </div>
              </li>



              <li className="flex gap-3">
                <div className="flex-shrink-0 bg-wine-burgundy text-white w-7 h-7 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-playfair font-bold text-lg">Obdržíte přístupové údaje</h4>
                  <p className="font-montserrat text-gray-700">
                    Po dohodě vám zřídíme přístup do B2B portálu s kompletní nabídkou.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <div className="flex-shrink-0 bg-wine-burgundy text-white w-7 h-7 rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-playfair font-bold text-lg">Začněte objednávat</h4>
                  <p className="font-montserrat text-gray-700">
                    V B2B portálu můžete snadno prohlížet aktuální sortiment, dostupnost a zadávat objednávky.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-2">
                <Info size={20} className="flex-shrink-0 text-wine-burgundy mt-1" />
                <p className="font-montserrat text-sm text-gray-700">
                  <strong>Poznámka:</strong> B2B portál je určen výhradně pro firemní zákazníky
                  (vinotéky, vinárny, restaurace, hotely a distribuční sítě). Neposkytujeme
                  přístup koncovým zákazníkům.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              Výhody spolupráce s námi
            </h3>

            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="flex-shrink-0 text-wine-gold">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-lg">Kvalitní produkty</h4>
                  <p className="font-montserrat text-gray-700">
                    Nabízíme prověřená vína a nápoje od předních evropských vinařů a producentů z třetích zemí.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <div className="flex-shrink-0 text-wine-gold">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-lg">Flexibilní logistika</h4>
                  <p className="font-montserrat text-gray-700">
                    Zajistíme pravidelné dodávky po celé ČR s možností přizpůsobení vašim požadavkům.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <div className="flex-shrink-0 text-wine-gold">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-lg">Komplexní sortiment</h4>
                  <p className="font-montserrat text-gray-700">
                    Kromě vín a nápojů nabízíme široký sortiment obalů a potravinářských plynů.
                  </p>
                </div>
              </li>

              <li className="flex gap-3 items-start">
                <div className="flex-shrink-0 text-wine-gold">
                  <ArrowRight size={20} />
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-lg">Osobní přístup</h4>
                  <p className="font-montserrat text-gray-700">
                    Váš obchodní zástupce je vám vždy k dispozici pro radu, pomoc a optimalizaci nabídky.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="text-center"
              >
                <a
                  href="tel:+420734720994"
                  className="inline-block bg-wine-burgundy text-white px-8 py-4 rounded-lg font-montserrat font-medium text-lg hover:bg-wine-red transition shadow-md"
                >
                  Kontaktujte mě ihned
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CTA sekce */}
        <div className="bg-wine-cream rounded-lg p-8 text-center">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-wine-burgundy mb-4">
            Začněte s námi spolupracovat ještě dnes
          </h2>
          <p className="font-montserrat text-gray-700 mb-6 max-w-3xl mx-auto">
            Neváhejte mě kontaktovat s jakýmkoliv dotazem. Rád vám představím naši nabídku
            a pomohu vám najít optimální řešení pro váš podnik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }}>
              <a
                href="tel:+420734720994"
                className="flex items-center justify-center gap-2 bg-wine-burgundy text-white px-6 py-3 rounded font-medium hover:bg-wine-red transition"
              >
                <Phone size={18} />
                <span>+420 734 720 994</span>
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <a
                href="mailto:fiala@vinaria.cz"
                className="flex items-center justify-center gap-2 border border-wine-burgundy text-wine-burgundy px-6 py-3 rounded font-medium hover:bg-wine-burgundy hover:text-white transition"
              >
                <Mail size={18} />
                <span>fiala@vinaria.cz</span>
              </a>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
