// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconInsulinMoleculeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 3l7 4v6l-7 4-7-4V7Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 3l7 4v6l-7 4-7-4V7Z"/>
    <path d="M12 6l4 2.5v4L12 15l-4-2.5v-4Z"/>
    <circle cx="12" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>
    <line x1="12" y1="15" x2="12" y2="19"/>
    <circle cx="12" cy="20" r="1" fill="currentColor" fillOpacity={0.15}/>
  </IconBaseDuo>
))
IconInsulinMoleculeDuo.displayName = 'IconInsulinMoleculeDuo'
