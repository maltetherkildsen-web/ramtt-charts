// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGelDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    {/* Pouch body */}
    <path d="M9 6L7 20C7 20.5 7.5 21 8 21H16C16.5 21 17 20.5 17 20L15 6" />
    {/* Top seal */}
    <path d="M9 6H15" />
    {/* Tear tab */}
    <path d="M13 6L14.5 3" />
    </IconBaseDuo>
))
IconGelDuo.displayName = 'IconGelDuo'
