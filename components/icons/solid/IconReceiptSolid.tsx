// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconReceiptSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 2V22L7 20L10 22L12 20L14 22L17 20L20 22V2H4Z" />
    <path fill="currentColor" d="M8 7H16" />
    <path fill="currentColor" d="M8 11H16" />
    <path fill="currentColor" d="M8 15H12" />
    </IconBaseSolid>
))
IconReceiptSolid.displayName = 'IconReceiptSolid'
