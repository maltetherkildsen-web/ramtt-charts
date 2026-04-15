// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGlucoseMoleculeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Hexagonal pyranose ring */}
    <path d="M8 7l4-2 4 2v4l-2 3H10L8 11Z"/>
    {/* O in ring */}
    <circle cx="12" cy="5" r="1.2" fill="var(--icon-bg, #fff)"/>
    {/* OH groups as dots */}
    <circle cx="4.5" cy="5.5" r="1.5"/>
    <circle cx="19.5" cy="5.5" r="1.5"/>
    <circle cx="8.5" cy="17.5" r="1.5"/>
    <circle cx="15.5" cy="17.5" r="1.5"/>
    {/* Bond connectors */}
    <rect x="5" y="5.8" width="3" height="1.4" rx=".4"/>
    <rect x="16" y="5.8" width="3" height="1.4" rx=".4"/>
    <rect x="8.5" y="14" width="1.4" height="3" rx=".4"/>
    <rect x="14.5" y="14" width="1.4" height="3" rx=".4"/>
    <circle cx="5" cy="12.5" r="1.5"/>
  </IconBaseSolid>
))
IconGlucoseMoleculeSolid.displayName = 'IconGlucoseMoleculeSolid'
