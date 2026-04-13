// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveCopy = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-copy" {...props}>
    {/* Back rect — stays still */}
    <path d="M16 8V6C16 4.9 15.1 4 14 4H6C4.9 4 4 4.9 4 6V14C4 15.1 4.9 16 6 16H8" />
    {/* Front rect — lifts on hover */}
    <g className="copy-front">
      <rect x="8" y="8" width="12" height="12" rx="2" />
    </g>
  </ReactiveBase>
))
IconReactiveCopy.displayName = 'IconReactiveCopy'
