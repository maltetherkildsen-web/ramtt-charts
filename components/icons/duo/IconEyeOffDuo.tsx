// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconEyeOffDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M17.9 17.9C16.2 19.2 14.2 20 12 20C5 20 1 12 1 12C2.2 9.7 4 7.8 6.1 6.4" />
    <path d="M9.9 4.2C10.6 4.1 11.3 4 12 4C19 4 23 12 23 12C22.4 13.1 21.6 14.2 20.7 15.1" />
    <path d="M14.1 14.1A3 3 0 1 1 9.9 9.9" />
    <path d="M1 1L23 23" />
  </IconBaseDuo>
))
IconEyeOffDuo.displayName = 'IconEyeOffDuo'
