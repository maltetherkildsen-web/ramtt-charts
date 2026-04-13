// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDatabaseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <ellipse fill="currentColor" cx="12" cy="5" rx="8" ry="3" />
    <path fill="currentColor" d="M20 5V19C20 20.7 16.4 22 12 22C7.6 22 4 20.7 4 19V5" />
    <path fill="currentColor" d="M4 12C4 13.7 7.6 15 12 15C16.4 15 20 13.7 20 12" />
    </IconBaseSolid>
))
IconDatabaseSolid.displayName = 'IconDatabaseSolid'
