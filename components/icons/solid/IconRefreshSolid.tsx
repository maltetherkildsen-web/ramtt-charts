// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRefreshSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M21 2V8H15" />
    <path fill="currentColor" d="M3 22V16H9" />
    <path fill="currentColor" d="M21 8C19.6 4.9 16.1 3 12 3C7 3 3 7 3 12" />
    <path fill="currentColor" d="M3 16C4.4 19.1 7.9 21 12 21C17 21 21 17 21 12" />
    </IconBaseSolid>
))
IconRefreshSolid.displayName = 'IconRefreshSolid'
