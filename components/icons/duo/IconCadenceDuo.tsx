// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCadenceDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="12" cy="12" r="8" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M12 4A8 8 0 1 1 4.5 8.5" />
    {/* Arrow head at the arc start */}
    <path d="M4.5 4V8.5H9" />
  </IconBaseDuo>
))
IconCadenceDuo.displayName = 'IconCadenceDuo'
