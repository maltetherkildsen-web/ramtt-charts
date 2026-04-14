// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCHODuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M5 10c0-3 3-6 7-6s7 3 7 6v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M5 10c0-3 3-6 7-6s7 3 7 6v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z"/>
    <path d="M8 8c2-1 6-1 8 0"/>
  </IconBaseDuo>
))
IconCHODuo.displayName = 'IconCHODuo'
