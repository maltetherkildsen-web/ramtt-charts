// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPeakCurveDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 18s1-14 3-14 3 8 5 10 4 3 7 3.5l3 .5v2H3v-2Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M3 18C3 18 4 4 6 4C8 4 9 12 11 14C13 16 15 17 18 17.5C20 17.8 21 18 21 18" />
  </IconBaseDuo>
))
IconPeakCurveDuo.displayName = 'IconPeakCurveDuo'
