// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconStickPackSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M9 1.25A1.75 1.75 0 007.25 3v18c0 .97.78 1.75 1.75 1.75h6c.97 0 1.75-.78 1.75-1.75V3A1.75 1.75 0 0015 1.25H9zm-.75 5.5h7.5v11.5h-7.5V6.75z"/>
  </IconBaseSolid>
))
IconStickPackSolid.displayName = 'IconStickPackSolid'
