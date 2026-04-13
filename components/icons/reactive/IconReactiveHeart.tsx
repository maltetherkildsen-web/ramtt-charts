// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { ReactiveBase, type ReactiveIconProps } from './ReactiveBase'

export const IconReactiveHeart = forwardRef<SVGSVGElement, ReactiveIconProps>((props, ref) => (
  <ReactiveBase ref={ref} reactionClass="ramtt-reactive-heart" {...props}>
    <g className="heart-body">
      <path d="M20.8 4.6C20.1 3.9 19.2 3.4 18.2 3.1C17.2 2.8 16.1 2.9 15.2 3.2C14.2 3.5 13.4 4.1 12.8 4.8L12 5.7L11.2 4.8C10.6 4.1 9.8 3.5 8.8 3.2C7.9 2.9 6.8 2.8 5.8 3.1C4.8 3.4 3.9 3.9 3.2 4.6C1.6 6.2 1.5 8.8 3 10.5L12 20L21 10.5C22.5 8.8 22.4 6.2 20.8 4.6Z" />
    </g>
  </ReactiveBase>
))
IconReactiveHeart.displayName = 'IconReactiveHeart'
