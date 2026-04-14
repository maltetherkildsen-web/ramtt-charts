// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSpeedDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 18a9 9 0 0 1 16 0H4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 18a9 9 0 0 1 16 0"/>
    <path d="M7.5 9.5l.5.5"/>
    <path d="M12 7v1"/>
    <path d="M16.5 9.5l-.5.5"/>
    <path d="M12 18l3.5-8"/>
    <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconSpeedDuo.displayName = 'IconSpeedDuo'
