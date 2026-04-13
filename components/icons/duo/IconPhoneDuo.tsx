// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPhoneDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M22 16.9V19.9C22 20.5 21.5 21 20.9 21C10.6 21 3 13.4 3 3.1C3 2.5 3.5 2 4.1 2H7.1C7.6 2 8 2.4 8.1 2.9C8.3 4.1 8.7 5.2 9.1 6.2L7 8.3C8.5 11.5 11.2 14.1 14.3 15.6L16.5 13.5C17.4 13.9 18.4 14.2 19.5 14.4C20 14.5 20.5 15 20.5 15.5L22 16.9Z" />
    </IconBaseDuo>
))
IconPhoneDuo.displayName = 'IconPhoneDuo'
