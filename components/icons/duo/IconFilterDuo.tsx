// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconFilterDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 6h16v2H7l3 5v6l-2-1v-5L4 6Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M4 7H20" />
    <path d="M7 12H17" />
    <path d="M10 17H14" />
  </IconBaseDuo>
))
IconFilterDuo.displayName = 'IconFilterDuo'
