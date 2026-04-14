// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHeartRateSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 6C10 3 6 2.5 4 5s-1.5 6 8 14c9.5-8 9.5-11.5 8-14S14 3 12 6Zm-5 6h2l1.5-3 2 6 1.5-3H17l-2.5 1H14l-1-3-1.5 4.5-1.5-5L9 12.5H7Z"/>
  </IconBaseSolid>
))
IconHeartRateSolid.displayName = 'IconHeartRateSolid'
