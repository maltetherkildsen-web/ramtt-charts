// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconHydrationDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M7 10c0-1 .5-2 2-2h6c1.5 0 2 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V10Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M7 10c0-1 .5-2 2-2h6c1.5 0 2 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V10Z"/>
    <path d="M10 5h4v3h-4V5Z"/>
    <path d="M11 2h2v3h-2Z"/>
    <path d="M7 15h10"/>
  </IconBaseDuo>
))
IconHydrationDuo.displayName = 'IconHydrationDuo'
