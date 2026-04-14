// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconStomachDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M16 4s4 0 4 4-4 4-4 8-4 6-8 6-4-4-4-6 2-4 4-4" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M16 4s4 0 4 4-4 4-4 8-4 6-8 6-4-4-4-6 2-4 4-4"/>
    <path d="M16 4c-2 0-4 1-4 3"/>
  </IconBaseDuo>
))
IconStomachDuo.displayName = 'IconStomachDuo'
