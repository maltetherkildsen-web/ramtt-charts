// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconHeadwindDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="16" cy="5" r="2"/>
    </g>
    {/* Foreground */}
    <circle cx="16" cy="5" r="2"/><path d="M14 8l-4 5 4 3v6"/><path d="M10 13l-2 3"/><path d="M2 8h6"/><path d="M2 12h5"/><path d="M2 16h4"/>
  </IconBaseDuo>
))
IconHeadwindDuo.displayName = 'IconHeadwindDuo'
