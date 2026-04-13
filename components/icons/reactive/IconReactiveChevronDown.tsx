// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveChevronDown = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-chevron-down" {...props}>
    <g className="chevron-body">
      <path d="M4 9L12 17L20 9" />
    </g>
  </ReactiveBase>
))
IconReactiveChevronDown.displayName = 'IconReactiveChevronDown'
