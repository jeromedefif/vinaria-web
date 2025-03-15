import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Link from 'next/link';

export default function GDPRPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-8">
          Ochrana osobních údajů (GDPR)
        </h1>

        <div className="font-montserrat text-gray-700 space-y-6">
          <p>
            Společnost VINARIA s.r.o., se sídlem Jugoslávská 868/4a, 613 00 Brno,
            IČO: 26904730, jako správce osobních údajů respektuje soukromí uživatelů
            a ochrana osobních údajů je pro nás prioritou.
          </p>

          <section className="my-8">
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              1. Jaké osobní údaje zpracováváme?
            </h2>
            <p className="mb-3">
              Zpracováváme osobní údaje, které nám poskytnete v souvislosti s využíváním
              našich služeb a návštěvou našich webových stránek. Jedná se zejména o:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Identifikační údaje (jméno, příjmení, IČO, název společnosti)</li>
              <li>Kontaktní údaje (e-mail, telefon, adresa)</li>
              <li>Údaje o objednávkách a nákupním chování</li>
              <li>Údaje z komunikace s námi</li>
              <li>Technické údaje o používání našeho webu (IP adresa, cookies)</li>
            </ul>
          </section>

          <section className="my-8">
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              2. Jak osobní údaje používáme?
            </h2>
            <p className="mb-3">
              Vaše osobní údaje používáme především k těmto účelům:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Poskytování našich služeb a produktů</li>
              <li>Komunikace s vámi</li>
              <li>Zlepšování našich služeb</li>
              <li>Marketing a personalizace</li>
              <li>Plnění právních povinností</li>
              <li>Ochrana našich práv a oprávněných zájmů</li>
            </ul>
          </section>

          <section className="my-8">
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              3. Právní základ zpracování
            </h2>
            <p className="mb-3">Vaše osobní údaje zpracováváme na základě:</p>
            <ul className="list-disc pl-8 space-y-2">
              <li>
                <strong>Plnění smlouvy</strong> - zpracování je nezbytné pro splnění smlouvy
                nebo pro provedení opatření přijatých před uzavřením smlouvy
              </li>
              <li>
                <strong>Oprávněného zájmu</strong> - máme oprávněný zájem na zasílání obchodních
                sdělení našim zákazníkům, ochraně našich práv a majetku
              </li>
              <li>
                <strong>Souhlasu</strong> - v případě marketingu vůči osobám, které nejsou našimi
                zákazníky, nebo pro některé cookies
              </li>
              <li>
                <strong>Plnění právních povinností</strong> - například v oblasti účetnictví a daní
              </li>
            </ul>
          </section>

          <section className="my-8">
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              4. Cookies a další technologie
            </h2>
            <p className="mb-3">
              Na našich webových stránkách používáme cookies a podobné technologie pro zajištění
              fungování webu a zlepšení uživatelského zážitku. Cookies jsou malé textové soubory,
              které se ukládají ve vašem prohlížeči.
            </p>
            <p className="mb-3">
              Používáme tyto typy cookies:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>
                <strong>Nezbytné cookies</strong> - tyto cookies jsou nezbytné pro fungování
                našeho webu a nemohou být vypnuty
              </li>
              <li>
                <strong>Analytické cookies</strong> - pomáhají nám pochopit, jak návštěvníci
                používají náš web, abychom mohli zlepšit jeho fungování
              </li>
              <li>
                <strong>Marketingové cookies</strong> - tyto cookies používáme k personalizaci
                obsahu a reklam a analýze našeho provozu
              </li>
            </ul>
            <p className="mt-3">
              Své preference týkající se cookies můžete kdykoli změnit v nastavení cookies
              ve spodní části našeho webu.
            </p>
          </section>

          <section className="my-8">
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              5. Doba zpracování osobních údajů
            </h2>
            <p className="mb-3">
              Vaše osobní údaje zpracováváme pouze po dobu nezbytně nutnou k naplnění účelu
              zpracování, nebo po dobu vyžadovanou právními předpisy.
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Údaje související s poskytováním služeb: po dobu trvání smluvního vztahu a 5 let po jeho ukončení</li>
              <li>Účetní a daňové doklady: 10 let od konce zdaňovacího období</li>
              <li>Marketingové údaje: max. 3 roky od posledního kontaktu nebo do odvolání souhlasu</li>
              <li>Cookies: v závislosti na typu cookies, max. 2 roky</li>
            </ul>
          </section>

          <section className="my-8">
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              6. Vaše práva
            </h2>
            <p className="mb-3">
              V souvislosti se zpracováním vašich osobních údajů máte následující práva:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Právo na přístup k osobním údajům</li>
              <li>Právo na opravu nepřesných nebo neúplných údajů</li>
              <li>Právo na výmaz (právo být zapomenut)</li>
              <li>Právo na omezení zpracování</li>
              <li>Právo na přenositelnost údajů</li>
              <li>Právo vznést námitku proti zpracování</li>
              <li>Právo odvolat souhlas se zpracováním</li>
              <li>Právo podat stížnost u dozorového úřadu (Úřad pro ochranu osobních údajů)</li>
            </ul>
          </section>

          <section className="my-8">
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              7. Kontaktní údaje
            </h2>
            <p className="mb-3">
              Pokud máte jakékoli dotazy týkající se zpracování vašich osobních údajů nebo
              chcete uplatnit svá práva, kontaktujte nás:
            </p>
            <address className="not-italic">
              <p><strong>VINARIA s.r.o.</strong></p>
              <p>Jugoslávská 868/4a</p>
              <p>613 00 Brno</p>
              <p>E-mail: <a href="mailto:info@vinaria.cz" className="text-wine-burgundy hover:underline">info@vinaria.cz</a></p>
              <p>Telefon: +420 734 720 994</p>
            </address>
          </section>

          <div className="py-6 border-t border-gray-200">
            <p>
              Tato informace o zpracování osobních údajů byla naposledy aktualizována dne 14. 3. 2025.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
