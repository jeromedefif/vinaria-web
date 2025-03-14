import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export default function Kontakt() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-wine-burgundy mb-8">
          Kontaktujte nás
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              Napište nám
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-montserrat text-gray-700 mb-1">Jméno a příjmení</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded font-montserrat"
                  placeholder="Vaše jméno"
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-montserrat text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded font-montserrat"
                  placeholder="Váš e-mail"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-montserrat text-gray-700 mb-1">Zpráva</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded font-montserrat"
                  placeholder="Vaše zpráva"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-wine-burgundy text-white px-6 py-2 rounded font-montserrat hover:bg-wine-red transition"
              >
                Odeslat zprávu
              </button>
            </form>
          </div>

          <div>
            <h2 className="font-playfair text-2xl font-bold text-wine-burgundy mb-4">
              Kontaktní údaje
            </h2>
            <div className="font-montserrat space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Společnost:</h3>
                <address className="not-italic">
                  <strong>VINARIA s.r.o.</strong><br />
                  Jugoslávská 868/4a<br />
                  613 00 Brno<br />
                  IČ: 26904730
                </address>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Ing. Michael Drápela, BA</h3>
                  <p className="text-gray-700">ředitel</p>
                  <p className="mt-1">
                    <a href="mailto:drapela@vinaria.cz" className="text-wine-burgundy hover:underline">
                      drapela@vinaria.cz
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">Ing. Roman Fiala</h3>
                  <p className="text-gray-700">obchodní manažer pro ČR</p>
                  <p className="mt-1">
                    <a href="tel:+420734720994" className="text-wine-burgundy hover:underline">
                      +420 734 720 994
                    </a>
                  </p>
                  <p>
                    <a href="mailto:fiala@vinaria.cz" className="text-wine-burgundy hover:underline">
                      fiala@vinaria.cz
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Kontaktní údaje:</h3>
                <p>
                  <span className="text-gray-700">E-mail:</span>{' '}
                  <a href="mailto:info@vinaria.cz" className="text-wine-burgundy hover:underline">
                    info@vinaria.cz
                  </a>
                </p>
                <p>
                  <span className="text-gray-700">Web:</span>{' '}
                  <a href="https://www.vinaria.cz" className="text-wine-burgundy hover:underline">
                    www.vinaria.cz
                  </a>
                </p>
                <p>
                  <span className="text-gray-700">B2B portál:</span>{' '}
                  <a href="https://www.beginy.cz" className="text-wine-burgundy hover:underline">
                    www.beginy.cz
                  </a>
                </p>
              </div>

              <div>
                <p className="font-semibold">Přímo v areálu se nachází parkoviště pro zákazníky.</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-playfair text-xl font-bold text-wine-burgundy mb-4">
                Kde nás najdete
              </h3>
              <div className="bg-gray-200 h-48 rounded-lg">
                {/* Zde by byla vložena mapa */}
                {/* Například iframe s Google Maps */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Interaktivní mapa
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
