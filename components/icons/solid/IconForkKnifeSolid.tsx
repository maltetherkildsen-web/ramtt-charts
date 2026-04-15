// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconForkKnifeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M3 1.25a.75.75 0 01.75.75v8A2.25 2.25 0 006 12.25h.25v9a.75.75 0 001.5 0v-9H8A2.25 2.25 0 0010.25 10V2a.75.75 0 00-1.5 0v5a.75.75 0 01-1.5 0V2a.75.75 0 00-1.5 0v5a.75.75 0 01-1.5 0V2A.75.75 0 003 1.25zm13.25.75a.75.75 0 011.5 0v6a2.25 2.25 0 002.25 2.25.75.75 0 010 1.5h-.25v10a.75.75 0 01-1.5 0V11.75H18A2.25 2.25 0 0115.75 9.5V2a.75.75 0 01.75-.75h.75z"/>
  </IconBaseSolid>
))
IconForkKnifeSolid.displayName = 'IconForkKnifeSolid'
