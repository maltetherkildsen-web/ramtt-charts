// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconOmega3Duo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <ellipse cx="12" cy="14" rx="7" ry="4.5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <ellipse cx="12" cy="14" rx="7" ry="4.5"/>
    <path d="M12 9.5v9"/>
    <path d="M12 2l2 3a2.2 2.2 0 0 1-4 0Z"/>
  </IconBaseDuo>
))
IconOmega3Duo.displayName = 'IconOmega3Duo'
