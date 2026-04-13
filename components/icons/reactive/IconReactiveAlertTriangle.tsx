// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveAlertTriangle = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-alert-triangle" {...props}>
    <g className="alert-body">
      <path d="M12 3L2 21H22L12 3Z" />
      <path d="M12 10V14" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </g>
  </ReactiveBase>
))
IconReactiveAlertTriangle.displayName = 'IconReactiveAlertTriangle'
