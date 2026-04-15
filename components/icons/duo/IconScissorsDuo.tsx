// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconScissorsDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    </g>
    {/* Foreground */}
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.5 8l12 8"/><path d="M8.5 16l12-8"/>
  </IconBaseDuo>
))
IconScissorsDuo.displayName = 'IconScissorsDuo'
