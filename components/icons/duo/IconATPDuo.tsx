// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconATPDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M6 9l2.5-4h5L16 9l-2.5 4h-5Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M6 9l2.5-4h5L16 9l-2.5 4h-5Z"/>
    <line x1="16" y1="9" x2="18" y2="9"/>
    <circle cx="19" cy="9" r="1.2"/>
    <line x1="16" y1="13" x2="18" y2="15"/>
    <circle cx="19" cy="16" r="1.2"/>
    <path d="M9 15l1.5-2h2L11 17"/>
  </IconBaseDuo>
))
IconATPDuo.displayName = 'IconATPDuo'
