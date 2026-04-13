// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHRVSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M3 12C5 12 5 6 7 6C9 6 9 18 11 18C13 18 13 8 15 8C17 8 17 14 19 14C20 14 21 12 21 12" />
    </IconBaseSolid>
))
IconHRVSolid.displayName = 'IconHRVSolid'
