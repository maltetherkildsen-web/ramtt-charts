// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSaltTabDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="7" y="3" width="10" height="18" rx="5"/>
    </g>
    {/* Foreground */}
    <rect x="7" y="3" width="10" height="18" rx="5"/><path d="M7 12h10"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" opacity="0.4"/><circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" opacity="0.4"/>
  </IconBaseDuo>
))
IconSaltTabDuo.displayName = 'IconSaltTabDuo'
