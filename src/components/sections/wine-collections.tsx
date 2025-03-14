"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';

// Definice kolekcí produktů podle vašeho B2B portálu
const productCategories = [
  {
    id: 'revova-vina',
    title: 'Révová vína',
    description: 'Kvalitní révová vína z Rakouska, Moldávie, Itálie a Španělska v různých variantách sladkosti a objemu.',
    image: 'https://placehold.co/600x400/4E1A1F/F5F1E7',
    icon: '🍷',
    color: 'bg-purple-100 text-purple-800',
    link: '/katalog?kategorie=vino'
  },
  {
    id: 'ovocna-vina',
    title: 'Ovocná vína',
    description: 'Výběr ovocných vín jako Višeň, Borůvka, Johannisberwein (rybíz) a další chutné varianty.',
    image: 'https://placehold.co/600x400/722F37/F5F1E7',
    icon: '🍒',
    color: 'bg-red-100 text-red-800',
    link: '/katalog?kategorie=ovocne'
  },
  {
    id: 'napoje',
    title: 'Ostatní alkoholické nápoje',
    description: 'Široká nabídka ostatních alkoholických nápojů včetně speciálních edic a exclusive variant.',
    image: 'https://placehold.co/600x400/C8A355/4E1A1F',
    icon: '🥃',
    color: 'bg-blue-100 text-blue-800',
    link: '/katalog?kategorie=napoje'
  },
  {
    id: 'dusik',
    title: 'Potravinářské plyny',
    description: 'Potravinářský dusík, Biogon a CO2 v různých baleních pro gastronomii a výčepní technologie.',
    image: 'https://placehold.co/600x400/F5F1E7/4E1A1F',
    icon: '💨',
    color: 'bg-gray-100 text-gray-800',
    link: '/katalog?kategorie=plyny'
  },
  {
    id: 'pet',
    title: 'PET láhve',
    description: 'PET láhve o objemech 1L, 1,5L, 2L a 5L včetně uzávěrů a ostatního příslušenství.',
    image: 'https://placehold.co/600x400/87CEEB/4E1A1F',
    icon: '🧴',
    color: 'bg-amber-100 text-amber-800',
    link: '/katalog?kategorie=pet'
  }
];

export default function ProductCategories() {
  return (
    <section className="py-16 bg-wine-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-4">
            Katalog vín a nápojů
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
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div
                className="h-16 flex items-center justify-center"
                style={{
                  backgroundImage: `url('${category.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <span className={`text-xl font-bold px-4 py-2 rounded-full ${category.color}`}>
                  {category.icon} {category.title}
                </span>
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

        <div className="text-center mt-12">
          <a
            href="https://www.beginy.cz"
            className="font-montserrat bg-wine-burgundy text-white px-8 py-3 rounded text-lg font-medium transition hover:bg-wine-red inline-block"
          >
            Kompletní B2B katalog
          </a>
        </div>
      </div>
    </section>
  );
}
