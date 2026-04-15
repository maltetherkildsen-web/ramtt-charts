// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconAminoAcid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    {/* Central alpha carbon */}
    <circle cx="12" cy="12" r="2"/>
    {/* NH2 group (amino) — top */}
    <line x1="12" y1="10" x2="12" y2="5"/>
    <text x="12" y="4" textAnchor="middle" fontSize="3.5" fill="currentColor" stroke="none" fontFamily="sans-serif">NH₂</text>
    {/* COOH group (carboxyl) — bottom */}
    <line x1="12" y1="14" x2="12" y2="19"/>
    <circle cx="10.5" cy="20" r=".7" fill="currentColor" stroke="none"/>
    <circle cx="13.5" cy="20" r=".7" fill="currentColor" stroke="none"/>
    {/* H — left */}
    <line x1="10" y1="12" x2="6" y2="12"/>
    <circle cx="5" cy="12" r=".7" fill="currentColor" stroke="none"/>
    {/* R group — right */}
    <line x1="14" y1="12" x2="18" y2="12"/>
    <rect x="18" y="10" width="4" height="4" rx="1" fill="currentColor" fillOpacity={0.15}/>
  </IconBase>
))
IconAminoAcid.displayName = 'IconAminoAcid'
