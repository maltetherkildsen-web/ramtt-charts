// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSodiumDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 2l8 6v8l-8 6-8-6V8l8-6Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M12 2L20 8V16L12 22L4 16V8L12 2Z" />
    <path d="M12 8L16 11V15L12 18L8 15V11L12 8Z" />
  </IconBaseDuo>
))
IconSodiumDuo.displayName = 'IconSodiumDuo'
