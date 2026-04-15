// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPortaPottyDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="6" y="6" width="12" height="14" rx="1"/>
    </g>
    {/* Foreground */}
    <rect x="6" y="6" width="12" height="14" rx="1"/><path d="M6 4h12"/><path d="M10 6v14"/><path d="M12 10v4"/><path d="M11 12h2"/><circle cx="18" cy="5" r="3"/><path d="M18 3.5v1.5l1 1"/>
  </IconBaseDuo>
))
IconPortaPottyDuo.displayName = 'IconPortaPottyDuo'
