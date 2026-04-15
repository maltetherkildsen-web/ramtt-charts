// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMitochondriaDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <ellipse cx="12" cy="12" rx="9" ry="6" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <ellipse cx="12" cy="12" rx="9" ry="6"/>
    <path d="M6 10c2 1 2 3 0 4"/>
    <path d="M10 9c2 2 2 4 0 6"/>
    <path d="M14 9c2 2 2 4 0 6"/>
    <path d="M18 10c-2 1-2 3 0 4"/>
  </IconBaseDuo>
))
IconMitochondriaDuo.displayName = 'IconMitochondriaDuo'
