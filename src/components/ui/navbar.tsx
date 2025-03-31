"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

// Definice navigačních položek - snadnější údržba
const NAV_ITEMS = [
  { href: '/obchodni-zastupce', label: 'Zahájit spolupráci' },
  { href: '/katalog', label: 'Katalog vín' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
];

// Extrahovaná komponenta navigačního odkazu pro zamezení duplicity
const NavLink = ({
  href,
  label,
  isMobile = false,
  isActive,
  onClick
}: {
  href: string;
  label: string;
  isMobile?: boolean;
  isActive: boolean;
  onClick?: () => void;
}) => {
  const baseStyles = `font-montserrat text-gray-700 hover:text-wine-burgundy relative group transition duration-200 ${
    isActive ? 'text-wine-burgundy' : ''
  }`;

  const mobileStyles = isMobile
    ? 'block px-3 py-2 text-base font-medium'
    : 'px-3 py-2 text-sm font-medium';

  // Linková část pro desktop a mobil má jiný styl
  const linkIndicator = isMobile ? (
    <span className={`absolute bottom-0 left-0 h-0.5 bg-wine-gold transition-all duration-300 ${
      isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'
    }`}></span>
  ) : (
    <span className={`absolute bottom-0 left-1/2 h-0.5 bg-wine-gold transform -translate-x-1/2 transition-all duration-300 ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`}></span>
  );

  return (
    <Link
      href={href}
      className={`${baseStyles} ${mobileStyles}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {linkIndicator}
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Memorizujeme callback pro lepší výkon
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Handler pro zavření menu při kliknutí na odkaz
  const handleNavClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav
      className="bg-white shadow-md py-4 sticky top-0 z-50"
      data-supportsscrollrestoration="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo a název spojené do jednoho bloku */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative mr-3">
                {/* Logo s jemným stínem pro vylepšení vzhledu */}
                <Image
                  src="/images/logo.png"
                  alt="Vinaria logo"
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain drop-shadow-sm"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                {/* Název společnosti v burgundské barvě */}
                <span className="font-playfair text-2xl font-bold text-wine-burgundy tracking-wide">VINARIA</span>
                {/* Volitelně lze přidat slogan pod názvem */}
                <span className="text-xs text-wine-red/80 font-medium hidden sm:block">Prémiová vína pro náročnou klientelu</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              ))}

              <a
                href="https://www.beginy.cz"
                className="font-montserrat bg-wine-gold text-wine-burgundy hover:bg-wine-gold/90 hover:shadow-md px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                B2B - beginy.cz
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-wine-burgundy focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isMobile={true}
                isActive={pathname === item.href}
                onClick={handleNavClick}
              />
            ))}
            <a
              href="https://www.beginy.cz"
              className="font-montserrat block bg-wine-gold text-wine-burgundy hover:bg-wine-gold/90 hover:shadow-md px-4 py-2 rounded-md text-base font-medium mt-4 mx-3 shadow-sm transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              B2B - beginy.cz
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
