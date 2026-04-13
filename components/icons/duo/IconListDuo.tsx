// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconListDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M9 6H21" />
    <path d="M9 12H21" />
    <path d="M9 18H21" />
    <circle cx="4.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </IconBaseDuo>
))
IconListDuo.displayName = 'IconListDuo'
