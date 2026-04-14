// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDurabilitySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 6c2 0 4 2 7 6s5 6 8 6v2c-4 0-6-2-9-6S5 8 3 8V6Z"/>
  </IconBaseSolid>
))
IconDurabilitySolid.displayName = 'IconDurabilitySolid'
