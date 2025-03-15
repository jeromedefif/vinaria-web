"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="bg-white shadow-md py-4 sticky top-0 z-50"
      data-supportsscrollrestoration="true"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="Vinaria logo"
                width={120}
                height={40}
                className="mr-2"
                priority // Přidáno pro zlepšení LCP
              />
              <span className="font-playfair text-xl font-bold text-wine-burgundy">VINARIA</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/obchodni-zastupce"
                className={`font-montserrat text-gray-700 hover:text-wine-burgundy px-3 py-2 text-sm font-medium relative group transition duration-200 ${
                  pathname === '/obchodni-zastupce' ? 'text-wine-burgundy' : ''
                }`}
              >
                <span>Rychlý kontakt</span>
                <span className={`absolute bottom-0 left-1/2 h-0.5 bg-wine-gold transform -translate-x-1/2 transition-all duration-300 ${
                  pathname === '/obchodni-zastupce' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link
                href="/katalog"
                className={`font-montserrat text-gray-700 hover:text-wine-burgundy px-3 py-2 text-sm font-medium relative group transition duration-200 ${
                  pathname === '/katalog' ? 'text-wine-burgundy' : ''
                }`}
              >
                <span>Katalog vín</span>
                <span className={`absolute bottom-0 left-1/2 h-0.5 bg-wine-gold transform -translate-x-1/2 transition-all duration-300 ${
                  pathname === '/katalog' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link
                href="/o-nas"
                className={`font-montserrat text-gray-700 hover:text-wine-burgundy px-3 py-2 text-sm font-medium relative group transition duration-200 ${
                  pathname === '/o-nas' ? 'text-wine-burgundy' : ''
                }`}
              >
                <span>O nás</span>
                <span className={`absolute bottom-0 left-1/2 h-0.5 bg-wine-gold transform -translate-x-1/2 transition-all duration-300 ${
                  pathname === '/o-nas' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              <Link
                href="/kontakt"
                className={`font-montserrat text-gray-700 hover:text-wine-burgundy px-3 py-2 text-sm font-medium relative group transition duration-200 ${
                  pathname === '/kontakt' ? 'text-wine-burgundy' : ''
                }`}
              >
                <span>Kontakt</span>
                <span className={`absolute bottom-0 left-1/2 h-0.5 bg-wine-gold transform -translate-x-1/2 transition-all duration-300 ${
                  pathname === '/kontakt' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
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
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-wine-burgundy focus:outline-none"
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
            <Link
              href="/obchodni-zastupce"
              className={`font-montserrat block text-gray-700 hover:text-wine-burgundy px-3 py-2 text-base font-medium relative group transition duration-200 ${
                pathname === '/obchodni-zastupce' ? 'text-wine-burgundy' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Rychlý kontakt</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-wine-gold transition-all duration-300 ${
                pathname === '/obchodni-zastupce' ? 'w-1/2' : 'w-0 group-hover:w-1/2'
              }`}></span>
            </Link>
            <Link
              href="/katalog"
              className={`font-montserrat block text-gray-700 hover:text-wine-burgundy px-3 py-2 text-base font-medium relative group transition duration-200 ${
                pathname === '/katalog' ? 'text-wine-burgundy' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Katalog vín</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-wine-gold transition-all duration-300 ${
                pathname === '/katalog' ? 'w-1/2' : 'w-0 group-hover:w-1/2'
              }`}></span>
            </Link>
            <Link
              href="/o-nas"
              className={`font-montserrat block text-gray-700 hover:text-wine-burgundy px-3 py-2 text-base font-medium relative group transition duration-200 ${
                pathname === '/o-nas' ? 'text-wine-burgundy' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>O nás</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-wine-gold transition-all duration-300 ${
                pathname === '/o-nas' ? 'w-1/2' : 'w-0 group-hover:w-1/2'
              }`}></span>
            </Link>
            <Link
              href="/kontakt"
              className={`font-montserrat block text-gray-700 hover:text-wine-burgundy px-3 py-2 text-base font-medium relative group transition duration-200 ${
                pathname === '/kontakt' ? 'text-wine-burgundy' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>Kontakt</span>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-wine-gold transition-all duration-300 ${
                pathname === '/kontakt' ? 'w-1/2' : 'w-0 group-hover:w-1/2'
              }`}></span>
            </Link>
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
