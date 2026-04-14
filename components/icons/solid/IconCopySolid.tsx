// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCopySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M6 4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2V8a2 2 0 0 1 2-2h6V6a2 2 0 0 0-2-2H6Z"/>
    <rect x="8" y="8" width="12" height="12" rx="2"/>
  </IconBaseSolid>
))
IconCopySolid.displayName = 'IconCopySolid'
