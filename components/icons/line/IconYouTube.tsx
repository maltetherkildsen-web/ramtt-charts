// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconYouTube = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="2" y="5" width="20" height="14" rx="4"/>
    <path d="M10 9l5 3-5 3V9Z"/>
  </IconBase>
))
IconYouTube.displayName = 'IconYouTube'
