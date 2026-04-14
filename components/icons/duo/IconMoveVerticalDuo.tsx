// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMoveVerticalDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="8" y="2" width="8" height="20" rx="3" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 2v20"/>
    <path d="M8 5l4-3 4 3"/>
    <path d="M8 19l4 3 4-3"/>
  </IconBaseDuo>
))
IconMoveVerticalDuo.displayName = 'IconMoveVerticalDuo'
