// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconVideo = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <path d="M16 10L22 6V18L16 14" />
  </IconBase>
))
IconVideo.displayName = 'IconVideo'
