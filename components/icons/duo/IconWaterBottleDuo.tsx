// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWaterBottleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M9 8h6a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M8 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9Z"/>
    <path d="M10 5h4v3h-4V5Z"/>
    <path d="M11.5 2.5V5"/>
    <path d="M9 15h6"/>
  </IconBaseDuo>
))
IconWaterBottleDuo.displayName = 'IconWaterBottleDuo'
