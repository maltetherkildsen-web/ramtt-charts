// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconVolumeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M11 5L6 9H2v6h4l5 4V5Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M11 5L6 9H2V15H6L11 19V5Z" />
    <path d="M15.5 8.5C16.7 9.7 17.5 11.3 17.5 13C17.5 14.7 16.7 16.3 15.5 17.5" />
    <path d="M19 5C21.2 7.2 22.5 10.2 22.5 13C22.5 15.8 21.2 18.8 19 21" />
  </IconBaseDuo>
))
IconVolumeDuo.displayName = 'IconVolumeDuo'
