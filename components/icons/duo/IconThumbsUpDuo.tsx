// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconThumbsUpDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="11" width="5" height="11" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    <path d="M7 11V5a3 3 0 0 1 6 0v3h4a2 2 0 0 1 2 2.2l-1.5 7a2 2 0 0 1-2 1.8H7"/>
  </IconBaseDuo>
))
IconThumbsUpDuo.displayName = 'IconThumbsUpDuo'
