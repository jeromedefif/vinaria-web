import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CookieConsent from '@/components/ui/cookie-consent'
import ScrollToTopOnNavigation from '@/components/ui/scroll-to-top-on-navigation'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Vinaria - Prémiová vína pro náročnou klientelu',
  description: 'Vinaria - špičková vína pro restaurace, hotely a vinotéky',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={`${inter.variable}`}>
      <body className={inter.className}>
        <ScrollToTopOnNavigation />
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
