// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconForkKnife = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M3 2v8a3 3 0 003 3h1v9"/><path d="M7 2v8a3 3 0 01-3 3"/><path d="M5 2v5"/><path d="M17 2v6a3 3 0 003 3h0v0"/><path d="M20 2v20"/><path d="M17 8h3"/>
  </IconBaseLight>
))
IconForkKnife.displayName = 'IconForkKnife'
