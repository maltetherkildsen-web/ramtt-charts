// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTofuDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="4" y="6" width="16" height="12" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 12h16"/><path d="M12 6v12"/><circle cx="8" cy="9" r="0.5" fill="currentColor" stroke="none" opacity="0.4"/><circle cx="16" cy="15" r="0.5" fill="currentColor" stroke="none" opacity="0.4"/>
  </IconBaseDuo>
))
IconTofuDuo.displayName = 'IconTofuDuo'
