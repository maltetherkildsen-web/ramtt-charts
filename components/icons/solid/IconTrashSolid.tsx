// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrashSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="5" width="18" height="2" rx="1"/>
    <path d="M8 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/>
    <path fillRule="evenodd" d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13H6Zm3.25 2.75a.75.75 0 0 1 1.5 0v7.5a.75.75 0 0 1-1.5 0v-7.5Zm4 0a.75.75 0 0 1 1.5 0v7.5a.75.75 0 0 1-1.5 0v-7.5Z"/>
  </IconBaseSolid>
))
IconTrashSolid.displayName = 'IconTrashSolid'
