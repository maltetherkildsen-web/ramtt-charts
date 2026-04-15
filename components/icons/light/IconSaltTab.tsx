// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSaltTab = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="7" y="3" width="10" height="18" rx="5"/><path d="M7 12h10"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" opacity="0.4"/><circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" opacity="0.4"/>
  </IconBaseLight>
))
IconSaltTab.displayName = 'IconSaltTab'
