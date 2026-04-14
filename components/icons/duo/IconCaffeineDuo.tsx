// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCaffeineDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 8h12v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 8h12v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/>
    <path d="M16 11a3 3 0 0 1 0 5"/>
    <path d="M8 5c0-1.5.5-2.5 1-3"/>
    <path d="M11 5c0-1.5.5-2.5 1-3"/>
  </IconBaseDuo>
))
IconCaffeineDuo.displayName = 'IconCaffeineDuo'
