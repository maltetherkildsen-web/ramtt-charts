// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGelDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M9 6l-2 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l-2-14H9Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
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
