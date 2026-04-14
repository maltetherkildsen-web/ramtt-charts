// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSortAscDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="4" width="12" height="16" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 18h4"/>
    <path d="M4 14h6"/>
    <path d="M4 10h8"/>
    <path d="M4 6h10"/>
    <path d="M18 20V4"/>
    <path d="M15 7l3-3 3 3"/>
  </IconBaseDuo>
))
IconSortAscDuo.displayName = 'IconSortAscDuo'
