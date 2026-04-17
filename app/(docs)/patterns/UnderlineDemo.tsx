// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useState } from 'react'
import { ToggleGroup } from '@/components/ui/ToggleGroup'

export function UnderlineDemo() {
  const [value, setValue] = useState('Overview')

  return (
    <ToggleGroup
      variant="underline"
      options={['Overview', 'Details', 'Settings']}
      value={value}
      onChange={(v) => setValue(v as string)}
    />
  )
}
