// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconTrainingLoad = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M5 20V16" />
    <path d="M9 20V13" />
    <path d="M13 20V10" />
    <path d="M17 20V7" />
    <path d="M21 20V4" />
    <path d="M3 16L7 13L11 10L15 7L19 4" />
  </IconBase>
))
IconTrainingLoad.displayName = 'IconTrainingLoad'
