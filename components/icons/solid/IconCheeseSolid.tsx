// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCheeseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M2 18l10-14 10 14H2z" fill="currentColor"/><circle cx="9" cy="15" r="1.75" fill="white" opacity="0.4"/><circle cx="15" cy="16" r="1.25" fill="white" opacity="0.4"/><circle cx="12" cy="12" r="1" fill="white" opacity="0.4"/>
  </IconBaseSolid>
))
IconCheeseSolid.displayName = 'IconCheeseSolid'
