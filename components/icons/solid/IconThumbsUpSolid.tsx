// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconThumbsUpSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="2" y="11" width="5" height="11" rx="2"/>
    <path d="M7 11V5a3 3 0 0 1 6 0v3h4a2 2 0 0 1 2 2.2l-1.5 7a2 2 0 0 1-2 1.8H7Z"/>
  </IconBaseSolid>
))
IconThumbsUpSolid.displayName = 'IconThumbsUpSolid'
