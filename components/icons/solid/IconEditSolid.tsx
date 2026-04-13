// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEditSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M16.5 3.5L20.5 7.5L8 20H4V16L16.5 3.5Z" />
    <path fill="currentColor" d="M14 6L18 10" />
    </IconBaseSolid>
))
IconEditSolid.displayName = 'IconEditSolid'
