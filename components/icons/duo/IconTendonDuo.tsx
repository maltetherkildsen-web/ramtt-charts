// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTendonDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 2c2 4 5.5 9.5 8 13s5 5 7 7l1 1H15c-2-2-4.5-4-7-7S5.5 8 4 4V2Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 3h5"/>
    <path d="M15 21h5"/>
    <path d="M7 3c2 4 5 9 7 12s4 4 6 6"/>
    <path d="M5 3c2 4 5 9 7 12s5 4 7 6"/>
  </IconBaseDuo>
))
IconTendonDuo.displayName = 'IconTendonDuo'
