// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCheeseDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M2 18l10-14 10 14H2z"/>
    </g>
    {/* Foreground */}
    <path d="M2 18l10-14 10 14H2z"/><circle cx="9" cy="15" r="1.5"/><circle cx="15" cy="16" r="1"/><circle cx="12" cy="12" r="0.75" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconCheeseDuo.displayName = 'IconCheeseDuo'
