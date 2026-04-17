// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { ComingSoon } from '@/components/ui/ComingSoon'

/**
 * Optional catch-all that absorbs every route on ramtt.dev except `/chart-test`.
 * Next.js route priority: static segments (`/chart-test`) beat catch-all, so the
 * session analysis tool stays live while the rest of the site shows the placeholder.
 */

export default function ComingSoonCatchAll() {
  return <ComingSoon locale="en" />
}

export const dynamic = 'force-static'
