// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconVO2MaxDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 18c2-3 4-10 8-10s6 7 8 10Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 18c2-3 4-10 8-10s6 7 8 10"/>
    <path d="M12 4v4"/>
    <path d="M10 6l2-2 2 2"/>
  </IconBaseDuo>
))
IconVO2MaxDuo.displayName = 'IconVO2MaxDuo'
