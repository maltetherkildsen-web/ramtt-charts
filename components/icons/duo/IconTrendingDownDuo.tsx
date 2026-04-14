// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTrendingDownDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M2 7l6.5 6.5 5-5L22 17V7H2Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M22 17L13.5 8.5L8.5 13.5L2 7" />
    <path d="M16 17H22V11" />
  </IconBaseDuo>
))
IconTrendingDownDuo.displayName = 'IconTrendingDownDuo'
