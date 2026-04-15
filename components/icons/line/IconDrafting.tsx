// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconDrafting = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="7" cy="10" r="2"/><path d="M5 13c0 1 .5 2 2 2s2-1 2-2"/><circle cx="15" cy="10" r="2"/><path d="M13 13c0 1 .5 2 2 2s2-1 2-2"/><path d="M19 8h3"/><path d="M19 11h3"/><path d="M19 14h2"/>
  </IconBase>
))
IconDrafting.displayName = 'IconDrafting'
