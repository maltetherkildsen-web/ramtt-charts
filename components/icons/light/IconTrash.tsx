// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTrash = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 6H20" />
    <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
    <path d="M6 6L7 20C7 21 8 22 9 22H15C16 22 17 21 17 20L18 6" />
    <path d="M10 10V17" />
    <path d="M14 10V17" />
  </IconBaseLight>
))
IconTrash.displayName = 'IconTrash'
