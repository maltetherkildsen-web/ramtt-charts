// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPodiumDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="9" y="7" width="6" height="14" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="2" y="13" width="6" height="8"/>
    <rect x="9" y="7" width="6" height="14"/>
    <rect x="16" y="16" width="6" height="5"/>
    <path d="M2 21h20"/>
  </IconBaseDuo>
))
IconPodiumDuo.displayName = 'IconPodiumDuo'
