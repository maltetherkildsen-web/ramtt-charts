// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconInstagramSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm5.5 .5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>
  </IconBaseSolid>
))
IconInstagramSolid.displayName = 'IconInstagramSolid'
