// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconChainTattoo = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M8 2c0 6 0 12 0 18"/><path d="M14 2c0 6 0 12 0 18"/><path d="M8 4h6"/><path d="M8 20h6"/><path d="M15 10c1 0 2 .5 2.5 1.5s.5 2-.5 2.5-2 .5-2.5-.5-.5-2 .5-2.5c.3-.2.6-.4 1-.5"/><path d="M15 13c1 0 2 .5 2.5 1.5s.5 2-.5 2.5-2 .5-2.5-.5"/>
  </IconBaseLight>
))
IconChainTattoo.displayName = 'IconChainTattoo'
