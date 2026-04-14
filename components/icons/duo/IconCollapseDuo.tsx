// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCollapseDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="4" y="4" width="16" height="16" rx="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M4 10H10V4" />
    <path d="M10 10L3 3" />
    <path d="M20 14H14V20" />
    <path d="M14 14L21 21" />
  </IconBaseDuo>
))
IconCollapseDuo.displayName = 'IconCollapseDuo'
