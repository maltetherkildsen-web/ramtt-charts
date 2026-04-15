// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMitochondriaSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    {/* Outer membrane filled with cristae cutouts */}
    <path fillRule="evenodd" d="M12 6c4.97 0 9 2.69 9 6s-4.03 6-9 6-9-2.69-9-6 4.03-6 9-6ZM6 10c2 1 2 3 0 4m4-5c2 2 2 4 0 6m4-6c2 2 2 4 0 6m4-5c-2 1-2 3 0 4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </IconBaseSolid>
))
IconMitochondriaSolid.displayName = 'IconMitochondriaSolid'
