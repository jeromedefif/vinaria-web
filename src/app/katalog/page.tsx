import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Link from 'next/link';
import { Grape, Wine, Martini, TestTube, Box, Amphora } from 'lucide-react';

// Produktové kategorie s ikonami a barvami podobnými B2B portálu
const categories = [
  {
    id: 'vino',
    name: 'Révová vína',
    icon: Grape,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    count: '40+ produktů',
    examples: ['Grüner Veltliner','Cabernet Sauvignon', 'Chardonnay', 'Traminer', 'Merlot', 'Muscat']
  },
  {
    id: 'napoje',
    name: 'Nápoje',
    icon: Martini,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    count: '73 produktů',
    examples: ['Vezel', 'Moport', 'Frisspool', 'Tračer', 'Charnay EX', 'Rušed']
  },
  {
    id: 'ovocne',
    name: 'Ovocné víno',
    icon: Wine,
    color: 'bg-red-100 text-red-800 border-red-200',
    count: '8 produktů',
    examples: ['Borůvka', 'Višeň', 'Johannisberwein (rybíz)', 'STRAWBERRY', 'Svařák']
  },
  {
    id: 'burcak',
    name: 'Burčák',
    icon: Amphora, // Změna z Droplet na Amphora
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    count: '2 produkty',
    examples: ['Moravský burčák', 'Částečně zkvašený hroznový mošt']
  },
  {
    id: 'dusik',
    name: 'Dusík',
    icon: TestTube,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    count: '3 produkty',
    examples: ['Dusík - potravinářský', 'Biogon', 'CO2']
  },
  {
    id: 'pet',
    name: 'PET',
    icon: Box,
    color: 'bg-amber-100 text-amber-800 border-amber-200',
    count: '8 produktů',
    examples: ['PET láhve 1L', 'PET láhve 1,5L', 'PET láhve 2L', 'PET láhve 5L', 'Uzávěry', 'Ouška']
  }
];

export default function Katalog() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-8">
          Katalog vín a nápojů
        </h1>

        <p className="font-montserrat text-gray-700 mb-12">
          Kompletní sortiment našich produktů je dostupný v B2B portálu. Zde najdete základní přehled kategorií našeho sortimentu.
          Pro detailní informace o dostupnosti, cenách a objednávky kontaktujte našeho obchodního zástupce nebo použijte náš B2B portál.
        </p>

        <div className="mb-12">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-6">
            Kategorie produktů
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category) => (
              <div key={category.id} className={`border ${category.color.split(' ')[2]} rounded-lg p-6 transition-shadow hover:shadow-md`}>
                <div className="flex items-center mb-4">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${category.color.split(' ').slice(0, 2).join(' ')} mr-3`}>
                    <category.icon size={20} />
                  </span>
                  <h3 className="font-playfair font-bold text-xl">{category.name}</h3>
                </div>
                <p className="font-montserrat text-sm text-gray-500 mb-3">{category.count}</p>
                <ul className="font-montserrat text-gray-700 mb-4 space-y-1">
                  {category.examples.map((example, i) => (
                    <li key={i} className="text-sm">• {example}</li>
                  ))}
                </ul>
                <a
                  href="https://www.beginy.cz"
                  className="font-montserrat inline-block text-wine-burgundy border-b-2 border-wine-gold pb-1 transition hover:text-wine-red"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zobrazit v B2B katalogu
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-wine-cream rounded-lg p-8 text-center">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
            Kompletní sortiment v B2B katalogu
          </h2>
          <p className="font-montserrat text-gray-700 mb-6 max-w-2xl mx-auto">
            Pro přístup ke kompletnímu sortimentu včetně cen, dostupnosti a možnosti online objednávky se registrujte v našem B2B systému.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.beginy.cz"
              className="font-montserrat bg-wine-burgundy text-white px-6 py-3 rounded font-medium hover:bg-wine-red transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              Přihlásit se do B2B
            </a>
            <Link
              href="/kontakt"
              className="font-montserrat border border-wine-burgundy text-wine-burgundy px-6 py-3 rounded font-medium hover:bg-wine-burgundy hover:text-white transition"
            >
              Kontaktovat obchodního zástupce
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
