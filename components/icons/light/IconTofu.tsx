// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTofu = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 12h16"/><path d="M12 6v12"/><circle cx="8" cy="9" r="0.5" fill="currentColor" stroke="none" opacity="0.4"/><circle cx="16" cy="15" r="0.5" fill="currentColor" stroke="none" opacity="0.4"/>
  </IconBaseLight>
))
IconTofu.displayName = 'IconTofu'
