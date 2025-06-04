"use client"

import BusinessAreas from '@/components/sections/business-areas';
import HeroSection from '@/components/sections/hero-section';
import ProductCategories from '@/components/sections/product-categories';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BusinessAreas />

<!-- Smartsupp Live Chat script -->
<script type="text/javascript">
var _smartsupp = _smartsupp || {};
_smartsupp.key = '5f252c61af225db2374bdc9a91f59b4e717d7f47';
window.smartsupp||(function(d) {
  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
  c.type='text/javascript';c.charset='utf-8';c.async=true;
  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
})(document);
</script>
<noscript> Powered by <a href=“https://www.smartsupp.com” target=“_blank”>Smartsupp</a></noscript>

        
        <section id="katalog" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductCategories
              showAll={false}
              title="Podívejte se na náš sortiment"
              description="Nabízíme široký sortiment produktů pro gastronomii a distribuční sítě. Podívejte se na ukázku našich nejprodávanějších kategorií nebo přejděte do kompletního katalogu."
              showCta={true}
            />
          </div>
        </section>

        {/* Nová sekce s výhodami spolupráce */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h3 className="text-2xl font-bold text-wine-burgundy mb-6">
                  Výhody spolupráce s námi
                </h3>

                <ul className="space-y-5">
                  <li className="flex gap-3 items-start bg-wine-cream/30 p-4 rounded-lg">
                    <div className="flex-shrink-0 bg-white rounded-full p-1">
                      <CheckCircle size={22} className="text-wine-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Kvalitní produkty</h4>
                      <p className="text-gray-700">
                        Nabízíme prověřená vína a nápoje od předních evropských vinařů a producentů z třetích zemí.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start bg-wine-cream/30 p-4 rounded-lg">
                    <div className="flex-shrink-0 bg-white rounded-full p-1">
                      <CheckCircle size={22} className="text-wine-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Flexibilní logistika</h4>
                      <p className="text-gray-700">
                        Zajistíme pravidelné dodávky po celé ČR s možností přizpůsobení vašim požadavkům.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start bg-wine-cream/30 p-4 rounded-lg">
                    <div className="flex-shrink-0 bg-white rounded-full p-1">
                      <CheckCircle size={22} className="text-wine-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Komplexní sortiment</h4>
                      <p className="text-gray-700">
                        Kromě vín a nápojů nabízíme široký sortiment obalů a potravinářských plynů.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start bg-wine-cream/30 p-4 rounded-lg">
                    <div className="flex-shrink-0 bg-white rounded-full p-1">
                      <CheckCircle size={22} className="text-wine-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Osobní přístup</h4>
                      <p className="text-gray-700">
                        Váš obchodní manažer je vám vždy k dispozici pro radu, pomoc a optimalizaci nabídky.
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>

              {/* Prostor pro fotografii */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex items-center justify-center"
              >
                <div className="w-full h-full relative min-h-[400px]">
                  <Image
                    src="/images/vyhody.jpeg"
                    alt="Výhody spolupráce s VINARIA s.r.o."
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

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
                  Navazujeme na čtyřsetletou tradici výroby vína v historických sklepích v Brně. Jako rodinná firma jsme již od roku 2003 spolehlivým partnerem ve velkoobchodu s vínem.
                </p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-playfair font-bold text-xl mb-4 text-wine-burgundy">Kvalita bez kompromisů</h3>
                <p className="font-montserrat text-gray-700">
                  Všechna naše vína a nápoje prochází pečlivou kontrolou kvality. Ke každé dodávce poskytujeme kompletní dokumentaci a průvodní doklady.
                </p>
              </div>
              <div className="border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-playfair font-bold text-xl mb-4 text-wine-burgundy">Flexibilní řešení</h3>
                <p className="font-montserrat text-gray-700">
                  Nabízíme širokou škálu balení od Bag-in-Box obalů až po KEG sudy. Dopravu zajišťujeme v rámci závozových tras po České republice zdarma.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
