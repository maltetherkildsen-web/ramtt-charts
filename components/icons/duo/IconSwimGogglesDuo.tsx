// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSwimGogglesDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="8" cy="12" r="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    <circle cx="16" cy="12" r="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="8" cy="12" r="3"/>
    <circle cx="16" cy="12" r="3"/>
    <path d="M11 12h2"/>
    <path d="M5 12H3M19 12h2"/>
  </IconBaseDuo>
))
IconSwimGogglesDuo.displayName = 'IconSwimGogglesDuo'
