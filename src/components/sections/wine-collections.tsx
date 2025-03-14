"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Grape, Wine, Martini, TestTube, Box, Amphora } from 'lucide-react';

// Definice kolekcí produktů s jemnějším vzhledem
const productCategories = [
  {
    id: 'revova-vina',
    title: 'Révová vína',
    description: 'Kvalitní révová vína z Rakouska, Moldávie, Itálie a Španělska v různých variantách sladkosti a objemu.',
    icon: Grape,
    pillBgColor: 'bg-pink-50',
    pillTextColor: 'text-wine-burgundy',
    link: '/katalog?kategorie=vino'
  },
  {
    id: 'ovocna-vina',
    title: 'Ovocná vína',
    description: 'Výběr ovocných vín jako Višeň, Borůvka, Johannisberwein (rybíz) a další chutné varianty.',
    icon: Wine,
    pillBgColor: 'bg-pink-50',
    pillTextColor: 'text-wine-burgundy',
    link: '/katalog?kategorie=ovocne'
  },
  {
    id: 'napoje',
    title: 'Ostatní alkoholické nápoje',
    description: 'Široká nabídka ostatních alkoholických nápojů včetně speciálních edic a exclusive variant.',
    icon: Martini,
    pillBgColor: 'bg-blue-50',
    pillTextColor: 'text-blue-800',
    link: '/katalog?kategorie=napoje'
  },
  {
    id: 'burcak',
    title: 'Burčák',
    description: 'Moravský burčák a Částečně zkvašený hroznový mošt - sezonní speciality.',
    icon: Amphora,
    pillBgColor: 'bg-amber-50',
    pillTextColor: 'text-amber-800',
    link: '/katalog?kategorie=burcak'
  },
  {
    id: 'plyny',
    title: 'Potravinářské plyny',
    description: 'Potravinářský dusík, Biogon a CO2 v různých baleních pro gastronomii a výčepní technologie.',
    icon: TestTube,
    pillBgColor: 'bg-gray-50',
    pillTextColor: 'text-gray-700',
    link: '/katalog?kategorie=plyny'
  },
  {
    id: 'pet',
    title: 'PET láhve',
    description: 'PET láhve o objemech 1L, 1,5L, 2L a 5L včetně uzávěrů a ostatního příslušenství.',
    icon: Box,
    pillBgColor: 'bg-sky-50',
    pillTextColor: 'text-sky-800',
    link: '/katalog?kategorie=pet'
  }
];

// Definice pulzujícího efektu
const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export default function ProductCategories() {
  return (
    <section className="py-16 bg-wine-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-4">
            Přehled našeho sortimentu
          </h2>
          <p className="font-montserrat text-gray-700 max-w-3xl mx-auto">
            Nabízíme široký sortiment révových vín, ovocných vín a ostatních alkoholických nápojů,
            které jsou k dispozici v různých objemech a baleních.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-center h-16 bg-white border-b border-gray-100">
                <div className={`rounded-full ${category.pillBgColor} ${category.pillTextColor} flex items-center px-6 py-2`}>
                  <category.icon size={20} className="mr-2" />
                  <span className="font-bold">{category.title}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="font-montserrat text-gray-700 mb-4">
                  {category.description}
                </p>
                <Link
                  href={category.link}
                  className="font-montserrat inline-block text-wine-burgundy border-b-2 border-wine-gold pb-1 transition hover:text-wine-red"
                >
                  Zobrazit katalog
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kompletní B2B katalog box - s bílým pozadím pro lepší kontrast */}
        <div className="bg-white rounded-lg p-8 text-center mt-12 border border-gray-200 shadow-sm">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
            Kompletní sortiment v B2B katalogu
          </h2>
          <p className="font-montserrat text-gray-700 mb-6 max-w-2xl mx-auto">
            Pro přístup ke kompletnímu sortimentu, dostupnosti a možnosti online
            objednávky se registrujte v našem B2B systému.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.beginy.cz/login"
              className="font-montserrat bg-wine-burgundy text-white px-6 py-3 rounded font-medium hover:bg-wine-red transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Přihlásit se do B2B
            </a>
            <motion.div
              animate={pulseAnimation}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href="/obchodni-zastupce"
                className="font-montserrat border border-wine-burgundy text-wine-burgundy px-6 py-3 rounded font-medium hover:bg-wine-burgundy hover:text-white transition inline-block"
              >
                Kontaktovat obchodního zástupce
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
