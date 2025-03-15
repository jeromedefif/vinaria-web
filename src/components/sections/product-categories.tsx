"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Grape, Wine, Martini, TestTube, Box, Amphora, Phone, Users, ArrowRight } from 'lucide-react';

// Produktové kategorie s ikonami a barvami podobnými B2B portálu
export const productCategories = [
  {
    id: 'vino',
    name: 'Révová vína',
    icon: Grape,
    color: 'from-purple-100 to-purple-200 text-purple-800 border-purple-200',
    count: '40+ produktů',
    examples: ['Grüner Veltliner','Cabernet Sauvignon', 'Chardonnay', 'Traminer', 'Merlot', 'Muscat']
  },
  {
    id: 'napoje',
    name: 'Ostatní alkoholické nápoje',
    icon: Martini,
    color: 'from-blue-100 to-blue-200 text-blue-800 border-blue-200',
    count: '73 produktů',
    examples: ['Vezel', 'Moport', 'Frisspool', 'Tračer', 'Charnay EX', 'Rušed']
  },
  {
    id: 'ovocne',
    name: 'Ovocná vína',
    icon: Wine,
    color: 'from-red-100 to-red-200 text-red-800 border-red-200',
    count: '8 produktů',
    examples: ['Borůvka', 'Višeň', 'Černý rybíz', 'Ostružina', 'Jahoda', 'Svařák']
  },
  {
    id: 'burcak',
    name: 'Burčák',
    icon: Amphora,
    color: 'from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-200',
    count: '2 produkty',
    examples: ['Moravský burčák', 'Částečně zkvašený hroznový mošt']
  },
  {
    id: 'dusik',
    name: 'Potravinářské plyny',
    icon: TestTube,
    color: 'from-gray-100 to-gray-200 text-gray-800 border-gray-200',
    count: '3 produkty',
    examples: ['Dusík potravinářský', 'Biogon', 'CO2']
  },
  {
    id: 'pet',
    name: 'PET láhve',
    icon: Box,
    color: 'from-amber-100 to-amber-200 text-amber-800 border-amber-200',
    count: '8 produktů',
    examples: ['PET láhve 1L', 'PET láhve 1,5L', 'PET láhve 2L', 'PET láhve 5L', 'Uzávěry', 'Ouška']
  }
];

interface ProductCategoriesProps {
  showAll?: boolean;  // Určuje, zda zobrazit všechny kategorie nebo jen část
  title?: string;     // Vlastní titulek sekce
  description?: string; // Vlastní popis sekce
  showCta?: boolean;  // Zobrazit CTA banner pod kategoriemi?
  className?: string; // Dodatečné CSS třídy pro wrapper
}

export default function ProductCategories({
  showAll = true,
  title = "Katalog vín a nápojů",
  description = "Kompletní sortiment našich produktů je dostupný v B2B portálu. Zde najdete základní přehled kategorií našeho sortimentu. Pro detailní informace o dostupnosti, cenách a objednávky kontaktujte našeho obchodního zástupce nebo použijte náš B2B portál.",
  showCta = true,
  className = ""
}: ProductCategoriesProps) {

  // Na hlavní stránce zobrazíme jen 3 kategorie
  const displayCategories = showAll
    ? productCategories
    : productCategories.slice(0, 3);

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-wine-burgundy mb-8">
          {title}
        </h2>

        {description && (
          <p className="text-gray-700 mb-12">
            {description}
          </p>
        )}
      </motion.div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-wine-burgundy mb-6">
          Kategorie produktů
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`border border-gray-200 rounded-xl bg-gradient-to-br ${category.color} p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center mb-4">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md mr-3`}>
                  <category.icon size={24} className={category.color.split(' ')[2]} />
                </span>
                <h3 className="font-bold text-xl">{category.name}</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium mb-3">{category.count}</p>
              <ul className="text-gray-700 mb-5 space-y-1">
                {category.examples.map((example, i) => (
                  <li key={i} className="text-sm">• {example}</li>
                ))}
              </ul>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.beginy.cz"
                className="inline-flex items-center text-wine-burgundy hover:text-wine-red transition-colors relative group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-medium">Zobrazit v B2B katalogu</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-8">
            <Link
              href="/katalog"
              className="inline-block bg-wine-burgundy text-white px-6 py-3 rounded-lg font-medium hover:bg-wine-red transition-colors shadow-md"
            >
              Zobrazit všechny kategorie
            </Link>
          </div>
        )}
      </div>

      {showCta && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
      )}
    </div>
  );
}
