// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMuscleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 16s2-4 4-6 4-4 6-4 3 2 3 4-1 4 1 6 4 2 4 2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M4 16C4 16 6 12 8 10C10 8 12 6 14 6C16 6 17 8 17 10C17 12 16 14 18 16C20 18 22 18 22 18" />
    <path d="M4 16C4 16 3 18 4 19C5 20 7 19 7 19" />
  </IconBaseDuo>
))
IconMuscleDuo.displayName = 'IconMuscleDuo'
