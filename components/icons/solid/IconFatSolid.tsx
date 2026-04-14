// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFatSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 2.69S5 10.69 5 15a7 7 0 0 0 14 0c0-4.31-7-12.31-7-12.31Z"/>
  </IconBaseSolid>
))
IconFatSolid.displayName = 'IconFatSolid'
