// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconStomachDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M16 4C16 4 20 4 20 8C20 12 16 12 16 16C16 20 12 22 8 22C4 22 4 18 4 16C4 14 6 12 8 12" />
    <path d="M16 4C14 4 12 5 12 7" />
    </IconBaseDuo>
))
IconStomachDuo.displayName = 'IconStomachDuo'
