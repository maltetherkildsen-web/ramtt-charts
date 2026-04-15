// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSaltTabSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 2.25A5.75 5.75 0 006.25 8v8a5.75 5.75 0 0011.5 0V8A5.75 5.75 0 0012 2.25zm0 4.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm-4.25 5h8.5v4.25a4.25 4.25 0 11-8.5 0v-4.25z"/>
  </IconBaseSolid>
))
IconSaltTabSolid.displayName = 'IconSaltTabSolid'
