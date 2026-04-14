// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArchiveSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="2" y="3" width="20" height="5" rx="1"/>
    <path fillRule="evenodd" d="M4 8v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8H4Zm5.25 3.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z"/>
  </IconBaseSolid>
))
IconArchiveSolid.displayName = 'IconArchiveSolid'
