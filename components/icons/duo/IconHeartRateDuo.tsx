// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconHeartRateDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 6C10 3 6 2.5 4 5s-1.5 6 8 14c9.5-8 9.5-11.5 8-14S14 3 12 6Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 6C10 3 6 2.5 4 5s-1.5 6 8 14c9.5-8 9.5-11.5 8-14S14 3 12 6Z"/>
    <path d="M5 12h3.5l1.5-3 2 6 1.5-3H19"/>
  </IconBaseDuo>
))
IconHeartRateDuo.displayName = 'IconHeartRateDuo'
