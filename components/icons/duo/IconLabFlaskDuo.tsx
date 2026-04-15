// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLabFlaskDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M9 3v7l-4 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-4-10V3H9Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M9 3v7l-4 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-4-10V3"/>
    <path d="M8 3h8"/>
    <path d="M7 16h10"/>
  </IconBaseDuo>
))
IconLabFlaskDuo.displayName = 'IconLabFlaskDuo'
