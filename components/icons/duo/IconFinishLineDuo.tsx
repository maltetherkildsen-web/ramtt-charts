// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconFinishLineDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="5" y="6" width="14" height="5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M5 21V3M19 21V3"/>
    <rect x="5" y="6" width="14" height="5" rx=".5"/>
    <path d="M9.5 6v5M14 6v5"/>
  </IconBaseDuo>
))
IconFinishLineDuo.displayName = 'IconFinishLineDuo'
