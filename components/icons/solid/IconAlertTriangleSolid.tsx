// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAlertTriangleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 3L2 21h20L12 3Zm-.75 7.5a.75.75 0 0 1 1.5 0V15a.75.75 0 0 1-1.5 0v-4.5ZM12 16.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
  </IconBaseSolid>
))
IconAlertTriangleSolid.displayName = 'IconAlertTriangleSolid'
