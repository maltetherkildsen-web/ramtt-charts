// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconThermometerSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M14 14.76V4a2 2 0 1 0-4 0v10.76a4.22 4.22 0 1 0 4 0Z"/>
  </IconBaseSolid>
))
IconThermometerSolid.displayName = 'IconThermometerSolid'
