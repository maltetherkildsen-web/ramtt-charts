// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSleepScore = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z"/><path d="M3 14h3v6H3z"/><path d="M7.5 12h3v8h-3z"/><path d="M12 16h3v4h-3z"/><path d="M16.5 10h3v10h-3z"/>
  </IconBaseLight>
))
IconSleepScore.displayName = 'IconSleepScore'
