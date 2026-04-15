// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCadenceOptimalSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 00-8.49 14.5.75.75 0 001.3-.75A8.25 8.25 0 1120.19 16a.75.75 0 001.3.75A9.75 9.75 0 0012 2.25zm0 5a.75.75 0 01.75.75v3.19a2.25 2.25 0 11-1.5 0V8a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconCadenceOptimalSolid.displayName = 'IconCadenceOptimalSolid'
