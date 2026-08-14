// src/app/katalog/page.tsx
import { Metadata } from 'next';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ProductCategories from '@/components/sections/product-categories';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import { getBeginyCatalog, type BeginyCatalogCategory } from '@/lib/beginy-catalog';

export const revalidate = 300;

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
function generateStructuredData(categories: BeginyCatalogCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": categories.map((category, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": category.name,
      "url": category.url,
      "description": category.description
    }))
  };
}

export default async function KatalogPage() {
  const catalog = await getBeginyCatalog();
  const categories = catalog?.categories || [];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* JSON-LD strukturovaná data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData(categories)).replace(/</g, '\\u003c')
          }}
        />
        <ProductCategories
          categories={catalog?.categories}
          showAll={true}
          title="Katalog vín a nápojů"
          description="Aktuální přehled produktů z našeho B2B katalogu. Dostupnost a sortiment se automaticky aktualizují podle nabídky na Beginy.cz. Pro objednávku se přihlaste do B2B portálu nebo kontaktujte našeho obchodního zástupce."
          showCta={true}
        />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
