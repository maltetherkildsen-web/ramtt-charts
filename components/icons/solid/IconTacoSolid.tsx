// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTacoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 3.25c-5 0-9.75 6-9.75 12.75 0 2.5 4.25 4.75 9.75 4.75s9.75-2.25 9.75-4.75C21.75 9.25 17 3.25 12 3.25z" fill="currentColor"/><circle cx="8" cy="14" r="1.25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/><circle cx="12" cy="12" r="1.75" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/><circle cx="16" cy="14" r="1.25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
  </IconBaseSolid>
))
IconTacoSolid.displayName = 'IconTacoSolid'
