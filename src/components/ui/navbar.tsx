"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/katalog"
                className="font-montserrat text-gray-700 hover:text-wine-burgundy px-3 py-2 text-sm font-medium"
              >
                Katalog vín
              </Link>
              <Link
                href="/o-nas"
                className="font-montserrat text-gray-700 hover:text-wine-burgundy px-3 py-2 text-sm font-medium"
              >
                O nás
              </Link>
              <Link
                href="/kontakt"
                className="font-montserrat text-gray-700 hover:text-wine-burgundy px-3 py-2 text-sm font-medium"
              >
                Kontakt
              </Link>
              <a
                href="https://www.beginy.cz"
                className="font-montserrat bg-wine-burgundy text-white hover:bg-wine-red px-4 py-2 rounded-md text-sm font-medium"
              >
                B2B přihlášení
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
              href="/katalog"
              className="font-montserrat block text-gray-700 hover:text-wine-burgundy px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Katalog vín
            </Link>
            <Link
              href="/o-nas"
              className="font-montserrat block text-gray-700 hover:text-wine-burgundy px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              O nás
            </Link>
            <Link
              href="/kontakt"
              className="font-montserrat block text-gray-700 hover:text-wine-burgundy px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Kontakt
            </Link>
            <a
              href="https://www.beginy.cz"
              className="font-montserrat block bg-wine-burgundy text-white hover:bg-wine-red px-4 py-2 rounded-md text-base font-medium mt-4 mx-3"
            >
              B2B přihlášení
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
