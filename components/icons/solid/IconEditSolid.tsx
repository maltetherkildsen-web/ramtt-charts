// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEditSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18H4v-4L16.5 3.5Z"/>
  </IconBaseSolid>
))
IconEditSolid.displayName = 'IconEditSolid'
