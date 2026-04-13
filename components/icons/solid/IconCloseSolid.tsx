// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCloseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M6 6L18 18" />
    <path fill="currentColor" d="M18 6L6 18" />
    </IconBaseSolid>
))
IconCloseSolid.displayName = 'IconCloseSolid'
