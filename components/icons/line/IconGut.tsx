// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

/** Stylized stomach/digestive tract — abstract S-curve, not anatomical. */
export const IconGut = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    {/* Stomach opening */}
    <path d="M8 3C6 3 4 5 4 7C4 10 7 10 7 13C7 16 4 16 4 19C4 20.5 5.5 21 7 21" />
    {/* Intestinal curve */}
    <path d="M16 3C18 3 20 5 20 7C20 10 17 10 17 13C17 16 20 16 20 19C20 20.5 18.5 21 17 21" />
    {/* Cross connections */}
    <path d="M7 7H17" />
    <path d="M7 17H17" />
  </IconBase>
))
IconGut.displayName = 'IconGut'
