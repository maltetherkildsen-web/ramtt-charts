// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTwitterDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="3" width="18" height="18" rx="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 4l7.2 8.4M20 20l-7.2-8.4M4 4h4.5l11.5 16h-4.5L4 4Z"/>
    <path d="M4 20l6.5-7.5M20 4l-6.5 7.5"/>
  </IconBaseDuo>
))
IconTwitterDuo.displayName = 'IconTwitterDuo'
