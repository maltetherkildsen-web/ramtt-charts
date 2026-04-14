// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconHRVDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="6" width="18" height="12" rx="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M3 12C5 12 5 6 7 6C9 6 9 18 11 18C13 18 13 8 15 8C17 8 17 14 19 14C20 14 21 12 21 12" />
  </IconBaseDuo>
))
IconHRVDuo.displayName = 'IconHRVDuo'
