// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEyeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Zm11-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
  </IconBaseSolid>
))
IconEyeSolid.displayName = 'IconEyeSolid'
