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
              Naší hlavní činností je distribuce kvalitních zahraničních a moravských vín a výroba ostatních alkoholických nápojů.
            </p>
            <p className="font-montserrat text-gray-700">
              Hlavní náplní firmy VINARIA s.r.o. je velkoobchod s vínem a nápoji. Našimi zákazníky jsou
              distribuční sítě, vinaři, vinotéky, vinárny, restaurace a hotely.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden h-64 md:h-auto">
            <Image
              src="/images/stary_sud.jpg"
              alt="Vinný sklep VINARIA"
              width={600}
              height={400}
              className="rounded-lg w-full h-full object-cover"
              priority
            />
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

        <div className="mb-12">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-6">
            Náš přístup k zákazníkům
          </h2>
          <p className="font-montserrat text-gray-700 mb-6">
            Naší filozofií je dlouhodobě poskytovat produkty přesně podle potřeb našich klientů. Vyrábíme v přímé odezvě
            na přání zákazníka a plníme až na základě konkrétních požadavků. Díky tomuto přístupu zaručujeme čerstvost
            a kvalitu dodávaných produktů, spolu s maximální flexibilitou při uspokojování individuálních potřeb.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-6">
            Historie a milníky
          </h2>

          <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm">
            <p className="font-montserrat text-gray-700 mb-4">
              Zakladatelé firmy přinesli do vinařského odvětví svěží pohled podložený ekonomickým vzděláním. Ředitel Michael Drápela
              i obchodní manažer Roman Fiala působili před vstupem do světa vína v mezinárodním obchodě v segmentu automotive. Právě
              tento netradiční přístup k tradičnímu odvětví umožnil firmě VINARIA realizovat řadu inovativních projektů.
            </p>

            <p className="font-montserrat text-gray-700 mb-4">
              Naše cesta byla lemována významnými milníky. V roce 2005 jsme zahájili dovoz a prodej jakostních nebalených vín ze zemí EU,
              což zůstává součástí našeho portfolia dodnes. O tři roky později jsme obohatili český trh o španělské víno zrající 6 měsíců
              v dubových sudech, které si udrželo popularitu celou dekádu. Rok 2009 se nesl ve znamení importu KEG sudů z Německa.
            </p>

            <p className="font-montserrat text-gray-700 mb-4">
              Rok 2010 přinesl nezapomenutelné řízené degustace v našich historických sklepích, které jsme organizovali pro bankovní
              instituce za doprovodu houslového tria. V roce 2015 jsme navázali spolupráci s rakouským výrobcem a uvedli na český trh
              sycené ovocné víno v plechovkách. O dva roky později jsme rozšířili naši nabídku o dovoz a prodej nebaleného dezertního
              ovocného vína.
            </p>

            <p className="font-montserrat text-gray-700 mb-4">
              Významný byl pro nás rok 2019, kdy jsme zajistili legislativní zázemí pro dovoz a prodej vína s extrakty konopí a současně
              jsme zahájili výrobu ostatních alkoholických nápojů. Nejnověji, v roce 2024, jsme začali se sycením ostatního alkoholického nápoje.
            </p>

            <p className="font-montserrat text-gray-700">
              Za dvě dekády působení jsme úspěšně překonali četné legislativní změny provázející náš obor a podařilo se nám zachovat si
              optimismus a nadšení pro kvalitní vína, které rádi předáváme dál našim zákazníkům.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
