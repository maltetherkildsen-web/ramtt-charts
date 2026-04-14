// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconAnalyticsDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 18l4-4 3 3 4-7 5-4v12H4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M4 18L8 14L11 17L15 10L20 6" />
    <circle cx="20" cy="6" r="1.5" fill="currentColor" stroke="none" />
  </IconBaseDuo>
))
IconAnalyticsDuo.displayName = 'IconAnalyticsDuo'
