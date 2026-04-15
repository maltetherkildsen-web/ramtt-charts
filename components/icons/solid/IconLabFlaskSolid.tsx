// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLabFlaskSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M9 3v7l-4 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-4-10V3H9Z"/>
    <rect x="8" y="2.5" width="8" height="1" rx=".5"/>
  </IconBaseSolid>
))
IconLabFlaskSolid.displayName = 'IconLabFlaskSolid'
