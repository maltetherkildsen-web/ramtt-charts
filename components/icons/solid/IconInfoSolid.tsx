// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconInfoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-1 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0v-5Zm1-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
  </IconBaseSolid>
))
IconInfoSolid.displayName = 'IconInfoSolid'
