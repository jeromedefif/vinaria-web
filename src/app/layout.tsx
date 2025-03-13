import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
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
    <html lang="cs" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
