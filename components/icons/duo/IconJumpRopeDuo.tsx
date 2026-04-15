// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconJumpRopeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="5" y="3" width="2" height="5" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    <rect x="17" y="3" width="2" height="5" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="5" y="3" width="2" height="5" rx="1"/>
    <rect x="17" y="3" width="2" height="5" rx="1"/>
    <path d="M6 8c0 12 12 12 12 0"/>
  </IconBaseDuo>
))
IconJumpRopeDuo.displayName = 'IconJumpRopeDuo'
