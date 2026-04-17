/**
 * Force Next.js to set Cache-Control: no-store on this route.
 * This prevents the browser from serving stale versions on navigation.
 *
 * The explicit metadata override here keeps chart-test titled as itself while
 * the rest of ramtt.dev is in Coming-Soon mode. noindex is preserved — this
 * is an internal tool, not a public page.
 */
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RAMTT Chart Test — Session analysis',
  description: 'FIT file session analysis with synced charts, peak powers and best splits.',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function ChartTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
