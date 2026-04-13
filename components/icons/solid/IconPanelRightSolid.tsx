// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPanelRightSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="3" y="3" width="18" height="18" rx="2" />
    <path fill="currentColor" d="M15 3V21" />
    </IconBaseSolid>
))
IconPanelRightSolid.displayName = 'IconPanelRightSolid'
