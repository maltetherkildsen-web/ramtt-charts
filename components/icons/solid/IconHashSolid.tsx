// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHashSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 9H20" />
    <path fill="currentColor" d="M4 15H20" />
    <path fill="currentColor" d="M10 3L8 21" />
    <path fill="currentColor" d="M16 3L14 21" />
    </IconBaseSolid>
))
IconHashSolid.displayName = 'IconHashSolid'
