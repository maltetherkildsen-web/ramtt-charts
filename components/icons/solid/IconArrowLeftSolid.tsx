// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArrowLeftSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 12l6-6v4.5h10v3H10V18l-6-6Z"/>
  </IconBaseSolid>
))
IconArrowLeftSolid.displayName = 'IconArrowLeftSolid'
