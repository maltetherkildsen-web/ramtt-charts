// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDOMSSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 18h2c1 0 2 0 3-1s3-5 5-8 3-4 4-4 2 0 3 2 2 4 3 4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/><circle cx="10" cy="5" r="1.75" fill="currentColor"/>
  </IconBaseSolid>
))
IconDOMSSolid.displayName = 'IconDOMSSolid'
