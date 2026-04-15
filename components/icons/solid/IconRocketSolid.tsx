// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRocketSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 1.25c-1.5 0-2.5.5-3.75 1.25S6.5 4.75 5.5 7C4.25 9.75 3.75 12.5 3.5 14.25a.75.75 0 00.3.72l1.95 1.46L4.47 17.72a.75.75 0 000 1.06l1.5 1.5a.75.75 0 001.06 0l1.29-1.28 1.46 1.95a.75.75 0 00.72.3c1.75-.25 4.5-.75 7.25-2C19.25 18.25 21 16.5 22 14.75c.75-1.25 1.25-2.25 1.25-3.75s-.5-2.5-1.25-3.75S20.5 5.5 19.25 4.5 17 2.5 15.75 2 13.5 1.25 12 1.25zm1.5 7.75a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"/>
  </IconBaseSolid>
))
IconRocketSolid.displayName = 'IconRocketSolid'
