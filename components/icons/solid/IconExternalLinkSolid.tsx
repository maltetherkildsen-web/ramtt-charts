// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconExternalLinkSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M5 6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6h-2v6H5V8h6V6H5Z"/>
    <path d="M15 3h6v6l-3-3-6.5 6.5-1.41-1.41L16.59 4.6 15 3Z"/>
  </IconBaseSolid>
))
IconExternalLinkSolid.displayName = 'IconExternalLinkSolid'
