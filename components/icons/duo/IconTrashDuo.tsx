// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTrashDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M4 6H20" />
    <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
    <path d="M6 6L7 20C7 21 8 22 9 22H15C16 22 17 21 17 20L18 6" />
    <path d="M10 10V17" />
    <path d="M14 10V17" />
    </IconBaseDuo>
))
IconTrashDuo.displayName = 'IconTrashDuo'
