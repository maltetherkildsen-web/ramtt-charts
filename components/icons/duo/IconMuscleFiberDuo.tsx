// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMuscleFiberDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 12c0-6 3-10 8-10s8 4 8 10-3 10-8 10-8-4-8-10Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 12c0-6 3-10 8-10s8 4 8 10-3 10-8 10-8-4-8-10Z"/>
    <path d="M8 4.5v15"/>
    <path d="M12 2v20"/>
    <path d="M16 4.5v15"/>
  </IconBaseDuo>
))
IconMuscleFiberDuo.displayName = 'IconMuscleFiberDuo'
