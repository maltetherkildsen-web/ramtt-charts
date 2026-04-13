// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLungsDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M12 4V10" />
    <path d="M12 10C8 10 4 13 4 17C4 19 5 20 7 20C9 20 10 18 10 16V10" />
    <path d="M12 10C16 10 20 13 20 17C20 19 19 20 17 20C15 20 14 18 14 16V10" />
    </IconBaseDuo>
))
IconLungsDuo.displayName = 'IconLungsDuo'
