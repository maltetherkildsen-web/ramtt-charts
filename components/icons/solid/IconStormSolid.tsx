// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStormSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M6.34 4.34A8.75 8.75 0 0116.95 6.5H18a5.75 5.75 0 012.3 11.02.75.75 0 01-.6-1.37A4.25 4.25 0 0018 8h-.75a.75.75 0 01-.73-.57A7.25 7.25 0 104.38 14.87a.75.75 0 01-.76 1.3A8.75 8.75 0 016.34 4.34z"/><path d="M13.6 11.2a.75.75 0 01.15.8l-1.31 2.62h2.81a.75.75 0 01.65 1.13l-2 3.5a.75.75 0 01-1.3-.75l1.15-2.25H11a.75.75 0 01-.65-1.12l2-4a.75.75 0 011.25-.3z"/>
  </IconBaseSolid>
))
IconStormSolid.displayName = 'IconStormSolid'
