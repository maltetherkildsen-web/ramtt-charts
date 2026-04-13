// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTableSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="3" y="3" width="18" height="18" rx="2" />
    <path fill="currentColor" d="M3 9H21" />
    <path fill="currentColor" d="M3 15H21" />
    <path fill="currentColor" d="M9 3V21" />
    </IconBaseSolid>
))
IconTableSolid.displayName = 'IconTableSolid'
