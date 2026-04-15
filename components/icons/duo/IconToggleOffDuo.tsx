// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconToggleOffDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="6" width="22" height="12" rx="6"/>
    </g>
    {/* Foreground */}
    <rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="7" cy="12" r="3"/>
  </IconBaseDuo>
))
IconToggleOffDuo.displayName = 'IconToggleOffDuo'
