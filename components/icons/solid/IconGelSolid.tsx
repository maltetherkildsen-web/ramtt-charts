// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGelSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Pouch body */}
    <path fill="currentColor" d="M9 6L7 20C7 20.5 7.5 21 8 21H16C16.5 21 17 20.5 17 20L15 6" />
    {/* Top seal */}
    <path fill="currentColor" d="M9 6H15" />
    {/* Tear tab */}
    <path fill="currentColor" d="M13 6L14.5 3" />
    </IconBaseSolid>
))
IconGelSolid.displayName = 'IconGelSolid'
