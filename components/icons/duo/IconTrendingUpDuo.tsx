// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTrendingUpDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M2 17l6.5-6.5 5 5L22 7v10H2Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
    <path d="M16 7H22V13" />
  </IconBaseDuo>
))
IconTrendingUpDuo.displayName = 'IconTrendingUpDuo'
