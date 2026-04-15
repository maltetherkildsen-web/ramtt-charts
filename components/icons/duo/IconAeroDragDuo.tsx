// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconAeroDragDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M8 12c0-4 4-8 8-8 0 4-2 8-8 8zm0 0c0 4 4 8 8 8 0-4-2-8-8-8z"/>
    </g>
    {/* Foreground */}
    <path d="M8 12c0-4 4-8 8-8 0 4-2 8-8 8z"/><path d="M8 12c0 4 4 8 8 8 0-4-2-8-8-8z"/><path d="M2 9h4"/><path d="M2 12h5"/><path d="M2 15h4"/>
  </IconBaseDuo>
))
IconAeroDragDuo.displayName = 'IconAeroDragDuo'
