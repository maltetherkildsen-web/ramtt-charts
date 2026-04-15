// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTailwindDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="8" cy="5" r="2"/>
    </g>
    {/* Foreground */}
    <circle cx="8" cy="5" r="2"/><path d="M10 8l4 5-4 3v6"/><path d="M14 13l2 3"/><path d="M16 8h6"/><path d="M17 12h5"/><path d="M18 16h4"/>
  </IconBaseDuo>
))
IconTailwindDuo.displayName = 'IconTailwindDuo'
