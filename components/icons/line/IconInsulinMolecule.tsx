// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconInsulinMolecule = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    {/* Hexamer ring — six-unit protein assembly */}
    <path d="M12 3l7 4v6l-7 4-7-4V7Z"/>
    {/* Inner trimer triangle */}
    <path d="M12 6l4 2.5v4L12 15l-4-2.5v-4Z"/>
    {/* Central zinc core */}
    <circle cx="12" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>
    {/* Insulin label */}
    <line x1="12" y1="15" x2="12" y2="19"/>
    <circle cx="12" cy="20" r="1" fill="currentColor" fillOpacity={0.15}/>
  </IconBase>
))
IconInsulinMolecule.displayName = 'IconInsulinMolecule'
