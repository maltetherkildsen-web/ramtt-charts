// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMapPinDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 1C12 1 4 10 4 15C4 19.4 7.6 23 12 23C16.4 23 20 19.4 20 15C20 10 12 1 12 1Z" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M12 22C12 22 19 16 19 10C19 6.1 15.9 3 12 3C8.1 3 5 6.1 5 10C5 16 12 22 12 22Z" />
    <circle cx="12" cy="10" r="3" />
    </IconBaseDuo>
))
IconMapPinDuo.displayName = 'IconMapPinDuo'
