// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconAppleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M17.5 8C20 9 22 12 21 16c-.5 2-2 5-4 5-1 0-2-.5-3-1-1 .5-2 1-3 1-2 0-3.5-3-4-5-1-4 1-7 3.5-8 1-.5 2.5-.5 3.5 0 1-.5 2.5-.5 3.5 0Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 3c1-1.5 3-2.5 5-2 0 1.5-1 3-3 3.5"/>
    <path d="M17.5 8C20 9 22 12 21 16c-.5 2-2 5-4 5-1 0-2-.5-3-1-1 .5-2 1-3 1-2 0-3.5-3-4-5-1-4 1-7 3.5-8 1-.5 2.5-.5 3.5 0 1-.5 2.5-.5 3.5 0Z"/>
  </IconBaseDuo>
))
IconAppleDuo.displayName = 'IconAppleDuo'
