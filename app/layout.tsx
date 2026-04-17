import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { DevCacheGuard } from '@/components/dev/DevCacheGuard'
import '@/components/ui/tokens.css'
import './globals.css'

/**
 * Satoshi is the ONLY font loaded for UI.
 * --font-sans, --font-label, and --font-mono all resolve to Satoshi
 * (with tabular-nums for numeric contexts).
 * Cormorant Garamond is loaded separately for editorial/marketing only.
 */

const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RAMTT — Coming soon',
  description: 'Training analytics for endurance athletes.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" className={satoshi.variable}>
      <body className="font-sans antialiased bg-canvas text-text-primary">
        <DevCacheGuard />
        {children}
      </body>
    </html>
  )
}
