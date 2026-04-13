// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCreditCardSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="2" y="5" width="20" height="14" rx="2" />
    <path fill="currentColor" d="M2 10H22" />
    </IconBaseSolid>
))
IconCreditCardSolid.displayName = 'IconCreditCardSolid'
