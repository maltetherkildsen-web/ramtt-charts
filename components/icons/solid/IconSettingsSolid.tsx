// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSettingsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="12" r="4.5"/>
    <rect x="11" y="1" width="2" height="5" rx="1"/>
    <rect x="11" y="18" width="2" height="5" rx="1"/>
    <rect x="1" y="11" width="5" height="2" rx="1"/>
    <rect x="18" y="11" width="5" height="2" rx="1"/>
    <rect x="17" y="4" width="2" height="4" rx="1" transform="rotate(45 18 6)"/>
    <rect x="5" y="16" width="2" height="4" rx="1" transform="rotate(45 6 18)"/>
    <rect x="5" y="4" width="2" height="4" rx="1" transform="rotate(-45 6 6)"/>
    <rect x="17" y="16" width="2" height="4" rx="1" transform="rotate(-45 18 18)"/>
  </IconBaseSolid>
))
IconSettingsSolid.displayName = 'IconSettingsSolid'
