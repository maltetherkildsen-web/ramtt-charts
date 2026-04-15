// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAminoAcidSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Central alpha carbon */}
    <circle cx="12" cy="12" r="2.5"/>
    {/* NH2 group — top */}
    <rect x="11.2" y="5" width="1.6" height="5" rx=".5"/>
    <circle cx="12" cy="4" r="2"/>
    {/* COOH group — bottom */}
    <rect x="11.2" y="14" width="1.6" height="4" rx=".5"/>
    <circle cx="10.5" cy="20" r="1.3"/>
    <circle cx="13.5" cy="20" r="1.3"/>
    {/* H — left */}
    <rect x="5.5" y="11.2" width="5" height="1.6" rx=".5"/>
    <circle cx="5" cy="12" r="1.3"/>
    {/* R group — right */}
    <rect x="14" y="11.2" width="4" height="1.6" rx=".5"/>
    <rect x="18" y="10" width="4" height="4" rx="1"/>
  </IconBaseSolid>
))
IconAminoAcidSolid.displayName = 'IconAminoAcidSolid'
