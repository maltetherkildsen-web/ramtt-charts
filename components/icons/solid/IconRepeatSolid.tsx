// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRepeatSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M17.53 1.47a.75.75 0 00-1.06 1.06L19.94 6l-3.47 3.47a.75.75 0 001.06 1.06l4-4a.75.75 0 000-1.06l-4-4zM7 4.25A4.75 4.75 0 002.25 9v2a.75.75 0 001.5 0V9A3.25 3.25 0 017 5.75h14a.75.75 0 000-1.5H7zM6.47 13.47a.75.75 0 011.06 0l.53.53-.53.53-4 4a.75.75 0 01-1.06 0l.53-.53-.53.53v-.01l4-4a.75.75 0 010-1.06zm.53 2.12L4.06 18l2.94 2.94V15.59zM17 18.25a3.25 3.25 0 003.25-3.25v-2a.75.75 0 011.5 0v2A4.75 4.75 0 0117 19.75H3a.75.75 0 010-1.5h14z"/>
  </IconBaseSolid>
))
IconRepeatSolid.displayName = 'IconRepeatSolid'
