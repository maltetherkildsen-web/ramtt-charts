// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPizzaSliceSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12.38 1.4a.75.75 0 00-.76 0l-9 11a.75.75 0 00.63 1.17L12 19.25l8.75-5.68a.75.75 0 00.63-1.17l-9-11z"/><circle cx="10" cy="11" r="1.25" fill="white"/><circle cx="14" cy="13" r="1.25" fill="white"/><circle cx="11" cy="15" r="1.25" fill="white"/>
  </IconBaseSolid>
))
IconPizzaSliceSolid.displayName = 'IconPizzaSliceSolid'
