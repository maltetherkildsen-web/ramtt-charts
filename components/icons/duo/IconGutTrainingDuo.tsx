// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGutTrainingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M8 6c-2 0-3 2-3 4s1 3 2 4 2 3 2 5h6c0-2 1-3 2-5s2-2 2-4-1-4-3-4H8z"/>
    </g>
    {/* Foreground */}
    <path d="M8 6c-2 0-3 2-3 4s1 3 2 4 2 3 2 5"/><path d="M16 6c2 0 3 2 3 4s-1 3-2 4-2 3-2 5"/><path d="M8 6h8"/><path d="M9 19h6"/><path d="M12 14v-4"/><path d="M10 12l2-2 2 2"/>
  </IconBaseDuo>
))
IconGutTrainingDuo.displayName = 'IconGutTrainingDuo'
