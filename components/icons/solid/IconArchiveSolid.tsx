// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArchiveSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="2" y="3" width="20" height="5" rx="1" />
    <path fill="currentColor" d="M4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8" />
    <path fill="currentColor" d="M10 12H14" />
    </IconBaseSolid>
))
IconArchiveSolid.displayName = 'IconArchiveSolid'
