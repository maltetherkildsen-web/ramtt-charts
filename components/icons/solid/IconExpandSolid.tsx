// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconExpandSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M14 4H20V10" />
    <path fill="currentColor" d="M20 4L13 11" />
    <path fill="currentColor" d="M10 20H4V14" />
    <path fill="currentColor" d="M4 20L11 13" />
    </IconBaseSolid>
))
IconExpandSolid.displayName = 'IconExpandSolid'
