// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconEggDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M12 3c-3 0-6 4-6 9s2.5 9 6 9 6-4 6-9-3-9-6-9z"/>
    </g>
    {/* Foreground */}
    <path d="M12 3c-3 0-6 4-6 9s2.5 9 6 9 6-4 6-9-3-9-6-9z"/>
  </IconBaseDuo>
))
IconEggDuo.displayName = 'IconEggDuo'
