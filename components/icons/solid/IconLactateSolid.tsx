// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLactateSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Carbon backbone — thick lines */}
    <path d="M6 12h4l4-3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Carboxyl group */}
    <path d="M6 12l-2-3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M6 12l-2 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <circle cx="3.5" cy="8.5" r="1.5"/>
    <circle cx="3.5" cy="15.5" r="1.5"/>
    {/* OH group */}
    <rect x="9.2" y="12" width="1.6" height="4" rx=".5"/>
    <circle cx="10" cy="17" r="1.5"/>
    {/* CH3 group */}
    <circle cx="14.5" cy="8.5" r="2.8"/>
  </IconBaseSolid>
))
IconLactateSolid.displayName = 'IconLactateSolid'
