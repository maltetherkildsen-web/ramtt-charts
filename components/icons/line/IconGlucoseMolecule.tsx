// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconGlucoseMolecule = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    {/* Hexagonal pyranose ring */}
    <path d="M8 7l4-2 4 2v4l-2 3H10L8 11Z"/>
    {/* O in the ring */}
    <circle cx="12" cy="5" r=".8" fill="currentColor" stroke="none"/>
    {/* OH groups */}
    <line x1="8" y1="7" x2="5.5" y2="6"/>
    <circle cx="4.5" cy="5.5" r=".8" fill="currentColor" stroke="none"/>
    <line x1="16" y1="7" x2="18.5" y2="6"/>
    <circle cx="19.5" cy="5.5" r=".8" fill="currentColor" stroke="none"/>
    <line x1="10" y1="14" x2="9" y2="16.5"/>
    <circle cx="8.5" cy="17.5" r=".8" fill="currentColor" stroke="none"/>
    <line x1="14" y1="14" x2="15" y2="16.5"/>
    <circle cx="15.5" cy="17.5" r=".8" fill="currentColor" stroke="none"/>
    {/* CH2OH tail */}
    <line x1="8" y1="11" x2="5.5" y2="12"/>
    <path d="M4 12.5a1 1 0 1 0 2 0" fill="none"/>
  </IconBase>
))
IconGlucoseMolecule.displayName = 'IconGlucoseMolecule'
