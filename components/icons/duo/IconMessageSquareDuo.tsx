// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMessageSquareDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-6 4V6a2 2 0 0 1 2-2Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M4 4H20C21.1 4 22 4.9 22 6V16C22 17.1 21.1 18 20 18H8L2 22V6C2 4.9 2.9 4 4 4Z" />
  </IconBaseDuo>
))
IconMessageSquareDuo.displayName = 'IconMessageSquareDuo'
