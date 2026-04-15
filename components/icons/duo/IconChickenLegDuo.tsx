// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconChickenLegDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M14 3c-3 0-5 2-5 5 0 1.5.5 2.5 1 3.5L6 16c-1.5 1.5-1 3.5.5 5s3.5 2 5 .5l4.5-4c1-.5 2-1 3.5-1 3 0 5-2 5-5s-2.5-5-5-5c-1.5 0-2.5.5-3.5 1-1-.5-2-1.5-2-3.5z"/>
    </g>
    {/* Foreground */}
    <path d="M14 3c-3 0-5 2-5 5 0 1.5.5 2.5 1 3.5L6 16c-1.5 1.5-1 3.5.5 5s3.5 2 5 .5l4.5-4c1-.5 2-1 3.5-1 3 0 5-2 5-5s-2.5-5-5-5c-1.5 0-2.5.5-3.5 1-1-.5-2-1.5-2-3.5z"/><path d="M9 17l-1.5 1.5"/>
  </IconBaseDuo>
))
IconChickenLegDuo.displayName = 'IconChickenLegDuo'
