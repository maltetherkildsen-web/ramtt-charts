// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMentalToughnessDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M12 2c-3 0-5 2-6 4s-1 4 0 6c1 2 2 3 6 2s5 0 6-2c1-2 1-4 0-6S15 2 12 2z"/>
    </g>
    {/* Foreground */}
    <path d="M12 2c-3 0-5 2-6 4s-1 4 0 6"/><path d="M12 2c3 0 5 2 6 4s1 4 0 6"/><path d="M12 14l-4 2v3c0 2 1.5 3.5 4 4 2.5-.5 4-2 4-4v-3l-4-2z"/>
  </IconBaseDuo>
))
IconMentalToughnessDuo.displayName = 'IconMentalToughnessDuo'
