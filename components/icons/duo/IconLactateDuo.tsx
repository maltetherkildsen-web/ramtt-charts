// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLactateDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="14.5" cy="8.5" r="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M6 12h4l4-3"/>
    <path d="M6 12l-2-3"/>
    <path d="M6 12l-2 3"/>
    <circle cx="3.5" cy="8.5" r=".8" fill="currentColor" stroke="none"/>
    <circle cx="3.5" cy="15.5" r=".8" fill="currentColor" stroke="none"/>
    <line x1="10" y1="12" x2="10" y2="16"/>
    <circle cx="10" cy="17" r=".8" fill="currentColor" stroke="none"/>
    <circle cx="14.5" cy="8.5" r="2" fill="currentColor" fillOpacity={0.15}/>
    <text x="14.5" y="9.2" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" fontFamily="sans-serif">CH₃</text>
  </IconBaseDuo>
))
IconLactateDuo.displayName = 'IconLactateDuo'
