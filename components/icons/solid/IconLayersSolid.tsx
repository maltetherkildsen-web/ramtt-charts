// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLayersSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M11.58 1.37a.75.75 0 01.84 0l10 6a.75.75 0 010 1.26l-10 6a.75.75 0 01-.84 0l-10-6a.75.75 0 010-1.26l10-6z"/><path d="M1.58 11.37a.75.75 0 01.84-.12L12 16.19l9.58-4.94a.75.75 0 01.84 1.12l-10 5.5a.75.75 0 01-.84 0l-10-5.5a.75.75 0 010-1.12z"/><path d="M1.58 16.37a.75.75 0 01.84-.12L12 21.19l9.58-4.94a.75.75 0 01.84 1.12l-10 5.5a.75.75 0 01-.84 0l-10-5.5a.75.75 0 010-1.12z"/>
  </IconBaseSolid>
))
IconLayersSolid.displayName = 'IconLayersSolid'
