// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconO2 = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    {/* Left oxygen atom */}
    <circle cx="8.5" cy="12" r="4.5"/>
    {/* Right oxygen atom */}
    <circle cx="15.5" cy="12" r="4.5"/>
    {/* Double bond (=) */}
    <line x1="11" y1="10.5" x2="13" y2="10.5"/>
    <line x1="11" y1="13.5" x2="13" y2="13.5"/>
    {/* Electron dots */}
    <circle cx="4" cy="10" r=".6" fill="currentColor" stroke="none"/>
    <circle cx="4" cy="14" r=".6" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="10" r=".6" fill="currentColor" stroke="none"/>
    <circle cx="20" cy="14" r=".6" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconO2.displayName = 'IconO2'
