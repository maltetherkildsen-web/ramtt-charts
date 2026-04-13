// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconUsersDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <circle cx="9" cy="8" r="3.5" />
    <path d="M17 21C17 17.1 13.4 14 9 14C4.6 14 1 17.1 1 21" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M23 21C23 18.2 20.8 16 18 16C17 16 16.1 16.3 15.3 16.8" />
    </IconBaseDuo>
))
IconUsersDuo.displayName = 'IconUsersDuo'
