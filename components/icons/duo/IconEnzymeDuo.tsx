// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconEnzymeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 8c0-2 2-4 5-4h2c3 0 5 1 6 3s1 4 0 6l-2 3c-1 1-3 2-5 2H8c-2 0-3.5-1-4-3s-.5-4 0-7Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 8c0-2 2-4 5-4h2c3 0 5 1 6 3s1 4 0 6l-2 3c-1 1-3 2-5 2H8c-2 0-3.5-1-4-3s-.5-4 0-7Z"/>
    <path d="M17 10c-1.5 0-2.5 1-2.5 2.5S15.5 15 17 15"/>
    <rect x="18" y="10.5" width="3" height="4" rx="1" fill="currentColor" fillOpacity={0.15}/>
  </IconBaseDuo>
))
IconEnzymeDuo.displayName = 'IconEnzymeDuo'
