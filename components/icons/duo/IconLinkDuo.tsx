// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLinkDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M10 13A5 5 0 0 0 13.5 14.9L16.4 12C18 10.4 18 7.8 16.4 6.2C14.8 4.6 12.2 4.6 10.6 6.2L9 7.8" />
    <path d="M14 11A5 5 0 0 0 10.5 9.1L7.6 12C6 13.6 6 16.2 7.6 17.8C9.2 19.4 11.8 19.4 13.4 17.8L15 16.2" />
    </IconBaseDuo>
))
IconLinkDuo.displayName = 'IconLinkDuo'
