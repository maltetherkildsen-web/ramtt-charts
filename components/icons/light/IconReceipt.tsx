// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconReceipt = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 2V22L7 20L10 22L12 20L14 22L17 20L20 22V2H4Z" />
    <path d="M8 7H16" />
    <path d="M8 11H16" />
    <path d="M8 15H12" />
  </IconBaseLight>
))
IconReceipt.displayName = 'IconReceipt'
