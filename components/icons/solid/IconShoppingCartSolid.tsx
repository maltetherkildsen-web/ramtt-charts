// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconShoppingCartSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M1 1H5L7.7 14.4C7.9 15.3 8.7 16 9.6 16H19.4C20.3 16 21 15.3 21.2 14.4L23 6H6" />
    <circle fill="currentColor" cx="10" cy="20" r="1.5" />
    <circle fill="currentColor" cx="19" cy="20" r="1.5" />
    </IconBaseSolid>
))
IconShoppingCartSolid.displayName = 'IconShoppingCartSolid'
