// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconZapDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M13 2L4.5 13H12l-1 9L20 10h-8l1-8z"/>
    </g>
    {/* Foreground */}
    <path d="M13 2L4.5 13H12l-1 9L20 10h-8l1-8z"/>
  </IconBaseDuo>
))
IconZapDuo.displayName = 'IconZapDuo'
