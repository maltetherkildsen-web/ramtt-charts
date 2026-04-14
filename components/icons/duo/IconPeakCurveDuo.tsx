// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPeakCurveDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 20C3 20 4 4 6 4c2 0 3 6 5 9 2 3 4 5 7 5.5 2 .3 3 .5 3 1.5V22H3Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M3 20C3 20 4 4 6 4c2 0 3 6 5 9 2 3 4 5 7 5.5 2 .3 3 .5 3 1.5"/>
  </IconBaseDuo>
))
IconPeakCurveDuo.displayName = 'IconPeakCurveDuo'
