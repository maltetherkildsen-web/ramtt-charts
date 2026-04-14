// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconInfoDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <circle cx="12" cy="12" r="9" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    <path d="M12 11V16" />
  </IconBaseDuo>
))
IconInfoDuo.displayName = 'IconInfoDuo'
