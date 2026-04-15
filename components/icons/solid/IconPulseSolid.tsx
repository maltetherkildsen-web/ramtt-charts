// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPulseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M1.25 12a.75.75 0 01.75-.75h3.44a.75.75 0 01.7.49l1.47 4.41 2.45-9.82a.75.75 0 011.43-.05l1.72 6.88 1.28-2.56a.75.75 0 01.67-.42h1.53a.75.75 0 01.67.41l.83 1.66.83-1.66a.75.75 0 01.67-.41H22a.75.75 0 010 1.5h-1.97l-1.36 2.72a.75.75 0 01-1.34 0L16 12.75h-.97l-1.72 3.43a.75.75 0 01-1.4-.09l-1.52-6.06-1.95 7.8a.75.75 0 01-1.42.1L5.32 12.75H2a.75.75 0 01-.75-.75z"/>
  </IconBaseSolid>
))
IconPulseSolid.displayName = 'IconPulseSolid'
