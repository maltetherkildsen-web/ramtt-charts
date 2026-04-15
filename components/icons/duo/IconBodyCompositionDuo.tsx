// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBodyCompositionDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M9 9h6v6l1 7H8l1-7V9Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="12" cy="4" r="2"/>
    <path d="M9 9h6v6l1 7H8l1-7V9Z"/>
    <path d="M6 12h12"/>
    <path d="M7 17h10"/>
  </IconBaseDuo>
))
IconBodyCompositionDuo.displayName = 'IconBodyCompositionDuo'
