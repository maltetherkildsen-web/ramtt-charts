// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBroccoliDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="8" cy="9" r="3"/><circle cx="12" cy="7" r="3.5"/><circle cx="16" cy="9" r="3"/>
    </g>
    {/* Foreground */}
    <path d="M12 22v-8"/><path d="M10 14l-2-2"/><path d="M14 14l2-2"/><circle cx="8" cy="9" r="3"/><circle cx="12" cy="7" r="3.5"/><circle cx="16" cy="9" r="3"/>
  </IconBaseDuo>
))
IconBroccoliDuo.displayName = 'IconBroccoliDuo'
