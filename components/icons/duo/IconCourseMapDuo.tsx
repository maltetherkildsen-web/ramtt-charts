// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCourseMapDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="4" y="3" width="16" height="18" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="4" y="3" width="16" height="18" rx="2"/>
    <path d="M8 7h5a3 3 0 0 1 0 5h-2a3 3 0 0 0 0 5h5"/>
    <circle cx="8" cy="7" r="1" fill="currentColor" stroke="none"/>
    <circle cx="16" cy="17" r="1" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconCourseMapDuo.displayName = 'IconCourseMapDuo'
