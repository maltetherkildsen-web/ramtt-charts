// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconOrangeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="12" r="8"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M5.75 7.75l12.5 8.5"/><path d="M5.75 16.25l12.5-8.5"/><circle cx="12" cy="12" r="2"/>
  </IconBaseDuo>
))
IconOrangeDuo.displayName = 'IconOrangeDuo'
