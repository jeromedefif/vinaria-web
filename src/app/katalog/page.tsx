import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ProductCategories from '@/components/sections/product-categories';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';

export default function KatalogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
