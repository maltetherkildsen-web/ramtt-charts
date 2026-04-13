// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDropletDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 1C12 1 4 10 4 15C4 19.4 7.6 23 12 23C16.4 23 20 19.4 20 15C20 10 12 1 12 1Z" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M12 2.7C12 2.7 5 10.7 5 15C5 18.9 8.1 22 12 22C15.9 22 19 18.9 19 15C19 10.7 12 2.7 12 2.7Z" />
    </IconBaseDuo>
))
IconDropletDuo.displayName = 'IconDropletDuo'
