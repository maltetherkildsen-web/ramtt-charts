// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSodium = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2L20 8V16L12 22L4 16V8L12 2Z" />
    <path d="M12 8L16 11V15L12 18L8 15V11L12 8Z" />
  </IconBase>
))
IconSodium.displayName = 'IconSodium'
