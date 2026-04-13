// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMuscleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M4 16C4 16 6 12 8 10C10 8 12 6 14 6C16 6 17 8 17 10C17 12 16 14 18 16C20 18 22 18 22 18" />
    <path d="M4 16C4 16 3 18 4 19C5 20 7 19 7 19" />
    </IconBaseDuo>
))
IconMuscleDuo.displayName = 'IconMuscleDuo'
