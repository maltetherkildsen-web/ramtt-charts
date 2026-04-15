// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCreatineDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="6" y="9" width="12" height="12" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="6" y="9" width="12" height="12" rx="2"/>
    <path d="M7 6h10v3H7V6Z"/>
    <path d="M9 14h6"/>
    <circle cx="12" cy="3.5" r=".75" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconCreatineDuo.displayName = 'IconCreatineDuo'
