// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconKitchenScaleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v2.25H5a2.75 2.75 0 00-2.75 2.75v5A2.75 2.75 0 005 21.75h14a2.75 2.75 0 002.75-2.75v-5A2.75 2.75 0 0019 11.25h-.25V9A6.75 6.75 0 0012 2.25zM17.25 9v2.25H6.75V9a5.25 5.25 0 0110.5 0zM8 16.25a.75.75 0 000 1.5h8a.75.75 0 000-1.5H8z"/>
  </IconBaseSolid>
))
IconKitchenScaleSolid.displayName = 'IconKitchenScaleSolid'
