// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBeerDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M7 4h10l-1 16H8L7 4z"/>
    </g>
    {/* Foreground */}
    <path d="M7 4h10l-1 16H8L7 4z"/><path d="M7 4c0-1 1.5-2 5-2s5 1 5 2"/><path d="M7 8h10"/><path d="M9.5 8c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5"/>
  </IconBaseDuo>
))
IconBeerDuo.displayName = 'IconBeerDuo'
