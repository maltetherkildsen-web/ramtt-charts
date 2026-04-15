// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBikeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M5.5 12.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zM18.5 12.75a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5z"/><path d="M5.5 17L9 9h5l1.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M14 9l4.5 8M9 9l5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </IconBaseSolid>
))
IconBikeSolid.displayName = 'IconBikeSolid'
