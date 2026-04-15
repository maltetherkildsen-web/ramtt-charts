// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDraftingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="7" cy="10" r="2.75"/><path d="M4.25 14a2.75 2.75 0 015.5 0 .75.75 0 01-1.5 0 1.25 1.25 0 00-2.5 0 .75.75 0 01-1.5 0z"/><circle cx="15" cy="10" r="2.75"/><path d="M12.25 14a2.75 2.75 0 015.5 0 .75.75 0 01-1.5 0 1.25 1.25 0 00-2.5 0 .75.75 0 01-1.5 0z"/><path d="M19 7.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm0 3a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm0 3a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2z"/>
  </IconBaseSolid>
))
IconDraftingSolid.displayName = 'IconDraftingSolid'
