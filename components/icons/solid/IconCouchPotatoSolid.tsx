// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCouchPotatoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="5" r="2.75"/><path d="M7 7.25A2.75 2.75 0 004.25 10v3.25H2.25a.75.75 0 00-.75.75v4A2.75 2.75 0 004.25 20.75h15.5A2.75 2.75 0 0022.5 18v-4a.75.75 0 00-.75-.75h-2V10A2.75 2.75 0 0017 7.25H7z"/>
  </IconBaseSolid>
))
IconCouchPotatoSolid.displayName = 'IconCouchPotatoSolid'
