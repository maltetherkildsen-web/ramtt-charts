// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconIntervalDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="4" width="19" height="17" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M5 20V6"/>
    <path d="M9 20v-4"/>
    <path d="M13 20V6"/>
    <path d="M17 20v-4"/>
    <path d="M21 20V4"/>
  </IconBaseDuo>
))
IconIntervalDuo.displayName = 'IconIntervalDuo'
