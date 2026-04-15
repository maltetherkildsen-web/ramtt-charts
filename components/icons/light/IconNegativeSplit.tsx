// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconNegativeSplit = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M3 20V8h3v12"/><path d="M8 20v-9h3v9"/><path d="M13 20v-6h3v6"/><path d="M18 20v-3h3v3"/><path d="M2 6l20 10" strokeDasharray="2 2" opacity="0.4"/>
  </IconBaseLight>
))
IconNegativeSplit.displayName = 'IconNegativeSplit'
