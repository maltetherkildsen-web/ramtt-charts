// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMessageCircleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M21 12c0 4.4-4 8-9 8-1.4 0-2.7-.3-3.9-.8L3 21l1.8-5C3.7 14.5 3 12.8 3 11c0-4.4 4-8 9-8s9 3.6 9 8v1Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M21 12C21 16.4 17 20 12 20C10.6 20 9.3 19.7 8.1 19.2L3 21L4.8 16C3.7 14.5 3 12.8 3 11C3 6.6 7 3 12 3C17 3 21 6.6 21 11V12Z" />
  </IconBaseDuo>
))
IconMessageCircleDuo.displayName = 'IconMessageCircleDuo'
