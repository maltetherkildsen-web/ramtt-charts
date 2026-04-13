// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveChevronUp = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-chevron-up" {...props}>
    <g className="chevron-body">
      <path d="M4 15L12 7L20 15" />
    </g>
  </ReactiveBase>
))
IconReactiveChevronUp.displayName = 'IconReactiveChevronUp'
