// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGlycogenDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    {/* Battery body */}
    <rect x="3" y="8" width="16" height="8" rx="2" />
    {/* Terminal nub */}
    <path d="M19 11H21V13H19" />
    {/* Fill level (~60%) */}
    <path d="M6 11H12V13H6Z" fill="currentColor" fillOpacity={0.15} stroke="none" />
    </IconBaseDuo>
))
IconGlycogenDuo.displayName = 'IconGlycogenDuo'
