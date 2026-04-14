// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSleepDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="12" cy="12" r="9" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M21 12.8A9 9 0 1 1 11.2 3C12.7 4.5 13.6 6.5 13.6 8.8C13.6 13.1 10.2 16.6 5.9 16.6" />
    <circle cx="17" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="20" cy="9" r="0.8" fill="currentColor" stroke="none" />
  </IconBaseDuo>
))
IconSleepDuo.displayName = 'IconSleepDuo'
