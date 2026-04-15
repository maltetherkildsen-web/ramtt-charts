// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconInsulinMoleculeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Hexamer ring */}
    <path d="M12 3l7 4v6l-7 4-7-4V7Z"/>
    {/* Inner trimer — knockout */}
    <path d="M12 6l4 2.5v4L12 15l-4-2.5v-4Z" fill="var(--icon-bg, #fff)"/>
    {/* Central zinc core */}
    <circle cx="12" cy="10.5" r="1.8"/>
    {/* Binding tail */}
    <rect x="11.2" y="15" width="1.6" height="4" rx=".5"/>
    <circle cx="12" cy="20" r="1.5"/>
  </IconBaseSolid>
))
IconInsulinMoleculeSolid.displayName = 'IconInsulinMoleculeSolid'
