// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGlobeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-.75.84A7.51 7.51 0 0 0 4.5 12c0 .26.01.51.04.76h5.21V3.84Zm1.5 0v8.92h5.21A7.51 7.51 0 0 0 12.75 3.84Zm5.06 10.42h-5.06v5.9a7.51 7.51 0 0 0 5.06-5.9Zm-6.56 5.9v-5.9H6.19a7.51 7.51 0 0 0 5.06 5.9Z"/>
  </IconBaseSolid>
))
IconGlobeSolid.displayName = 'IconGlobeSolid'
