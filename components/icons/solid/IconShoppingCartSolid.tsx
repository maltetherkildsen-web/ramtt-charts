// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconShoppingCartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M1 1h4l2.68 13.39a1.2 1.2 0 0 0 1.2.97h9.72a1.2 1.2 0 0 0 1.18-.86L23 6H6l-1-5H1Z"/>
    <circle cx="10" cy="20.5" r="1.75"/>
    <circle cx="19" cy="20.5" r="1.75"/>
  </IconBaseSolid>
))
IconShoppingCartSolid.displayName = 'IconShoppingCartSolid'
