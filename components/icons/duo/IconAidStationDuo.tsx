// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconAidStationDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 8h8l-1 9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L3 8Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M3 8h8l-1 9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L3 8z"/>
    <path d="M5 11h4"/>
    <path d="M17 20V4"/>
    <path d="M17 4h4v4h-4"/>
  </IconBaseDuo>
))
IconAidStationDuo.displayName = 'IconAidStationDuo'
