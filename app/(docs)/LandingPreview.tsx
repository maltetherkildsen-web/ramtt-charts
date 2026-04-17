// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useState } from 'react'
import { cn } from '@/lib/ui'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { ProgressBar } from '@/components/ui/ProgressBar'

export function LandingPreview() {
  const [toggleVal, setToggleVal] = useState('7d')

  return (
    <div className={cn(
      'bg-[var(--n50)]',
      'border-[0.5px] border-[var(--n400)]',
      'rounded-[12px]',
      'p-6',
    )}>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Badge color="positive">Active</Badge>
        <Badge color="default">Default</Badge>
        <Badge color="warning">Warning</Badge>
      </div>

      <div className="mt-5 flex flex-wrap items-start gap-4">
        <ToggleGroup
          options={['7d', '30d', '90d']}
          value={toggleVal}
          onChange={(v) => setToggleVal(v as string)}
          size="sm"
        />
        <div className="w-[200px]">
          <ProgressBar value={73} max={100} />
        </div>
      </div>
    </div>
  )
}
