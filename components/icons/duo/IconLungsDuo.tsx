// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLungsDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 17c0 2 1 3 3 3s3-2 3-4v-6h4v6c0 2 1 4 3 4s3-1 3-3c0-4-4-7-8-7H12C8 10 4 13 4 17Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M12 4V10" />
    <path d="M12 10C8 10 4 13 4 17C4 19 5 20 7 20C9 20 10 18 10 16V10" />
    <path d="M12 10C16 10 20 13 20 17C20 19 19 20 17 20C15 20 14 18 14 16V10" />
  </IconBaseDuo>
))
IconLungsDuo.displayName = 'IconLungsDuo'
