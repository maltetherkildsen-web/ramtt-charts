// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrainingLoadSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M5 20V16" />
    <path fill="currentColor" d="M9 20V13" />
    <path fill="currentColor" d="M13 20V10" />
    <path fill="currentColor" d="M17 20V7" />
    <path fill="currentColor" d="M21 20V4" />
    <path fill="currentColor" d="M3 16L7 13L11 10L15 7L19 4" />
    </IconBaseSolid>
))
IconTrainingLoadSolid.displayName = 'IconTrainingLoadSolid'
