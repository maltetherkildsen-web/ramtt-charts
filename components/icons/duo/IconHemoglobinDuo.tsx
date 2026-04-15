// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconHemoglobinDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="9" cy="9" r="4" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    <circle cx="15" cy="9" r="4" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    <circle cx="9" cy="15" r="4" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    <circle cx="15" cy="15" r="4" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="9" cy="9" r="4"/>
    <circle cx="15" cy="9" r="4"/>
    <circle cx="9" cy="15" r="4"/>
    <circle cx="15" cy="15" r="4"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="5" r="1.2"/>
    <circle cx="20" cy="5" r="1.2"/>
  </IconBaseDuo>
))
IconHemoglobinDuo.displayName = 'IconHemoglobinDuo'
