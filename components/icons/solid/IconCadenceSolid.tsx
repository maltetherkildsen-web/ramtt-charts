// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCadenceSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
    <circle cx="17" cy="8" r="2.5"/>
    <circle cx="7" cy="16" r="2.5"/>
    <rect x="11" y="7.5" width="2" height="9" rx="1" transform="rotate(-39 12 12)"/>
  </IconBaseSolid>
))
IconCadenceSolid.displayName = 'IconCadenceSolid'
