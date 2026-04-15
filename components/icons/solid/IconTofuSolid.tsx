// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTofuSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M6 5.25A2.75 2.75 0 003.25 8v8A2.75 2.75 0 006 18.75h12a2.75 2.75 0 002.75-2.75V8A2.75 2.75 0 0018 5.25H6zm.75 7.5v4.5h4.5v-4.5h-4.5zm6 0v4.5h4.5v-4.5h-4.5zm4.5-1.5v-4.5h-4.5v4.5h4.5zm-6-4.5v4.5h-4.5v-4.5h4.5z"/>
  </IconBaseSolid>
))
IconTofuSolid.displayName = 'IconTofuSolid'
