// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveExpand = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-expand" {...props}>
    <g className="expand-body">
      <path d="M14 4H20V10" />
      <path d="M20 4L13 11" />
      <path d="M10 20H4V14" />
      <path d="M4 20L11 13" />
    </g>
  </ReactiveBase>
))
IconReactiveExpand.displayName = 'IconReactiveExpand'
