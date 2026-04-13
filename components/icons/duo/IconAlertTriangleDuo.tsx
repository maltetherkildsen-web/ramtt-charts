// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconAlertTriangleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 2L1 22H23L12 2Z" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M12 3L2 21H22L12 3Z" />
    <path d="M12 10V14" />
    <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </IconBaseDuo>
))
IconAlertTriangleDuo.displayName = 'IconAlertTriangleDuo'
