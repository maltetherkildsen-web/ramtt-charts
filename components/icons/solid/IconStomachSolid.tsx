// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStomachSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M16 4C16 4 20 4 20 8C20 12 16 12 16 16C16 20 12 22 8 22C4 22 4 18 4 16C4 14 6 12 8 12" />
    <path fill="currentColor" d="M16 4C14 4 12 5 12 7" />
    </IconBaseSolid>
))
IconStomachSolid.displayName = 'IconStomachSolid'
