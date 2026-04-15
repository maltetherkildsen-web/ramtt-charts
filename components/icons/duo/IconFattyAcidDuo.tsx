// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconFattyAcidDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="4" cy="12" r="2.5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="4" cy="12" r="2.5"/>
    <circle cx="4" cy="12" r=".8" fill="currentColor" stroke="none"/>
    <path d="M6.5 12l2-3 2 3 2-3 2 3 2-3 2 3 2-3"/>
    <circle cx="20.5" cy="9" r=".7" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconFattyAcidDuo.displayName = 'IconFattyAcidDuo'
