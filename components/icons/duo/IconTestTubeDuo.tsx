// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTestTubeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M9 3v15a3 3 0 0 0 6 0V3H9Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M9 3v15a3 3 0 0 0 6 0V3"/>
    <path d="M8 3h8"/>
    <path d="M9 13a3 3 0 0 0 6 0"/>
  </IconBaseDuo>
))
IconTestTubeDuo.displayName = 'IconTestTubeDuo'
