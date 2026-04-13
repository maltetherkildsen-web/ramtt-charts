// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconListSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M9 6H21" />
    <path fill="currentColor" d="M9 12H21" />
    <path fill="currentColor" d="M9 18H21" />
    <circle fill="currentColor" cx="4.5" cy="6" r="1.5" />
    <circle fill="currentColor" cx="4.5" cy="12" r="1.5" />
    <circle fill="currentColor" cx="4.5" cy="18" r="1.5" />
    </IconBaseSolid>
))
IconListSolid.displayName = 'IconListSolid'
