// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLanguageSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M5.34 7.25H2a.75.75 0 000 1.5h2.52c.3 1.6.9 3.04 1.68 4.16-1.06.85-2.4 1.44-4.02 1.56a.75.75 0 10.1 1.5c2.01-.14 3.67-.88 4.94-1.94 1.27 1.06 2.93 1.8 4.94 1.94a.75.75 0 10.1-1.5c-1.62-.12-2.96-.71-4.02-1.56.78-1.12 1.38-2.56 1.68-4.16H12a.75.75 0 000-1.5H8.66c-.2-1.52-.24-2-.24-2a.75.75 0 00-1.5 0s-.04.48-.24 2H5.34zM7 10.02c.22 1.1.6 2.07 1.12 2.84A7.84 7.84 0 017 10.02zm7.75-5.27a.75.75 0 00-1.4.54l3 8a.75.75 0 001.4-.04l3-8a.75.75 0 00-1.4-.54L17 11.06l-2.25-6.31z"/>
  </IconBaseSolid>
))
IconLanguageSolid.displayName = 'IconLanguageSolid'
