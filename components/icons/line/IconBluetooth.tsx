// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconBluetooth = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M6.5 6.5L17.5 17.5L12 23V1L17.5 6.5L6.5 17.5" />
  </IconBase>
))
IconBluetooth.displayName = 'IconBluetooth'
