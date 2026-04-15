// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSuperCompensationDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="7" width="22" height="12" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M2 14h3c1 0 1.5 1 2 3s1.5 3 2 3h1c1 0 1.5-2 2-5s1.5-5 2.5-5 1.5 1 2 2.5 1.5 3 3 3H22"/><path d="M2 12h20" strokeDasharray="2 2" opacity="0.4"/>
  </IconBaseDuo>
))
IconSuperCompensationDuo.displayName = 'IconSuperCompensationDuo'
