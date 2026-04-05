/**
 * Force Next.js to set Cache-Control: no-store on this route.
 * This prevents the browser from serving stale versions on navigation.
 */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function ChartTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
