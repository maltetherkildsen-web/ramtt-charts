// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPriceTagSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M20.59 11.5l-8.09-8.09A2 2 0 0 0 11.09 2.8L4 3a1 1 0 0 0-1 1l-.2 7.09c0 .53.21 1.04.59 1.41l8.09 8.09a2 2 0 0 0 2.83 0l6.28-6.28a2 2 0 0 0 0-2.83ZM7.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>
  </IconBaseSolid>
))
IconPriceTagSolid.displayName = 'IconPriceTagSolid'
