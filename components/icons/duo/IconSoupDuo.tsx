// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSoupDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4z"/>
    </g>
    {/* Foreground */}
    <path d="M4 12c0 5 3.5 8 8 8s8-3 8-8H4z"/><path d="M2 12h20"/><path d="M8 8c0-1 .5-2 1.5-2" opacity="0.4"/><path d="M12 7c0-1.5.5-2 1.5-3" opacity="0.4"/><path d="M16 8c0-1 .5-2 1.5-2" opacity="0.4"/>
  </IconBaseDuo>
))
IconSoupDuo.displayName = 'IconSoupDuo'
