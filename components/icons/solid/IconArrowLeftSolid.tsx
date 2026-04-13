// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArrowLeftSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M20 12H4" />
    <path fill="currentColor" d="M10 6L4 12L10 18" />
    </IconBaseSolid>
))
IconArrowLeftSolid.displayName = 'IconArrowLeftSolid'
