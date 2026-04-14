'use client'

import { useState } from 'react'
import { cn, FONT, WEIGHT, BORDER, RADIUS, HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING, TRANSITION } from '@/lib/ui'
import { Button, Badge, ToggleGroup, Card } from '@/components/ui'
import { DocPreview } from '@/components/docs/DocPreview'
import { DocSection } from '@/components/docs/DocSection'
import { DocCode } from '@/components/docs/DocCode'

export default function PatternsPage() {
  const [toggleVal, setToggleVal] = useState('7d')

  return (
    <div className="space-y-10">
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Patterns
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-2')}>
          Interaction states, composition patterns, and accessibility guidelines.
          Every interactive element follows one of these five patterns.
        </p>
      </div>

      {/* ─── 5 interaction states ─── */}
      <DocSection title="Interaction states" description="Five patterns. Every interactive element uses one. No exceptions.">
        <div className="space-y-4">
          {/* Sand fill */}
          <div className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-5')}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)] mb-2')}>
              1. Sand fill
            </div>
            <p className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mb-3')}>
              Selected toggles, filters. Background: var(--n400).
            </p>
            <ToggleGroup
              options={['7d', '30d', '90d']}
              value={toggleVal}
              onChange={(v) => setToggleVal(v as string)}
              size="sm"
            />
            <DocCode>{`import { ACTIVE_SAND } from '@/lib/ui'
// bg-[var(--n400)]`}</DocCode>
          </div>

          {/* Underline */}
          <div className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-5')}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)] mb-2')}>
              2. Underline
            </div>
            <p className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mb-3')}>
              Tab navigation. 2px bottom border in --n1150.
            </p>
            <ToggleGroup
              variant="underline"
              options={['Overview', 'Details', 'Settings']}
              value="Overview"
              onChange={() => {}}
            />
            <DocCode>{`import { ACTIVE_UNDERLINE } from '@/lib/ui'
// border-b-2 border-[var(--n1150)]`}</DocCode>
          </div>

          {/* White lift */}
          <div className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-5')}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)] mb-2')}>
              3. White lift
            </div>
            <p className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mb-3')}>
              Card hover. Background shifts from var(--n50) to white.
            </p>
            <div className="bg-[var(--n200)] p-4 rounded-[8px]">
              <Card className="transition-[background-color] duration-150 hover:bg-white">
                <Card.Title>Hover this card</Card.Title>
              </Card>
            </div>
            <DocCode>{`import { WHITE_LIFT } from '@/lib/ui'
// hover:bg-white`}</DocCode>
          </div>

          {/* Black fill */}
          <div className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-5')}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)] mb-2')}>
              4. Black fill
            </div>
            <p className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mb-3')}>
              Primary CTA only. Never for navigation or toggles.
            </p>
            <Button variant="primary">Primary action</Button>
            <DocCode>{`import { ACTIVE_BLACK } from '@/lib/ui'
// bg-[var(--n1150)] text-[var(--n50)]`}</DocCode>
          </div>

          {/* Sand hover */}
          <div className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-5')}>
            <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)] mb-2')}>
              5. Sand hover
            </div>
            <p className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mb-3')}>
              Rows, ghost buttons. Hover background: var(--n200).
            </p>
            <div className="flex gap-2">
              <Button variant="ghost">Ghost button</Button>
              <Button variant="outline">Outline button</Button>
            </div>
            <DocCode>{`import { HOVER_SAND } from '@/lib/ui'
// hover:bg-[var(--n200)]`}</DocCode>
          </div>
        </div>
      </DocSection>

      {/* ─── Focus ring ─── */}
      <DocSection title="Focus ring" description="Box-shadow technique (Figma's approach). 2px ring in --n1050 on :focus-visible only.">
        <DocPreview>
          <Button variant="outline">Tab to focus me</Button>
        </DocPreview>
        <DocCode>{`import { FOCUS_RING } from '@/lib/ui'
// focus-visible:shadow-[0_0_0_2px_var(--n1050)] focus-visible:outline-none

// For compound inputs (container gets ring when child is focused):
import { FOCUS_WITHIN_RING } from '@/lib/ui'`}</DocCode>
      </DocSection>

      {/* ─── Cursor ─── */}
      <DocSection title="Cursor" description="cursor: default everywhere. Follows the Figma/Linear pattern.">
        <div className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n800)] space-y-1')}>
          <p><code className="bg-[var(--n200)] px-1 py-0.5 rounded-[4px] text-[12px]">cursor: default</code> — everywhere, including buttons and links</p>
          <p><code className="bg-[var(--n200)] px-1 py-0.5 rounded-[4px] text-[12px]">cursor: text</code> — text inputs only</p>
          <p><code className="bg-[var(--n200)] px-1 py-0.5 rounded-[4px] text-[12px]">cursor: grab/grabbing</code> — drag handles only</p>
          <p className="font-[550] text-[var(--n1150)] mt-3">Never cursor: pointer.</p>
        </div>
      </DocSection>

      {/* ─── Transitions ─── */}
      <DocSection title="Transitions" description="transition-all is banned. Always specify exact properties.">
        <DocCode>{`import { TRANSITION } from '@/lib/ui'

TRANSITION.colors      // transition-colors duration-150
TRANSITION.background  // transition-[background-color] duration-150
TRANSITION.opacity     // transition-opacity duration-150
TRANSITION.transform   // transition-transform duration-150`}</DocCode>
      </DocSection>

      {/* ─── Text selection ─── */}
      <DocSection title="Text selection" description="Warm selection color using --n1050. Set globally in tokens.css.">
        <DocPreview>
          <p className={cn(FONT.body, 'text-[14px] text-[var(--n1150)]')}>
            Select this text to see the warm selection color.
          </p>
        </DocPreview>
        <DocCode>{`::selection {
  background-color: var(--n1050);
  color: var(--n50);
}`}</DocCode>
      </DocSection>

      {/* ─── No box-shadow ─── */}
      <DocSection title="No decorative shadows" description="RAMTT is flat. Box-shadow is only used for focus rings and validation rings.">
        <div className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n800)] space-y-1')}>
          <p>Cards separate by border only (0.5px --n400).</p>
          <p>Modals use ::backdrop with blur, not shadow.</p>
          <p>Dropdowns and toasts rely on border/color contrast.</p>
        </div>
      </DocSection>
    </div>
  )
}
