import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Image from 'next/image';

export default function ONas() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-8">
          O nás
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <p className="font-montserrat text-gray-700 mb-4">
              VINARIA s.r.o. je rodinná firma založená otcem a synem Drápelovými v roce 2003. Navazujeme na více než čtyřsetletou
              tradici výroby vína v historických vinných sklepích přímo v sídle firmy na Jugoslávské ulici č. 4 v Brně.
            </p>
            <p className="font-montserrat text-gray-700 mb-4">
              Za téměř dvě dekády působení na českém trhu jsme si vybudovali pověst spolehlivého partnera ve velkoobchodu s vínem.
              Naší hlavní činností je provozování stáčírny vín a distribuce kvalitních zahraničních a moravských vín.
            </p>
            <p className="font-montserrat text-gray-700">
              Hlavní náplní firmy VINARIA je provozování stáčírny vín – velkoobchodu s vínem. Našimi zákazníky jsou
              distribuční sítě, vinaři, vinotéky, vinárny, restaurace a hotely.
            </p>
          </div>
          <div className="bg-gray-200 rounded-lg h-64 md:h-auto">
            {/* Zde by byl reálný obrázek vašich sklepů nebo firmy */}
          </div>
        </div>

        <div className="bg-wine-cream p-8 rounded-lg mb-12">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-6 text-center">
            Krédo naší firmy
          </h2>
          <p className="font-montserrat text-xl text-center text-gray-700 italic mb-0">
            "Včasné poskytování bezvadného produktu na celém území České republiky v přímé odezvě na přání zákazníka."
          </p>
        </div>

        <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-6">
          Co nabízíme
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-playfair text-xl font-bold text-wine-burgundy mb-4">Stáčírna vín</h3>
            <p className="font-montserrat text-gray-700 mb-4">
              Dovážíme nebalená vína v cisternách především z Rakouska, Moldávie, Itálie a Španělska. Standardně dodáváme
              pro odběratele kompletní analytický rozbor vín. Vína jsou před expedicí ošetřena svícovou filtrací o čistotě 0,5 µ.
            </p>
            <p className="font-montserrat text-gray-700">
              Nebalená vína distribuujeme zabalená dle přání zákazníka po celé ČR, obvykle v závozech 1.800 – 24.000 litrů.
            </p>
          </div>

          <div>
            <h3 className="font-playfair text-xl font-bold text-wine-burgundy mb-4">Velkoobchod vínem a nápoji</h3>
            <p className="font-montserrat text-gray-700 mb-4">
              Přicházíme s nabídkou balených (BAG-IN-BOX) a nebalených (KEG sudy) vín šitou přímo na míru pro vinotéky,
              vinárny, vinné šenky, restaurace, hotely a jiná gastronomická zařízení.
            </p>
            <p className="font-montserrat text-gray-700">
              Kromě vín nabízíme také široký sortiment ostatních alkoholických nápojů, potravinářských plynů a PET lahví.
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-6">
            Naše služby
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-playfair font-bold text-lg mb-2 text-wine-burgundy">Pravidelný rozvoz</h3>
              <p className="font-montserrat text-gray-700">
                Objednaná vína přivezeme na vaši provozovnu dle jednotlivých rozvozových tras po celé ČR.
              </p>
            </div>

            <div>
              <h3 className="font-playfair font-bold text-lg mb-2 text-wine-burgundy">KEG sudy</h3>
              <p className="font-montserrat text-gray-700">
                Pro distribuční sítě zapůjčujeme KEG sudy původem z Německa, osazeny standardně Flach fitinkem.
              </p>
            </div>

            <div>
              <h3 className="font-playfair font-bold text-lg mb-2 text-wine-burgundy">PET lahve</h3>
              <p className="font-montserrat text-gray-700">
                Zajistíme standardní dodávku PET lahví o objemech 1L, 1,5L, 2L a 5L pro zákazníky, kteří odebírají naše produkty.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
