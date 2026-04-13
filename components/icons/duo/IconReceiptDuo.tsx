// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconReceiptDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="3" width="18" height="18" rx="3" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <path d="M4 2V22L7 20L10 22L12 20L14 22L17 20L20 22V2H4Z" />
    <path d="M8 7H16" />
    <path d="M8 11H16" />
    <path d="M8 15H12" />
    </IconBaseDuo>
))
IconReceiptDuo.displayName = 'IconReceiptDuo'
