// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconArrowUpDownDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="3" width="18" height="18" rx="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M7 4v16"/>
    <path d="M4 7l3-3 3 3"/>
    <path d="M17 20V4"/>
    <path d="M14 17l3 3 3-3"/>
  </IconBaseDuo>
))
IconArrowUpDownDuo.displayName = 'IconArrowUpDownDuo'
