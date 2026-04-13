// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconProteinSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="5" cy="12" r="3" />
    <circle fill="currentColor" cx="12" cy="12" r="3" />
    <circle fill="currentColor" cx="19" cy="12" r="3" />
    <path fill="currentColor" d="M8 12H9" />
    <path fill="currentColor" d="M15 12H16" />
    </IconBaseSolid>
))
IconProteinSolid.displayName = 'IconProteinSolid'
