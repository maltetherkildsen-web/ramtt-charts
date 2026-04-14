// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconStressDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="12" cy="12" r="8" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="12" cy="12" r="4"/>
    <path d="M10 2l2 3 2-3"/>
    <path d="M10 22l2-3 2 3"/>
    <path d="M2 14l3-2-3-2"/>
    <path d="M22 14l-3-2 3-2"/>
  </IconBaseDuo>
))
IconStressDuo.displayName = 'IconStressDuo'
