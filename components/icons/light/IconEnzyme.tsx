// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconEnzyme = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    {/* Enzyme body with active site notch */}
    <path d="M4 8c0-2 2-4 5-4h2c3 0 5 1 6 3s1 4 0 6l-2 3c-1 1-3 2-5 2H8c-2 0-3.5-1-4-3s-.5-4 0-7Z"/>
    {/* Active site pocket */}
    <path d="M17 10c-1.5 0-2.5 1-2.5 2.5S15.5 15 17 15"/>
    {/* Substrate fitting into pocket */}
    <rect x="18" y="10.5" width="3" height="4" rx="1" fill="currentColor" fillOpacity={0.15}/>
  </IconBaseLight>
))
IconEnzyme.displayName = 'IconEnzyme'
