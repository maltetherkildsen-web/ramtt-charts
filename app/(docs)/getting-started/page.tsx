// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { cn, FONT, BORDER, RADIUS } from '@/lib/ui'
import { DocSection } from '@/components/docs/DocSection'
import { DocCode } from '@/components/docs/DocCode'
import { UI_COMPONENTS, CHART_TYPES } from '@/lib/docs/navigation'

export default function GettingStartedPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Getting started
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-2')}>
          Set up RAMTT in your project. The system is designed for Next.js + Tailwind CSS v4.
        </p>
      </div>

      <DocSection title="Installation" description="Copy the component files into your project. No npm package yet.">
        <DocCode>{`# Clone the design system
git clone <repo-url>

# Copy into your project
cp -r components/ui/ your-project/components/ui/
cp -r components/icons/ your-project/components/icons/
cp -r components/charts/ your-project/components/charts/
cp lib/ui.ts your-project/lib/ui.ts
cp components/ui/tokens.css your-project/components/ui/tokens.css`}</DocCode>
      </DocSection>

      <DocSection title="Setup tokens" description="Import tokens.css in your root layout, before globals.css.">
        <DocCode>{`// app/layout.tsx
import '@/components/ui/tokens.css'
import './globals.css'`}</DocCode>
      </DocSection>

      <DocSection title="Setup font" description="Satoshi is the only font. Load it as a variable font.">
        <DocCode>{`// app/layout.tsx
import localFont from 'next/font/local'

const satoshi = localFont({
  src: '../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
})

// In <html>:
<html className={satoshi.variable}>
  <body className="font-sans antialiased bg-canvas text-text-primary">
    {children}
  </body>
</html>`}</DocCode>
      </DocSection>

      <DocSection title="Tailwind CSS v4" description="Use @theme tokens in globals.css. No tailwind.config.js.">
        <DocCode>{`// app/globals.css
@import "tailwindcss";

@theme {
  --font-sans: "Satoshi", system-ui, sans-serif;
  --font-label: "Satoshi", system-ui, sans-serif;
  /* ... see globals.css for full @theme tokens */
}`}</DocCode>
      </DocSection>

      <DocSection title="Import components" description="All components export from a single barrel file.">
        <DocCode>{`import { Button, Badge, Card, Input } from '@/components/ui'
import { cn, WEIGHT, BORDER, RADIUS } from '@/lib/ui'

// UI constants are in lib/ui.ts — use them instead of hardcoded values
import { FONT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE } from '@/lib/ui'`}</DocCode>
      </DocSection>

      <DocSection title="Principles">
        <div className="space-y-4">
          {[
            {
              title: 'Monochrome UI',
              desc: 'Color is reserved for data (charts, zones, status). UI chrome uses the warm neutral scale exclusively. No colored buttons, no accent-tinted headers.',
            },
            {
              title: 'Single font, weight hierarchy',
              desc: 'Satoshi for everything — body, labels, numbers. Weight communicates importance: 400 (body), 450 (metadata), 500 (badges), 550 (headings). Never bold, never italic.',
            },
            {
              title: '0.5px hairline borders',
              desc: 'Every border is 0.5px solid var(--n400). No 1px, no 2px (except underline tabs). No decorative shadows — RAMTT is flat.',
            },
            {
              title: 'cursor: default everywhere',
              desc: 'Buttons, links, and interactive elements all use default cursor. Only text inputs get cursor: text.',
            },
            {
              title: 'lib/ui.ts is the source of truth',
              desc: 'Never hardcode font weights, border widths, border radii, or transition values. Import constants from lib/ui.ts. This ensures consistency across all 83 components.',
            },
          ].map((p) => (
            <div key={p.title} className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-4')}>
              <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>
                {p.title}
              </div>
              <div className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n800)] mt-1')}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Inventory">
        <div className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n800)] space-y-1 tabular-nums')}>
          <p>{UI_COMPONENTS.length} UI components (components/ui/)</p>
          <p>{CHART_TYPES.length} chart primitives (components/charts/primitives/)</p>
          <p>126 icons × 3 variants + 8 animated + 12 context + 11 morph + 30 reactive</p>
          <p>8 neutral tokens + 4 semantic colors + 4 border radii + 7 spacing stops</p>
        </div>
      </DocSection>
    </div>
  )
}
