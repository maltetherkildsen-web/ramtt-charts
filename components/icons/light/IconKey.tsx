// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconKey = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="8" cy="8" r="3.5"/><path d="M11 11l9.5 9.5"/><path d="M16.5 15v3.5"/><path d="M14 17.5h3"/>
  </IconBaseLight>
))
IconKey.displayName = 'IconKey'
