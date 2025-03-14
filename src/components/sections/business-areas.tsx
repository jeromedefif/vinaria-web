"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';

const businessAreas = [
  {
    id: 'stacirna',
    title: 'Stáčírna vín',
    description: 'Prodej nebalených vín v cisternách, IBC kontejnerech nebo v KEG sudech pro vinaře a distribuční sítě.',
    icon: '🍷', // Můžete nahradit SVG ikonou
  },
  {
    id: 'velkoobchod-vino',
    title: 'Velkoobchod vínem',
    description: 'Balená a nebalená vína v Bag-in-Box (5L, 10L, 20L) a KEG sudech (30L, 50L) pro gastronomii a vinotéky.',
    icon: '🍇', // Můžete nahradit SVG ikonou
  },
  {
    id: 'ostatni-napoje',
    title: 'Ostatní alkoholické nápoje',
    description: 'Výroba a distribuce alkoholických nápojů pro gastronomická zařízení v KEG sudech 30L a 50L.',
    icon: '🥃', // Můžete nahradit SVG ikonou
  },
  {
    id: 'pet-lahve',
    title: 'Prodej PET lahví',
    description: 'Dodávky PET lahví o objemech 1L, 1,5L, 2L a 5L pro zákazníky, kteří odebírají naše produkty.',
    icon: '🧴', // Můžete nahradit SVG ikonou
  },
  {
    id: 'plyny',
    title: 'Potravinářské plyny',
    description: 'Nabídka potravinářského dusíku, Biogonu a CO2 pro gastronomii a nápojový průmysl.',
    icon: '💨', // Můžete nahradit SVG ikonou
  },
];

export default function BusinessAreas() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-4">
            Oblasti našeho působení
          </h2>
          <p className="font-montserrat text-gray-700 max-w-3xl mx-auto">
            Jsme komplexním dodavatelem v oblasti vín a nápojů s širokým portfoliem služeb a produktů pro gastronomii a distribuční sítě.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessAreas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{area.icon}</div>
              <h3 className="font-playfair text-xl font-bold text-wine-burgundy mb-2">
                {area.title}
              </h3>
              <p className="font-montserrat text-gray-700 mb-4">
                {area.description}
              </p>
              <Link
                href={`/katalog?oblast=${area.id}`}
                className="font-montserrat inline-block text-wine-burgundy border-b-2 border-wine-gold pb-1 transition hover:text-wine-red"
              >
                Zobrazit produkty
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
