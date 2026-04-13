// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveTrash = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-trash" {...props}>
    <g className="trash-lid">
      <path d="M4 6H20" />
      <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
    </g>
    <g className="trash-body">
      <path d="M6 6L7 20C7 21 8 22 9 22H15C16 22 17 21 17 20L18 6" />
      <path d="M10 10V17" />
      <path d="M14 10V17" />
    </g>
  </ReactiveBase>
))
IconReactiveTrash.displayName = 'IconReactiveTrash'
