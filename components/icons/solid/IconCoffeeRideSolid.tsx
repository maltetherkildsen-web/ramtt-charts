// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCoffeeRideSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="15" r="7.75" fill="currentColor" opacity="0.2"/><circle cx="12" cy="15" r="2.75" fill="currentColor"/><path d="M12 8.25a7.75 7.75 0 017.24 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3"/><path fillRule="evenodd" d="M7.25 6a.75.75 0 01.75-.75h5a.75.75 0 01.75.75v.25h.75a2.25 2.25 0 010 4.5h-.75A2.75 2.75 0 0111 13.5H9a2.75 2.75 0 01-2.75-2.75V6z"/>
  </IconBaseSolid>
))
IconCoffeeRideSolid.displayName = 'IconCoffeeRideSolid'
