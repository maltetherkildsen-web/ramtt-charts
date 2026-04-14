// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCloudDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M18 10h-1.26A6 6 0 0 0 5 11a4 4 0 0 0-3 3 3 3 0 0 0 3 3h13a4 4 0 0 0 0-8v1Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M18 10H16.7A6 6 0 0 0 5 11C3.3 11 2 12.3 2 14C2 15.7 3.3 17 5 17H18C20.2 17 22 15.2 22 13C22 10.8 20.2 9 18 9Z" />
  </IconBaseDuo>
))
IconCloudDuo.displayName = 'IconCloudDuo'
