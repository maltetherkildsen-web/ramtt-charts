// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRefreshDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M21 2V8H15" />
    <path d="M3 22V16H9" />
    <path d="M21 8C19.6 4.9 16.1 3 12 3C7 3 3 7 3 12" />
    <path d="M3 16C4.4 19.1 7.9 21 12 21C17 21 21 17 21 12" />
    </IconBaseDuo>
))
IconRefreshDuo.displayName = 'IconRefreshDuo'
