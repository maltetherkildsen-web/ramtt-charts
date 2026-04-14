// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRedoDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M14 7a7 7 0 0 0 0 14h4V7h-4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M20 7l-3-3"/>
    <path d="M20 7l-3 3"/>
    <path d="M20 7h-6a7 7 0 0 0 0 14h4"/>
  </IconBaseDuo>
))
IconRedoDuo.displayName = 'IconRedoDuo'
