// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconArrowDownAZDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="11" y="6" width="11" height="16" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 20V4"/>
    <path d="M1 7l3-3 3 3"/>
    <path d="M13 8h6l-6 6h6"/>
    <path d="M13 20l3-6 3 6"/>
    <path d="M14 18h4"/>
  </IconBaseDuo>
))
IconArrowDownAZDuo.displayName = 'IconArrowDownAZDuo'
