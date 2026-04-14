// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPriceTagDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M20.59 11.5l-8.09-8.09A2 2 0 0 0 11.09 2.8L4 3a1 1 0 0 0-1 1l-.2 7.09c0 .53.21 1.04.59 1.41l8.09 8.09a2 2 0 0 0 2.83 0l6.28-6.28a2 2 0 0 0 0-2.83Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M20.6 11.5L12.5 3.4C12.1 3 11.6 2.8 11.1 2.8L4 3C3.4 3 3 3.4 3 4L2.8 11.1C2.8 11.6 3 12.1 3.4 12.5L11.5 20.6C12.3 21.4 13.6 21.4 14.4 20.6L20.6 14.4C21.4 13.6 21.4 12.3 20.6 11.5Z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </IconBaseDuo>
))
IconPriceTagDuo.displayName = 'IconPriceTagDuo'
