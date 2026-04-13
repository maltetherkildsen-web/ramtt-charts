// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

export const IconEdit = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M16.5 3.5L20.5 7.5L8 20H4V16L16.5 3.5Z" />
    <path d="M14 6L18 10" />
  </IconBase>
))
IconEdit.displayName = 'IconEdit'
