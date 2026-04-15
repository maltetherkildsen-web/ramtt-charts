// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconShieldDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/>
    </g>
    {/* Foreground */}
    <path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/>
  </IconBaseDuo>
))
IconShieldDuo.displayName = 'IconShieldDuo'
