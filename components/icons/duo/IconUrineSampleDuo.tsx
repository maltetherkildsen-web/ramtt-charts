// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconUrineSampleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M7 8h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M7 8h10v12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V8Z"/>
    <path d="M7 5h10v3H7V5Z"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconUrineSampleDuo.displayName = 'IconUrineSampleDuo'
