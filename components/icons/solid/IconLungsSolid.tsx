// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLungsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M12 4V10" />
    <path fill="currentColor" d="M12 10C8 10 4 13 4 17C4 19 5 20 7 20C9 20 10 18 10 16V10" />
    <path fill="currentColor" d="M12 10C16 10 20 13 20 17C20 19 19 20 17 20C15 20 14 18 14 16V10" />
    </IconBaseSolid>
))
IconLungsSolid.displayName = 'IconLungsSolid'
