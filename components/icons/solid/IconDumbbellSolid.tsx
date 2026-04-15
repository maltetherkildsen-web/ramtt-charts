// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDumbbellSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M.25 10a.75.75 0 01.75-.75h1.25V8A1.75 1.75 0 014 6.25h1A1.75 1.75 0 016.75 8v3.25h10.5V8A1.75 1.75 0 0119 6.25h1A1.75 1.75 0 0121.75 8v1.25H23a.75.75 0 010 1.5h-1.25v2.5H23a.75.75 0 010 1.5h-1.25V16A1.75 1.75 0 0120 17.75h-1A1.75 1.75 0 0117.25 16v-3.25H6.75V16A1.75 1.75 0 015 17.75H4A1.75 1.75 0 012.25 16v-1.25H1a.75.75 0 010-1.5h1.25v-2.5H1A.75.75 0 01.25 10z"/>
  </IconBaseSolid>
))
IconDumbbellSolid.displayName = 'IconDumbbellSolid'
