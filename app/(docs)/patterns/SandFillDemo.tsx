// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useState } from 'react'
import { ToggleGroup } from '@/components/ui/ToggleGroup'

export function SandFillDemo() {
  const [value, setValue] = useState('7d')

  return (
    <ToggleGroup
      options={['7d', '30d', '90d']}
      value={value}
      onChange={(v) => setValue(v as string)}
      size="sm"
    />
  )
}
