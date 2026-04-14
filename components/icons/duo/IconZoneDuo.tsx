// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconZoneDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 22l8-18h2l8 18H3Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M3 21h18"/>
    <path d="M5 17h14"/>
    <path d="M7 13h10"/>
    <path d="M9 9h6"/>
    <path d="M11 5h2"/>
  </IconBaseDuo>
))
IconZoneDuo.displayName = 'IconZoneDuo'
