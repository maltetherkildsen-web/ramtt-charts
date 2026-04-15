// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCarrot = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 22L8 8c2-1 4-1 8 0l-4 14z"/><path d="M10 6c-1-2 0-4 2-5"/><path d="M14 6c1-2 0-4-2-5"/><path d="M12 6c0-2 1-4 2-5"/><path d="M9 12h6" opacity="0.3"/><path d="M9.5 15h5" opacity="0.3"/>
  </IconBaseLight>
))
IconCarrot.displayName = 'IconCarrot'
