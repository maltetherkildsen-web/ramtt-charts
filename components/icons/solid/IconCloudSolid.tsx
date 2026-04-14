// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCloudSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M18 10h-1.26A6 6 0 0 0 5 11a4 4 0 0 0-3 3 3 3 0 0 0 3 3h13a4 4 0 0 0 0-8v1Z"/>
  </IconBaseSolid>
))
IconCloudSolid.displayName = 'IconCloudSolid'
