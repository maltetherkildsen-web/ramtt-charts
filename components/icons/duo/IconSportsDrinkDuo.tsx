// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSportsDrinkDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M9 5h6v2l1 1v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V8l1-1V5z"/>
    </g>
    {/* Foreground */}
    <path d="M9 5h6v2l1 1v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V8l1-1V5z"/><path d="M11 2h2v3h-2z"/><path d="M9 12h6"/><circle cx="12" cy="16" r="1.5"/>
  </IconBaseDuo>
))
IconSportsDrinkDuo.displayName = 'IconSportsDrinkDuo'
