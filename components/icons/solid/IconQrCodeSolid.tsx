// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconQrCodeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="3" y="3" width="7" height="7" rx="1" />
    <rect fill="currentColor" x="14" y="3" width="7" height="7" rx="1" />
    <rect fill="currentColor" x="3" y="14" width="7" height="7" rx="1" />
    <path fill="currentColor" d="M14 14H17V17H14Z" />
    <path fill="currentColor" d="M20 14V17" />
    <path fill="currentColor" d="M14 20H17" />
    <path fill="currentColor" d="M20 20H20.01" />
    </IconBaseSolid>
))
IconQrCodeSolid.displayName = 'IconQrCodeSolid'
