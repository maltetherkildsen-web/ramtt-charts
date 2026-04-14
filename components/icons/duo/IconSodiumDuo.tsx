// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSodiumDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M8 10l-1 10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l-1-10H8Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M8 10l-1 10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l-1-10"/>
    <path d="M7 7h10v3H7V7Z"/>
    <circle cx="10" cy="4.5" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="14" cy="4.5" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="3.5" r=".75" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconSodiumDuo.displayName = 'IconSodiumDuo'
