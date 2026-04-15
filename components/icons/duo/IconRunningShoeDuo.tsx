// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRunningShoeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 17v-5a2 2 0 0 1 2-2h4l4 3h6v4H4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M2 17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2H2Z"/>
    <path d="M4 17v-5a2 2 0 0 1 2-2h4l4 3h6v4"/>
    <path d="M9 12h3"/>
  </IconBaseDuo>
))
IconRunningShoeDuo.displayName = 'IconRunningShoeDuo'
