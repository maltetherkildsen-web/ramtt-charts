// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBeetrootDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M7 13a5 5 0 0 1 10 0c0 4-2.5 8-5 8s-5-4-5-8Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M7 13a5 5 0 0 1 10 0c0 4-2.5 8-5 8s-5-4-5-8Z"/>
    <path d="M12 8V5"/>
    <path d="M9 3c.5 2 1.5 3 3 3"/>
    <path d="M15 3c-.5 2-1.5 3-3 3"/>
  </IconBaseDuo>
))
IconBeetrootDuo.displayName = 'IconBeetrootDuo'
