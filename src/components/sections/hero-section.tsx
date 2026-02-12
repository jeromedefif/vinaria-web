"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/page_image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Tmavší překrytí pro lepší čitelnost textu */}
      <div className="absolute inset-0 z-0 bg-black/60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left text-white"
        >
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Velkoobchod <br />
            <span className="text-wine-gold">vínem a nápoji</span>
          </h1>

          <p className="font-montserrat text-lg md:text-xl mb-8 max-w-2xl text-wine-cream">
            Navazujeme na 400letou tradici výroby vína v Brně. Od roku 2003 spolehlivě zásobujeme
            vinotéky, restaurace a distribuční sítě kvalitními víny a nápoji po celé ČR.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
href="/obchodni-zastupce"
className="font-montserrat bg-wine-gold text-wine-burgundy px-8 py-3 rounded text-lg font-medium transition hover:bg-wine-gold/90"
>
Zahájit spolupráci
</Link>
            <a
              href="https://www.beginy.cz/login"
              className="font-montserrat border-2 border-white text-white px-8 py-3 rounded text-lg font-medium transition hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              B2B přihlášení
            </a>
            <Link
              href="/obchodni-zastupce?offer=1"
              className="font-montserrat border-2 border-wine-gold text-wine-gold px-8 py-3 rounded text-lg font-medium transition hover:bg-wine-gold/10"
            >
              Chci nabídku
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Animovaná šipka pro srolování dolů */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        onClick={() => window.scrollTo({
          top: window.innerHeight * 0.8, // Scrolluje o 80% výšky viewportu
          behavior: 'smooth'
        })}
      >
        <ChevronDown className="text-white w-12 h-12 filter drop-shadow-lg" />
      </motion.div>
    </section>
  );
}
