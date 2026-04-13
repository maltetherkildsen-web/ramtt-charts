// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconThresholdDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="2" y="2" width="20" height="20" rx="4" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M3 14H7" strokeDasharray="2 2" />
    <path d="M11 14H15" strokeDasharray="2 2" />
    <path d="M19 14H21" strokeDasharray="2 2" />
    <path d="M12 20V14" />
    <path d="M9 17L12 14L15 17" />
    <path d="M12 14V6" />
    <path d="M9 9L12 6L15 9" />
    </IconBaseDuo>
))
IconThresholdDuo.displayName = 'IconThresholdDuo'
