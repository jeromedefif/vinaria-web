"use client"

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, Building, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ObchodniZastupce() {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const openOfferModal = () => {
    setIsOfferModalOpen(true);
    setIsSubmitted(false);
    setSubmitError(null);
  };

  const closeOfferModal = () => {
    setIsOfferModalOpen(false);
    setIsSubmitting(false);
    setSubmitError(null);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('offer') === '1') {
      openOfferModal();
    }
  }, []);

  const handleOfferSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const accessKey = process.env.NEXT_PUBLIC_STATICFORMS_KEY;
    if (!accessKey) {
      setIsSubmitting(false);
      setSubmitError('Formulář není správně nastaven. Zkuste to prosím později.');
      return;
    }

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.set('accessKey', accessKey);

      const response = await fetch('https://api.staticforms.dev/submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Odeslání se nezdařilo');
      }

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError('Odeslání se nezdařilo. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            První krok k úspěšné spolupráci začíná u našeho obchodního manažera,
            který je připraven Vám pomoci se vším, co potřebujete.
          </p>
        </motion.div>

        {/* Profil obchodního manažera - modernizovaný */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
        >
          <div className="md:flex md:items-stretch">
            <div className="md:w-1/3 bg-gradient-to-b from-wine-burgundy to-wine-red text-white p-10 flex flex-col justify-between items-center">
              <div className="w-full flex flex-col items-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-wine-gold shadow-lg">
                  <Image
                    src="/images/selfie.jpg"
                    alt="Ing. Roman Fiala - Obchodní manažer"
                    fill
                    className="object-cover scale-[1]"
                    priority
                  />
                </div>

                <h2 className="text-2xl font-bold mb-1">Ing. Roman Fiala</h2>
                <p className="mb-6">obchodní manažer pro ČR</p>
              </div>

              <div className="w-full space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="tel:+420734720994"
                    className="flex items-center justify-center gap-2 bg-wine-gold text-wine-burgundy px-6 py-3 rounded-full font-medium hover:bg-white hover:text-wine-burgundy transition shadow-md w-full"
                  >
                    <Phone size={20} />
                    <span>+420 734 720 994</span>
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="mailto:fiala@vinaria.cz"
                    className="flex items-center justify-center gap-2 bg-wine-gold text-wine-burgundy px-6 py-3 rounded-full font-medium hover:bg-white hover:text-wine-burgundy transition shadow-md w-full"
                  >
                    <Mail size={20} />
                    <span>fiala@vinaria.cz</span>
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="button"
                    onClick={openOfferModal}
                    className="flex items-center justify-center gap-2 bg-wine-gold text-wine-burgundy px-6 py-3 rounded-full font-medium hover:bg-white hover:text-wine-burgundy transition shadow-md w-full"
                  >
                    <span>Chci nabídku</span>
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="https://www.beginy.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-wine-gold text-wine-burgundy px-6 py-3 rounded-full font-medium hover:bg-white hover:text-wine-burgundy transition shadow-md w-full"
                  >
                    <ShoppingBag size={20} />
                    <span>B2B - beginy.cz</span>
                  </a>
                </motion.div>
              </div>
            </div>

            <div className="md:w-2/3 p-10 pt-4">
              <h3 className="text-2xl font-bold text-wine-burgundy mb-6">
                Zvolte si preferovaný způsob prvního kontaktu
              </h3>

              <div className="grid md:grid-cols-2 gap-8 grid-flow-row auto-rows-fr">
                <button type="button" onClick={openOfferModal} className="text-left w-full">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md cursor-pointer h-full text-left"
                  >
                    <div className="bg-wine-burgundy p-4 rounded-full shadow-md flex-shrink-0">
                      <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16v16H4z" />
                        <path d="M8 8h8" />
                        <path d="M8 12h8" />
                        <path d="M8 16h4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Žádost o velkoobchodní nabídku</h4>
                      <p className="text-gray-700 mb-3">
                        Zanechte kontakt a připravíme vám cenovou nabídku na míru. Ozveme se vám co nejdříve.
                      </p>
                      <span className="text-lg font-semibold text-wine-burgundy hover:text-wine-red transition-colors flex items-center">
                        <span className="mr-2">Chci nabídku</span>
                      </span>
                    </div>
                  </motion.div>
                </button>

                <a href="tel:+420734720994">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md cursor-pointer h-full"
                  >
                    <div className="bg-wine-burgundy p-4 rounded-full shadow-md flex-shrink-0">
                      <Phone size={22} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Zavolám</h4>
                      <p className="text-gray-700 mb-3">
                        Preferujete telefonní komunikaci? Zavolejte mi přímo a prodiskutujeme Vaše požadavky. K dispozici jsem v pracovních dnech 8:00-16:00.
                      </p>
                      <span className="text-lg font-semibold text-wine-burgundy hover:text-wine-red transition-colors flex items-center">
                        <Phone size={16} className="mr-2" />
                        +420 734 720 994
                      </span>
                    </div>
                  </motion.div>
                </a>

                <a href="mailto:fiala@vinaria.cz">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md cursor-pointer h-full"
                  >
                    <div className="bg-wine-burgundy p-4 rounded-full shadow-md flex-shrink-0">
                      <Mail size={22} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Napíši e-mail</h4>
                      <p className="text-gray-700 mb-3">
                        Pokud nemáte čas na telefonát, napište mi e-mail s Vašimi základními požadavky.
                      </p>
                      <span className="text-lg font-semibold text-wine-burgundy hover:text-wine-red transition-colors flex items-center">
                        <Mail size={16} className="mr-2" />
                        fiala@vinaria.cz
                      </span>
                    </div>
                  </motion.div>
                </a>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md h-full"
                >
                  <div className="bg-wine-burgundy p-4 rounded-full shadow-md flex-shrink-0">
                    <Building size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Chci se sejít osobně</h4>
                    <p className="text-gray-700">
                      VINARIA s.r.o.<br />
                      Jugoslávská 868/4a<br />
                      613 00 Brno<br />
                      Po-Pá / 9:00-15:00<br />
                      Než se k nám vydáte,
                      domluvte si prosím chůzku předem.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* B2B registrační banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-wine-burgundy to-wine-red rounded-xl p-10 text-center text-white shadow-xl mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vyzkoušejte náš B2B portál - beginy.cz
          </h2>
          <p className="mb-8 max-w-3xl mx-auto opacity-90">
            Zaregistrujte se do našeho B2B systému a získejte přístup ke kompletnímu sortimentu
            a možnosti online objednávek pro vaši firmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://www.beginy.cz/register"
                className="flex items-center justify-center gap-2 bg-wine-gold text-wine-burgundy px-8 py-3 rounded-lg font-medium hover:bg-white transition shadow-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingBag size={18} />
                <span>Registrace do B2B</span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Informační poznámka pod bannerem */}
        <div className="mt-4 mb-16 flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
          <Info size={22} className="flex-shrink-0 text-blue-600 mt-1" />
          <p className="text-sm text-gray-700">
            <strong>Poznámka:</strong> B2B portál je určen výhradně pro firemní zákazníky
            (vinotéky, vinárny, restaurace, hotely a distribuční sítě). Neposkytujeme
            přístup koncovým zákazníkům.
          </p>
        </div>
      </main>
      <Footer />

      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full relative">
            <button
              type="button"
              onClick={closeOfferModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Zavřít"
            >
              ✕
            </button>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-wine-burgundy mb-2">
                Žádost o velkoobchodní nabídku
              </h3>
              <p className="text-gray-700 mb-6">
                Zanechte nám prosím kontakt. Ozveme se vám s cenovou nabídkou.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Děkujeme, ozveme se vám co nejdříve.
                </div>
              ) : (
                <form onSubmit={handleOfferSubmit} className="space-y-4">
                  <input type="hidden" name="subject" value="Žádost o velkoobchodní nabídku" />
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div>
                    <label htmlFor="offerName" className="block text-gray-700 mb-1 font-medium">
                      Jméno a příjmení *
                    </label>
                    <input
                      id="offerName"
                      name="name"
                      type="text"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
                    />
                  </div>

                  <div>
                    <label htmlFor="offerPhone" className="block text-gray-700 mb-1 font-medium">
                      Telefon *
                    </label>
                    <input
                      id="offerPhone"
                      name="phone"
                      type="tel"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
                    />
                  </div>

                  <div>
                    <label htmlFor="offerEmail" className="block text-gray-700 mb-1 font-medium">
                      E-mail *
                    </label>
                    <input
                      id="offerEmail"
                      name="email"
                      type="email"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      id="offerConsent"
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 text-wine-burgundy border-gray-300 rounded focus:ring-wine-burgundy"
                    />
                    <label htmlFor="offerConsent" className="text-sm text-gray-600">
                      Souhlasím se zpracováním osobních údajů za účelem obchodní komunikace.
                    </label>
                  </div>

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-wine-burgundy text-white px-6 py-3 rounded-lg hover:bg-wine-red transition-colors ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Odesílám...' : 'Odeslat žádost'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Custom components for icons
function ShoppingBag(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
