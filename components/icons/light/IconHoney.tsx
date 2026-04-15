// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconHoney = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M6 10h12v8a3 3 0 01-3 3H9a3 3 0 01-3-3v-8z"/><path d="M6 10c0-2 2.5-4 6-4s6 2 6 4"/><path d="M4 10h16"/><path d="M12 6V3"/><path d="M10 3.5h4"/>
  </IconBaseLight>
))
IconHoney.displayName = 'IconHoney'
