// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconUserPlusDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <circle cx="10" cy="8" r="4" />
    <path d="M18 21C18 16.6 14.4 13 10 13C5.6 13 2 16.6 2 21" />
    <path d="M20 8V14" />
    <path d="M17 11H23" />
    </IconBaseDuo>
))
IconUserPlusDuo.displayName = 'IconUserPlusDuo'
