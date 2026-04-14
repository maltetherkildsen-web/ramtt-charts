// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconResilienceDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 8c0 8 4 11 9 11s9-3 9-11v12H3V8Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M3 8c0 8 4 11 9 11s9-3 9-11"/>
    <path d="M17 4l4 4-4 4"/>
  </IconBaseDuo>
))
IconResilienceDuo.displayName = 'IconResilienceDuo'
