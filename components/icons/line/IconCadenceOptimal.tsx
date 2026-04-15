// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconCadenceOptimal = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 18a9 9 0 1116 0"/><path d="M8.5 16.5a5 5 0 017 0" strokeWidth="2.5" opacity="0.3"/><path d="M12 12V8"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconCadenceOptimal.displayName = 'IconCadenceOptimal'
