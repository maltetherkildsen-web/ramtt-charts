// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconUndoDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M10 7a7 7 0 0 1 0 14H6v-14h4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M4 7l3-3"/>
    <path d="M4 7l3 3"/>
    <path d="M4 7h6a7 7 0 0 1 0 14H6"/>
  </IconBaseDuo>
))
IconUndoDuo.displayName = 'IconUndoDuo'
