// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconWallet = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M16 14h2"/>
  </IconBaseLight>
))
IconWallet.displayName = 'IconWallet'
