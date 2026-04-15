// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconLayers = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2L2 7l10 5 10-5L12 2z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>
  </IconBase>
))
IconLayers.displayName = 'IconLayers'
