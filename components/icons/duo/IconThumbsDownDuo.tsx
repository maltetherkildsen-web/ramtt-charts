// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconThumbsDownDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="17" y="2" width="5" height="11" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/>
    <path d="M17 13v6a3 3 0 0 1-6 0v-3H7a2 2 0 0 1-2-2.2l1.5-7A2 2 0 0 1 8.5 5H17"/>
  </IconBaseDuo>
))
IconThumbsDownDuo.displayName = 'IconThumbsDownDuo'
