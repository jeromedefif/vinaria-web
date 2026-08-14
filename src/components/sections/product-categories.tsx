"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Grape, Wine, Martini, TestTube, Box, Amphora, Sparkles, Users, ArrowRight } from 'lucide-react';
import type { BeginyCatalog, BeginyCatalogCategory } from '@/lib/beginy-catalog';

const CATEGORY_PRESENTATION = {
  vino: {
    displayName: 'Révová vína',
    icon: Grape,
    color: 'from-purple-100 to-purple-200 text-purple-800 border-purple-200'
  },
  perlive: {
    displayName: 'Perlivé',
    icon: Sparkles,
    color: 'from-teal-100 to-teal-200 text-teal-800 border-teal-200'
  },
  napoje: {
    displayName: 'Ostatní alkoholické nápoje',
    icon: Martini,
    color: 'from-blue-100 to-blue-200 text-blue-800 border-blue-200'
  },
  'ovocne-vino': {
    displayName: 'Ovocná vína',
    icon: Wine,
    color: 'from-red-100 to-red-200 text-red-800 border-red-200'
  },
  burcak: {
    displayName: 'Burčák',
    icon: Amphora,
    color: 'from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-200'
  },
  plyny: {
    displayName: 'Potravinářské plyny',
    icon: TestTube,
    color: 'from-cyan-100 to-cyan-200 text-cyan-800 border-cyan-200'
  },
  pet: {
    displayName: 'PET láhve',
    icon: Box,
    color: 'from-amber-100 to-amber-200 text-amber-800 border-amber-200'
  }
} as const;

const fallbackCategories: BeginyCatalogCategory[] = [
  {
    slug: 'vino',
    name: 'Révová vína',
    description: '',
    url: 'https://www.beginy.cz/produkty/kategorie/vino',
    productCount: 0,
    products: []
  },
  {
    slug: 'perlive',
    name: 'Perlivé',
    description: '',
    url: 'https://www.beginy.cz/produkty/kategorie/perlive',
    productCount: 0,
    products: []
  },
  {
    slug: 'napoje',
    name: 'Ostatní alkoholické nápoje',
    description: '',
    url: 'https://www.beginy.cz/produkty/kategorie/napoje',
    productCount: 0,
    products: []
  },
  {
    slug: 'ovocne-vino',
    name: 'Ovocná vína',
    description: '',
    url: 'https://www.beginy.cz/produkty/kategorie/ovocne-vino',
    productCount: 0,
    products: []
  },
  {
    slug: 'burcak',
    name: 'Burčák',
    description: '',
    url: 'https://www.beginy.cz/produkty/kategorie/burcak',
    productCount: 0,
    products: []
  },
  {
    slug: 'plyny',
    name: 'Potravinářské plyny',
    description: '',
    url: 'https://www.beginy.cz/produkty/kategorie/plyny',
    productCount: 0,
    products: []
  },
  {
    slug: 'pet',
    name: 'PET láhve',
    description: '',
    url: 'https://www.beginy.cz/produkty/kategorie/pet',
    productCount: 0,
    products: []
  }
];

function formatProductCount(count: number) {
  if (count === 1) return '1 produkt';
  if (count >= 2 && count <= 4) return `${count} produkty`;
  return `${count} produktů`;
}

interface ProductCategoriesProps {
  showAll?: boolean;  // Určuje, zda zobrazit všechny kategorie nebo jen část
  title?: string;     // Vlastní titulek sekce
  description?: string; // Vlastní popis sekce
  showCta?: boolean;  // Zobrazit CTA banner pod kategoriemi?
  className?: string; // Dodatečné CSS třídy pro wrapper
  categories?: BeginyCatalogCategory[];
}

export default function ProductCategories({
  showAll = true,
  title = "Katalog vín a nápojů",
  description = "Kompletní sortiment našich produktů je dostupný v B2B portálu. Zde najdete základní přehled kategorií našeho sortimentu. Pro detailní informace o dostupnosti, cenách a objednávky kontaktujte našeho obchodního zástupce nebo použijte náš B2B portál.",
  showCta = true,
  className = "",
  categories
}: ProductCategoriesProps) {

  const [liveCategories, setLiveCategories] = useState(categories || fallbackCategories);

  useEffect(() => {
    if (categories) return;

    const controller = new AbortController();
    fetch('/api/catalog', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Catalog API returned ${response.status}`);
        return response.json() as Promise<BeginyCatalog>;
      })
      .then((catalog) => setLiveCategories(catalog.categories))
      .catch((error) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Unable to refresh product categories:', error);
        }
      });

    return () => controller.abort();
  }, [categories]);

  // Na hlavní stránce zobrazíme jen 3 kategorie
  const displayCategories = showAll
    ? liveCategories
    : liveCategories.slice(0, 3);

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
          {displayCategories.map((category, index) => {
            const presentation = CATEGORY_PRESENTATION[category.slug as keyof typeof CATEGORY_PRESENTATION];
            const Icon = presentation?.icon || Box;
            const color = presentation?.color || 'from-gray-100 to-gray-200 text-gray-800 border-gray-200';
            const displayName = presentation?.displayName || category.name;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`border border-gray-200 rounded-xl bg-gradient-to-br ${color} p-6 shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md mr-3">
                    <Icon size={24} className={color.split(' ')[2]} />
                  </span>
                  <h3 className="font-bold text-xl">{displayName}</h3>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-3">{formatProductCount(category.productCount)}</p>
                <ul className="text-gray-700 mb-5 space-y-1">
                  {category.products.slice(0, 6).map((product) => (
                    <li key={product.id} className="text-sm">
                      <a href={product.url} target="_blank" rel="noopener noreferrer" className="hover:text-wine-burgundy hover:underline">
                        • {product.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href={category.url}
                  className="inline-flex items-center text-wine-burgundy hover:text-wine-red transition-colors relative group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-medium">Zobrazit celou kategorii</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine-gold group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              </motion.div>
            );
          })}
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
