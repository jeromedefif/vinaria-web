"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true, // Nezbytné cookies jsou vždy povoleny
  analytics: false,
  marketing: false,
};

// Přidání openCookieSettings do window objektu
declare global {
  interface Window {
    openCookieSettings?: () => void;
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  // Načtení preferencí při načtení komponenty
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');

    if (!hasConsent) {
      setShowBanner(true);
    } else {
      try {
        const savedPreferences = JSON.parse(hasConsent);
        setPreferences(savedPreferences);
      } catch (e) {
        console.error('Chyba při načítání cookies preferencí:', e);
        setShowBanner(true);
      }
    }

    // Přidání funkce pro otevření nastavení cookies do window objektu
    if (typeof window !== 'undefined') {
      window.openCookieSettings = () => {
        setShowBanner(true);
        setExpanded(true);
      };
    }

    // Cleanup při unmount
    return () => {
      if (typeof window !== 'undefined') {
        delete window.openCookieSettings;
      }
    };
  }, []);

  // Uložení preferencí a skrytí banneru
  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    // Zde by se implementovala reálná logika pro nastavení cookies
  };

  // Přijmout všechny cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
    // Zde by se implementovala reálná logika pro nastavení cookies
  };

  // Přijmout jen nezbytné cookies
  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    setPreferences(necessaryOnly);
    localStorage.setItem('cookieConsent', JSON.stringify(necessaryOnly));
    setShowBanner(false);
    // Zde by se implementovala reálná logika pro nastavení cookies
  };

  // Toggle pro jednotlivé typy cookies
  const togglePreference = (type: keyof CookiePreferences) => {
    if (type === 'necessary') return; // Nezbytné cookies nelze vypnout

    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Otevření nastavení cookies
  const openSettings = () => {
    setShowBanner(true);
    setExpanded(true);
  };

  if (!showBanner) {
    return (
      <button
        onClick={openSettings}
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full shadow-lg opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Nastavení cookies"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
          <path d="M8.5 8.5v.01" />
          <path d="M16 15.5v.01" />
          <path d="M12 12v.01" />
        </svg>
      </button>
    );
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-playfair text-xl font-bold text-wine-burgundy">Soukromí a cookies</h2>
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-500 hover:text-wine-burgundy p-1"
              >
                {expanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
              </button>
            </div>

            <div className="font-montserrat text-gray-700 mb-4">
              <p>
                Tento web používá cookies pro zlepšení vašeho uživatelského zážitku. Nezbytné cookies
                jsou nutné pro správné fungování stránek, zatímco ostatní nám pomáhají stránky
                analyzovat a vylepšovat.
              </p>
              <p className="mt-2">
                <Link href="/gdpr" className="text-wine-burgundy hover:underline">
                  Další informace o zpracování osobních údajů
                </Link>
              </p>
            </div>

            {expanded && (
              <div className="mb-6 space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-playfair font-bold">Nezbytné cookies</h3>
                      <p className="text-sm text-gray-600">Tyto cookies jsou nutné pro správné fungování webu.</p>
                    </div>
                    <div className="w-12 h-6 flex items-center bg-wine-burgundy rounded-full p-1 cursor-not-allowed">
                      <div className="bg-white w-4 h-4 rounded-full transform translate-x-6"></div>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-playfair font-bold">Analytické cookies</h3>
                      <p className="text-sm text-gray-600">Pomáhají nám pochopit, jak návštěvníci používají náš web.</p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${preferences.analytics ? 'bg-wine-burgundy' : 'bg-gray-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-playfair font-bold">Marketingové cookies</h3>
                      <p className="text-sm text-gray-600">Používají se k personalizaci obsahu a reklam.</p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${preferences.marketing ? 'bg-wine-burgundy' : 'bg-gray-300'}`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-montserrat font-medium"
              >
                Jen nezbytné
              </button>

              {expanded && (
                <button
                  onClick={savePreferences}
                  className="px-4 py-2 border border-wine-burgundy rounded-md text-wine-burgundy hover:bg-wine-cream font-montserrat font-medium"
                >
                  Uložit nastavení
                </button>
              )}

              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-wine-burgundy text-white rounded-md hover:bg-wine-red font-montserrat font-medium"
              >
                Přijmout vše
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
