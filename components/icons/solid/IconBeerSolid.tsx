// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBeerSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M6.26 3.6C6.44 2.6 8.22 1.25 12 1.25s5.56 1.35 5.74 2.35l1 16a.75.75 0 01-.74.87H8L6.26 3.6zM7.75 8.25h8.5l-.25-4c-.4-.4-1.8-1.25-4-1.25s-3.6.85-4 1.25l-.25 4z"/>
  </IconBaseSolid>
))
IconBeerSolid.displayName = 'IconBeerSolid'
