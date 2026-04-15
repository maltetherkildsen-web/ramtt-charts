// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDumbbellDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="8" width="3" height="8" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    <rect x="18" y="8" width="3" height="8" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="3" y="8" width="3" height="8" rx="1"/>
    <rect x="18" y="8" width="3" height="8" rx="1"/>
    <path d="M6 12h12"/>
  </IconBaseDuo>
))
IconDumbbellDuo.displayName = 'IconDumbbellDuo'
