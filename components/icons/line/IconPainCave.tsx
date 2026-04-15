// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconPainCave = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 20c0-8 4-16 9-16s9 8 9 16"/><path d="M9 17l1.5-3h3L15 17"/><path d="M10 15l3 2"/><path d="M3 20h18"/><path d="M11 8l-.5-.5.5-.5.5.5-.5.5"/><path d="M14 7l-.5-.5.5-.5.5.5-.5.5"/>
  </IconBase>
))
IconPainCave.displayName = 'IconPainCave'
