// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWifiSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M1.05 8.04a.75.75 0 011.02-.27A13.75 13.75 0 0112 5.25c3.68 0 7.12 1.03 9.93 2.52a.75.75 0 11-.75 1.3A12.25 12.25 0 0012 6.75c-3.28 0-6.34.92-8.68 2.31a.75.75 0 01-1.27-.02zM4.55 11.54a.75.75 0 011.03-.27A9.25 9.25 0 0112 9.25a9.25 9.25 0 016.42 2.02.75.75 0 11-.76 1.3A7.75 7.75 0 0012 10.75c-2.04 0-4 .63-5.66 1.82a.75.75 0 01-1.3-.03zM8.05 15.04a.75.75 0 011.03-.27 4.25 4.25 0 015.84 0 .75.75 0 11-.76 1.3 2.75 2.75 0 00-5.08 0 .75.75 0 01-1.03-1.03zM12 18a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
  </IconBaseSolid>
))
IconWifiSolid.displayName = 'IconWifiSolid'
