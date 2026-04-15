// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconKeyDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="8" cy="8" r="3.5"/>
    </g>
    {/* Foreground */}
    <circle cx="8" cy="8" r="3.5"/><path d="M11 11l9.5 9.5"/><path d="M16.5 15v3.5"/><path d="M14 17.5h3"/>
  </IconBaseDuo>
))
IconKeyDuo.displayName = 'IconKeyDuo'
