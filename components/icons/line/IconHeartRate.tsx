// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

/** ECG waveform trace — not a heart shape. Medical, precise. */
export const IconHeartRate = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 12H7L9 12L10 5L12 19L14 8L15 12H21" />
  </IconBase>
))
IconHeartRate.displayName = 'IconHeartRate'
