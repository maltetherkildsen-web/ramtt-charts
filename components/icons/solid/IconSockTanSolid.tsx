// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSockTanSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 2h8v11.25H8V2z" fill="currentColor"/><path d="M8 13.25h8V19c0 1.1-.45 2-1.25 2.6-.6.45-1.35.65-2.25.65h-1c-.9 0-1.65-.2-2.25-.65-.8-.6-1.25-1.5-1.25-2.6v-5.75z" fill="currentColor" opacity="0.3"/>
  </IconBaseSolid>
))
IconSockTanSolid.displayName = 'IconSockTanSolid'
