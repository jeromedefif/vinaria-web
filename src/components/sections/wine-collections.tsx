"use client"

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Grape, Wine, Martini, TestTube, Box, Amphora } from 'lucide-react';
import { motion } from 'framer-motion';

// Produktové kategorie s ikonami a barvami podobnými B2B portálu
const categories = [
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
    name: 'Nápoje',
    icon: Martini,
    color: 'from-blue-100 to-blue-200 text-blue-800 border-blue-200',
    count: '73 produktů',
    examples: ['Vezel', 'Moport', 'Frisspool', 'Tračer', 'Charnay EX', 'Rušed']
  },
  {
    id: 'ovocne',
    name: 'Ovocné víno',
    icon: Wine,
    color: 'from-red-100 to-red-200 text-red-800 border-red-200',
    count: '8 produktů',
    examples: ['Borůvka', 'Višeň', 'Johannisberwein (rybíz)', 'STRAWBERRY', 'Svařák']
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
    name: 'Dusík',
    icon: TestTube,
    color: 'from-gray-100 to-gray-200 text-gray-800 border-gray-200',
    count: '3 produkty',
    examples: ['Dusík - potravinářský', 'Biogon', 'CO2']
  },
  {
    id: 'pet',
    name: 'PET',
    icon: Box,
    color: 'from-amber-100 to-amber-200 text-amber-800 border-amber-200',
    count: '8 produktů',
    examples: ['PET láhve 1L', 'PET láhve 1,5L', 'PET láhve 2L', 'PET láhve 5L', 'Uzávěry', 'Ouška']
  }
];

export default function Katalog() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-wine-burgundy mb-8">
            Katalog vín a nápojů
          </h1>

          <p className="text-gray-700 mb-12">
            Kompletní sortiment našich produktů je dostupný v B2B portálu. Zde najdete základní přehled kategorií našeho sortimentu.
            Pro detailní informace o dostupnosti, cenách a objednávky kontaktujte našeho obchodního zástupce nebo použijte náš B2B portál.
          </p>
        </motion.div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-wine-burgundy mb-6">
            Kategorie produktů
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category, index) => (
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-gradient-to-r from-wine-burgundy to-wine-red rounded-xl p-10 text-center text-white shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4">
            Kompletní sortiment v B2B katalogu
          </h2>
          <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
            Pro přístup ke kompletnímu sortimentu včetně cen, dostupnosti a možnosti online objednávky se registrujte v našem B2B systému.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.beginy.cz"
              className="bg-wine-gold text-wine-burgundy px-6 py-3 rounded-lg font-medium hover:bg-white transition-colors shadow-md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Přihlásit se do B2B
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/obchodni-zastupce"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-wine-burgundy transition-colors"
              >
                Kontaktovat obchodního zástupce
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
