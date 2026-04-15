// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCoffeeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 6h12v7a4 4 0 01-4 4H8a4 4 0 01-4-4V6z"/>
    </g>
    {/* Foreground */}
    <path d="M4 6h12v7a4 4 0 01-4 4H8a4 4 0 01-4-4V6z"/><path d="M16 9h2a2 2 0 010 4h-2"/><path d="M6 1v2"/><path d="M10 1v2"/><path d="M14 1v2"/><path d="M2 20h16"/>
  </IconBaseDuo>
))
IconCoffeeDuo.displayName = 'IconCoffeeDuo'
