// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTempoDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="14" r="8"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="14" r="8"/>
    <path d="M12 6V4"/>
    <path d="M12 14l3-5"/>
  </IconBaseDuo>
))
IconTempoDuo.displayName = 'IconTempoDuo'
