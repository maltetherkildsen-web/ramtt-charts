// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconPasta = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 22v-8"/><path d="M10 14h4"/><path d="M8 8c0 3 1.5 5 4 6 2.5-1 4-3 4-6"/><path d="M8 8c-1-2 0-4 2-4"/><path d="M16 8c1-2 0-4-2-4"/><path d="M10 4c0-1 1-2 2-2s2 1 2 2"/>
  </IconBase>
))
IconPasta.displayName = 'IconPasta'
