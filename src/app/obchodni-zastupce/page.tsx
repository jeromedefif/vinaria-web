"use client"

import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, Calendar, FileCheck, Building, ArrowRight, Info, CheckCircle, Clock, Send, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ObchodniZastupce() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
    });
    // Show success message (in a real app)
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
            který je připraven vám pomoci se vším, co potřebujete.
          </p>
        </motion.div>

        {/* Profil obchodního manažera - modernizovaný */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
        >
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-wine-burgundy to-wine-red text-white p-10 flex flex-col justify-center items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-wine-gold shadow-lg">
                <Image
                  src="/images/selfie.jpeg"
                  alt="Ing. Roman Fiala - Obchodní manažer"
                  fill
                  className="object-cover scale-[1]"
                  priority
                />
              </div>

              <h2 className="text-2xl font-bold mb-1">Ing. Roman Fiala</h2>
              <p className="mb-6">Obchodní manažer pro ČR</p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 w-full"
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
                className="mt-4 w-full"
              >
                <a
                  href="mailto:fiala@vinaria.cz"
                  className="flex items-center justify-center gap-2 bg-wine-gold text-wine-burgundy px-6 py-3 rounded-full font-medium hover:bg-white hover:text-wine-burgundy transition shadow-md w-full"
                >
                  <Mail size={20} />
                  <span>fiala@vinaria.cz</span>
                </a>
              </motion.div>
            </div>

            <div className="md:w-2/3 p-10">
              <h3 className="text-2xl font-bold text-wine-burgundy mb-6 mt-0">
                Co preferuji při prvním kontaktu:
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md"
                >
                  <div className="bg-wine-burgundy p-4 rounded-full shadow-md">
                    <Phone size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Telefonický rozhovor</h4>
                    <p className="text-gray-700 mb-3">
                      Nejrychlejší způsob pro první kontakt. K dispozici v pracovních dnech 8:00-16:00.
                    </p>
                    <a
                      href="tel:+420734720994"
                      className="text-lg font-semibold text-wine-burgundy hover:text-wine-red transition-colors flex items-center"
                    >
                      <Phone size={16} className="mr-2" />
                      +420 734 720 994
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md"
                >
                  <div className="bg-wine-burgundy p-4 rounded-full shadow-md">
                    <Mail size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">E-mailem</h4>
                    <p className="text-gray-700 mb-3">
                      Pošlete nám e-mail s vaším požadavkem a ozveme se zpět do 24 hodin.
                    </p>
                    <a
                      href="mailto:fiala@vinaria.cz"
                      className="text-lg font-semibold text-wine-burgundy hover:text-wine-red transition-colors flex items-center"
                    >
                      <Mail size={16} className="mr-2" />
                      fiala@vinaria.cz
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex gap-4 items-start bg-gray-50 p-5 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md"
                >
                  <div className="bg-wine-burgundy p-4 rounded-full shadow-md">
                    <Building size={22} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Naše sídlo</h4>
                    <p className="text-gray-700">
                      VINARIA s.r.o.<br />
                      Jugoslávská 868/4a<br />
                      613 00 Brno<br />
                      po-pá 9:00-15:00<br />
                      <b>Pouze velkoobchodní prodej</b>
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <a
                    href="https://www.vinaria.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-50 px-6 py-3 rounded-lg text-wine-burgundy hover:bg-gray-100 transition shadow-sm"
                  >
                    <Globe size={18} className="text-wine-gold" />
                    <span className="font-medium">www.vinaria.cz</span>
                  </a>
                  <a
                    href="https://www.beginy.cz/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-wine-cream px-6 py-3 rounded-lg text-wine-burgundy hover:bg-wine-cream/80 transition shadow-sm"
                  >
                    <ShoppingBag size={18} className="text-wine-gold" />
                    <span className="font-medium">B2B portál: www.beginy.cz</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* B2B registrační banner - přesunutý nad sekce postupu registrace a výhod */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-wine-burgundy to-wine-red rounded-xl p-10 text-center text-white shadow-xl mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Přistupte k našemu B2B portálu
          </h2>
          <p className="mb-8 max-w-3xl mx-auto opacity-90">
            Zaregistrujte se do našeho B2B systému a získejte přístup ke kompletnímu sortimentu,
            ceníkům a možnosti online objednávek pro vaši firmu.
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

        {/* Registrace a spolupráce */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-wine-burgundy mb-6 flex items-center">
              <FileCheck size={26} className="mr-3 text-wine-gold" />
              Postup registrace do B2B systému
            </h3>

            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="flex-shrink-0 bg-gradient-to-br from-wine-burgundy to-wine-red text-white w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-md">1</div>
                <div>
                  <h4 className="font-bold text-lg">Kontaktujte obchodního manažera</h4>
                  <p className="text-gray-700">
                    Telefonicky nebo e-mailem nás informujte o vašem zájmu o spolupráci.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex-shrink-0 bg-gradient-to-br from-wine-burgundy to-wine-red text-white w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-md">2</div>
                <div>
                  <h4 className="font-bold text-lg">Obdržíte přístupové údaje</h4>
                  <p className="text-gray-700">
                    Po dohodě vám zřídíme přístup do B2B portálu s kompletní nabídkou.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="flex-shrink-0 bg-gradient-to-br from-wine-burgundy to-wine-red text-white w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-md">3</div>
                <div>
                  <h4 className="font-bold text-lg">Začněte objednávat</h4>
                  <p className="text-gray-700">
                    V B2B portálu můžete snadno prohlížet aktuální sortiment, dostupnost a zadávat objednávky.
                  </p>
                </div>
              </li>
            </ol>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                <Info size={22} className="flex-shrink-0 text-blue-600 mt-1" />
                <p className="text-sm text-gray-700">
                  <strong>Poznámka:</strong> B2B portál je určen výhradně pro firemní zákazníky
                  (vinotéky, vinárny, restaurace, hotely a distribuční sítě). Neposkytujeme
                  přístup koncovým zákazníkům.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
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
        </div>

        {/* Kontaktní formulář */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold text-wine-burgundy mb-4 flex items-center">
                <MessageSquare size={24} className="mr-2 text-wine-gold" />
                Napište mi přímo
              </h3>
              <p className="text-gray-700 mb-6">
                Máte dotaz ohledně našich produktů nebo služeb? Vyplňte krátký formulář a já se vám co nejdříve ozvu zpět s nabídkou šitou na míru vašim potřebám.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-wine-gold" />
                  <p>Odpovídám do 24 hodin</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-wine-gold" />
                  <p>Nabídka přizpůsobená vašim potřebám</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-wine-gold" />
                  <p>Osobní konzultace možná</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="tel:+420734720994"
                    className="flex items-center justify-center gap-2 bg-wine-burgundy text-white px-6 py-3 rounded-lg font-medium hover:bg-wine-red transition shadow-md"
                  >
                    <Phone size={18} />
                    <span>+420 734 720 994</span>
                  </a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href="mailto:fiala@vinaria.cz"
                    className="flex items-center justify-center gap-2 border-2 border-wine-burgundy text-wine-burgundy px-6 py-3 rounded-lg font-medium hover:bg-wine-burgundy hover:text-white transition"
                  >
                    <Mail size={18} />
                    <span>fiala@vinaria.cz</span>
                  </a>
                </motion.div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                    Jméno a příjmení *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
                      placeholder="Vaše jméno"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                    E-mail *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
                      placeholder="Váš e-mail"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="company" className="block text-gray-700 mb-2 font-medium">
                    Společnost *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
                      placeholder="Název vaší společnosti"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">
                    Zpráva *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare size={18} className="text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-wine-burgundy focus:border-wine-burgundy"
                      placeholder="Vaše zpráva nebo dotaz..."
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full bg-wine-burgundy text-white p-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-wine-red transition shadow-md"
                >
                  <Send size={18} />
                  Odeslat zprávu
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}

// Custom components for icons
function Globe(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

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
