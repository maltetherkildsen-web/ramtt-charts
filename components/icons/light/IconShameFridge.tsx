// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconShameFridge = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14"/><path d="M16 6v2"/><path d="M16 13v4"/><path d="M11 5l1 1 1-1" opacity="0.4"/><path d="M11 7l1 1 1-1" opacity="0.4"/>
  </IconBaseLight>
))
IconShameFridge.displayName = 'IconShameFridge'
