// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPullUpBarDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="9" width="20" height="2" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M2 10h20"/>
    <path d="M5 4v6M19 4v6"/>
    <path d="M3 4h4M17 4h4"/>
  </IconBaseDuo>
))
IconPullUpBarDuo.displayName = 'IconPullUpBarDuo'
