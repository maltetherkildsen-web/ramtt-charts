// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconEnergyChewDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="3" y="5" width="18" height="14" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="3" y="5" width="7" height="6" rx="1.5"/><rect x="14" y="5" width="7" height="6" rx="1.5"/><rect x="3" y="13" width="7" height="6" rx="1.5"/><rect x="14" y="13" width="7" height="6" rx="1.5"/>
  </IconBaseDuo>
))
IconEnergyChewDuo.displayName = 'IconEnergyChewDuo'
