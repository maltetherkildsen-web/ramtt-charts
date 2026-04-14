// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLungsDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 17c0-4 4-7 8-7s8 3 8 7c0 2-1 3-3 3s-3-2-3-4v-6h-4v6c0 2-1 4-3 4s-3-1-3-3Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 4v6"/>
    <path d="M12 10C8 10 4 13 4 17c0 2 1 3 3 3s3-2 3-4v-6"/>
    <path d="M12 10c4 0 8 3 8 7 0 2-1 3-3 3s-3-2-3-4v-6"/>
  </IconBaseDuo>
))
IconLungsDuo.displayName = 'IconLungsDuo'
