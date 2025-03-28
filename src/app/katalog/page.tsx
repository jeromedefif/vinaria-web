// src/app/katalog/page.tsx
import { Metadata } from 'next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ProductCategories from '@/components/sections/product-categories';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';

// Dynamická metadata pro stránku katalogu
export const metadata: Metadata = {
  title: 'Katalog vín a nápojů | Vinaria - Velkoobchod vínem',
  description: 'Kompletní nabídka vín, burčáku a alkoholických nápojů pro gastronomii, vinotéky a hotely. Najděte kvalitní produkty pro svůj podnik.',
  openGraph: {
    title: 'Katalog vín a nápojů | Vinaria',
    description: 'Kompletní nabídka vín, burčáku a alkoholických nápojů pro gastronomii, vinotéky a hotely. Najděte kvalitní produkty pro svůj podnik.',
    images: [
      {
        url: '/images/og-katalog.jpg',
        width: 1200,
        height: 630,
        alt: 'Vinaria katalog produktů',
      },
    ],
    type: 'website',
  },
  // JSON-LD strukturovaná data
  alternates: {
    canonical: 'https://vinaria.cz/katalog',
  },
}

// Funkce pro generování JSON-LD strukturovaných dat
export function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Révová vína",
        "url": "https://vinaria.cz/katalog?oblast=vino",
        "description": "Kvalitní révová vína z Evropy a dalších vinařských oblastí."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Burčák",
        "url": "https://vinaria.cz/katalog?oblast=burcak",
        "description": "Moravský burčák a částečně zkvašený hroznový mošt."
      },
      // další položky...
    ]
  };
}

export default function KatalogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* JSON-LD strukturovaná data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
        <ProductCategories
          showAll={true}
          title="Katalog vín a nápojů"
          description="Kompletní sortiment našich produktů je dostupný v B2B portálu. Zde najdete základní přehled kategorií našeho sortimentu. Pro detailní informace o dostupnosti, cenách a objednávky kontaktujte našeho obchodního zástupce nebo použijte náš B2B portál."
          showCta={true}
        />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
