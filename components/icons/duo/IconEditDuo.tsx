// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconEditDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M16.5 3.5L20.5 7.5 8 20H4v-4L16.5 3.5Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M16.5 3.5L20.5 7.5L8 20H4V16L16.5 3.5Z" />
    <path d="M14 6L18 10" />
  </IconBaseDuo>
))
IconEditDuo.displayName = 'IconEditDuo'
