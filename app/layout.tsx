import type { Metadata } from 'next'
import { Instrument_Sans, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import { DevCacheGuard } from '@/components/dev/DevCacheGuard'
import '@/components/ui/tokens.css'
import './globals.css'

/**
 * Fonts loaded via next/font — each sets a CSS variable on <html>.
 *
 * IMPORTANT: next/font generates unique font-family names internally.
 * The CSS variable (e.g. --font-space) is set to that generated name,
 * which OVERRIDES the static string in @theme at higher specificity.
 * That's how font-space utility resolves to the actual loaded woff2.
 */

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RAMTT Charts — Dev',
  description: 'Custom SVG chart system prototype',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-canvas text-text-primary">
        <DevCacheGuard />
        {children}
      </body>
    </html>
  )
}
