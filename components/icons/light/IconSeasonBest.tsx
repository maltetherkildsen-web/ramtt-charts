// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSeasonBest = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 2v3"/><path d="M16 2v3"/><path d="M4 10h16"/><path d="M12 13l1.2 2.5 2.8.4-2 2 .5 2.8L12 19.5l-2.5 1.2.5-2.8-2-2 2.8-.4L12 13z"/>
  </IconBaseLight>
))
IconSeasonBest.displayName = 'IconSeasonBest'
