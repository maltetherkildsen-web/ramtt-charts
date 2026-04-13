// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconIntervalSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 20V8H7V20" />
    <path fill="currentColor" d="M9 20V14H12V20" />
    <path fill="currentColor" d="M14 20V6H17V20" />
    <path fill="currentColor" d="M19 20V12H22V20" />
    </IconBaseSolid>
))
IconIntervalSolid.displayName = 'IconIntervalSolid'
