// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveDumbbell = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-dumbbell" {...props}>
    <g className="dumbbell-body">
      <path d="M6 7v10"/><path d="M18 7v10"/><path d="M6 12h12"/><rect x="3" y="8" width="3" height="8" rx="1"/><rect x="18" y="8" width="3" height="8" rx="1"/><path d="M1 10v4"/><path d="M23 10v4"/>
    </g>
  </ReactiveBase>
))
IconReactiveDumbbell.displayName = 'IconReactiveDumbbell'
