// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFlowStateSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 1.25c-3.3 0-5.7 2.2-6.8 4.4-1.1 2.3-1.2 5.4.9 7.5.85.85 1.3 2 1.5 3.35h8.8c.2-1.35.65-2.5 1.5-3.35 2.1-2.1 2-5.2.9-7.5-1.1-2.2-3.5-4.4-6.8-4.4zm-3.5 16.5a.75.75 0 000 1.5h7a.75.75 0 000-1.5h-7zm.5 3a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z"/>
  </IconBaseSolid>
))
IconFlowStateSolid.displayName = 'IconFlowStateSolid'
