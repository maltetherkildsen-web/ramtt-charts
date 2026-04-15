// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconLeafyGreens = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 22v-10"/><path d="M12 12c-4 0-7-3-7-7 3 0 6 2 7 5"/><path d="M12 14c4 0 7-3 7-7-3 0-6 2-7 5"/><path d="M12 10c-2.5-.5-4-2-4.5-4" opacity="0.4"/><path d="M12 12c2.5-.5 4-2 4.5-4" opacity="0.4"/>
  </IconBaseLight>
))
IconLeafyGreens.displayName = 'IconLeafyGreens'
