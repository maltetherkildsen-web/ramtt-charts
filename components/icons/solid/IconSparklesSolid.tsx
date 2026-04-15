// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSparklesSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12.38 1.15a.75.75 0 00-1.41.35l.88 4.22-4.22.88a.75.75 0 00.16 1.48l.19-.04 4.22-.88.88 4.22a.75.75 0 001.48-.31l-.88-4.22 4.22-.88a.75.75 0 00-.35-1.46l-4.22.88-.88-4.22-.07-.02z"/><path d="M5 15.25a.75.75 0 01.71.53l.54 1.72 1.72.54a.75.75 0 010 1.42l-1.72.54-.54 1.72a.75.75 0 01-1.42 0l-.54-1.72L2.03 19.46a.75.75 0 010-1.42l1.72-.54.54-1.72a.75.75 0 01.71-.53zM19 13.25a.75.75 0 01.71.53l.29.97.97.29a.75.75 0 010 1.42l-.97.29-.29.97a.75.75 0 01-1.42 0l-.29-.97-.97-.29a.75.75 0 010-1.42l.97-.29.29-.97a.75.75 0 01.71-.53z"/>
  </IconBaseSolid>
))
IconSparklesSolid.displayName = 'IconSparklesSolid'
