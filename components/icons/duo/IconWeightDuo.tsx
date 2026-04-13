// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWeightDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M12 3L3 7V9H21V7L12 3Z" />
    <path d="M5 9V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V9" />
    <circle cx="12" cy="14" r="3" />
    <path d="M12 11V14L14 14.5" />
    </IconBaseDuo>
))
IconWeightDuo.displayName = 'IconWeightDuo'
