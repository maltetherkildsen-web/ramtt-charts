// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRiceCakeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3 7l2-2h14l2 2v10l-2 2H5l-2-2V7z" fill="currentColor"/>
  </IconBaseSolid>
))
IconRiceCakeSolid.displayName = 'IconRiceCakeSolid'
