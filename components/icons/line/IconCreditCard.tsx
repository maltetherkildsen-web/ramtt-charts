// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconCreditCard = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10H22" />
  </IconBase>
))
IconCreditCard.displayName = 'IconCreditCard'
