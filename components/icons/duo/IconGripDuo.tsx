// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGripDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="6" y="4" width="12" height="16" rx="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <circle cx="9" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="9" cy="17" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="17" r="1.5" fill="currentColor" stroke="none" />
  </IconBaseDuo>
))
IconGripDuo.displayName = 'IconGripDuo'
