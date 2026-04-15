// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTaperSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2.25 6a.75.75 0 011.5 0v1.25H7a.75.75 0 01.75.75v1.25H10.5a.75.75 0 01.75.75v1.25h3a.75.75 0 01.75.75v1.25H16a.75.75 0 01.75.75V20a.75.75 0 01-1.5 0v-5.25h-2.5a.75.75 0 01-.75-.75v-1.25h-3a.75.75 0 01-.75-.75V10.75H7a.75.75 0 01-.75-.75V8.75H3.75V20a.75.75 0 01-1.5 0V6z"/><path d="M18.25 10a.75.75 0 01.75-.75h.19l2.56 1.72a.75.75 0 010 1.21l-2.56 1.72H19a.75.75 0 01-.75-.75V10z"/>
  </IconBaseSolid>
))
IconTaperSolid.displayName = 'IconTaperSolid'
