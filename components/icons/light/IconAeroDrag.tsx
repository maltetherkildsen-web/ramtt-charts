// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconAeroDrag = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M8 12c0-4 4-8 8-8 0 4-2 8-8 8z"/><path d="M8 12c0 4 4 8 8 8 0-4-2-8-8-8z"/><path d="M2 9h4"/><path d="M2 12h5"/><path d="M2 15h4"/>
  </IconBaseLight>
))
IconAeroDrag.displayName = 'IconAeroDrag'
