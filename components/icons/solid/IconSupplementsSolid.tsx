// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSupplementsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4h8a4 4 0 0 0 4-4 4 4 0 0 0-4-4H8Zm3.25 0v8h1.5V8h-1.5Z"/>
  </IconBaseSolid>
))
IconSupplementsSolid.displayName = 'IconSupplementsSolid'
