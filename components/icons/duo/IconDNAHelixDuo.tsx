// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDNAHelixDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="7" y="2" width="10" height="20" rx="5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M8 2c0 4 8 6 8 10s-8 6-8 10"/>
    <path d="M16 2c0 4-8 6-8 10s8 6 8 10"/>
    <line x1="9" y1="5" x2="15" y2="5"/>
    <line x1="8" y1="12" x2="16" y2="12"/>
    <line x1="9" y1="19" x2="15" y2="19"/>
  </IconBaseDuo>
))
IconDNAHelixDuo.displayName = 'IconDNAHelixDuo'
