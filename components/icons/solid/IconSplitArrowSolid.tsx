// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSplitArrowSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 21.75a.75.75 0 01-.75-.75V12.56l-6.22-6.22V9a.75.75 0 01-1.5 0V4.25a.75.75 0 01.75-.75h.47l7.25 7.25 7.25-7.25h.47a.75.75 0 01.75.75V9a.75.75 0 01-1.5 0V6.34l-6.22 6.22V21a.75.75 0 01-.75.75z"/>
  </IconBaseSolid>
))
IconSplitArrowSolid.displayName = 'IconSplitArrowSolid'
