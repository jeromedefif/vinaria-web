import BusinessAreas from '@/components/sections/business-areas';
import HeroSection from '@/components/sections/hero-section';
import ProductCategories from '@/components/sections/wine-collections';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BusinessAreas />
        <ProductCategories />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold text-wine-burgundy mb-4">
                Krédo naší firmy
              </h2>
              <p className="font-montserrat text-xl text-gray-700 max-w-3xl mx-auto italic">
                "Včasné poskytování bezvadného produktu na celém území České republiky v přímé odezvě na přání zákazníka."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-playfair font-bold text-xl mb-4 text-wine-burgundy">Tradice a spolehlivost</h3>
                <p className="font-montserrat text-gray-700">
                  Navazujeme na čtyřsetletou tradici výroby vína v historických sklepích v Brně. Jako rodinná firma od roku 2003 jsme spolehlivým partnerem ve velkoobchodu s vínem.
                </p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-playfair font-bold text-xl mb-4 text-wine-burgundy">Kvalita bez kompromisů</h3>
                <p className="font-montserrat text-gray-700">
                  Všechna naše vína prochází pečlivou kontrolou kvality a svícovou filtrací o čistotě 0,5 µ. Ke každé dodávce poskytujeme kompletní analytický rozbor vín.
                </p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-playfair font-bold text-xl mb-4 text-wine-burgundy">Flexibilní řešení</h3>
                <p className="font-montserrat text-gray-700">
                  Nabízíme širokou škálu balení od PET lahví a Bag-in-Box obalů až po KEG sudy. Dopravu zajišťujeme po celé České republice dle vašich požadavků.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
