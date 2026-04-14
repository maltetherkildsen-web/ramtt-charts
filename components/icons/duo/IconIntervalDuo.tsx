// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconIntervalDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="5" width="18" height="16" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M4 20V8H7V20" />
    <path d="M9 20V14H12V20" />
    <path d="M14 20V6H17V20" />
    <path d="M19 20V12H22V20" />
  </IconBaseDuo>
))
IconIntervalDuo.displayName = 'IconIntervalDuo'
