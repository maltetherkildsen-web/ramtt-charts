// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconChickenLegSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M14 2.25c-3.45 0-5.75 2.25-5.75 5.75 0 1.1.3 2 .7 2.8L5.47 14.28c-1.76 1.76-1.26 4.2.7 5.55 1.7 1.17 4.1 1.47 5.55-.27l3.6-3.36c.7-.3 1.5-.45 2.68-.45 3.45 0 5.75-2.3 5.75-5.75S21.45 4.25 18 4.25c-1.18 0-2.08.2-2.88.57C14.52 3.72 13.4 2.25 14 2.25z"/>
  </IconBaseSolid>
))
IconChickenLegSolid.displayName = 'IconChickenLegSolid'
