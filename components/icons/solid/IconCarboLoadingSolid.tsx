// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCarboLoadingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M7 3.25A2.75 2.75 0 004.25 6v12A2.75 2.75 0 007 20.75h10a2.75 2.75 0 002.75-2.75V6A2.75 2.75 0 0017 3.25H7zm.5 10a1.25 1.25 0 011.25 1.25v2.5a1.25 1.25 0 01-1.25 1.25h-.5c-.69 0-1.25-.56-1.25-1.25v-2.5c0-.69.56-1.25 1.25-1.25h.5zM10.25 11c0-.69.56-1.25 1.25-1.25h.5c.69 0 1.25.56 1.25 1.25v6c0 .69-.56 1.25-1.25 1.25h-.5c-.69 0-1.25-.56-1.25-1.25v-6zm4.25-3.75c-.69 0-1.25.56-1.25 1.25v8.5c0 .69.56 1.25 1.25 1.25h.5c.69 0 1.25-.56 1.25-1.25V8.5c0-.69-.56-1.25-1.25-1.25h-.5z"/>
  </IconBaseSolid>
))
IconCarboLoadingSolid.displayName = 'IconCarboLoadingSolid'
