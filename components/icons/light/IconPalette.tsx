// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPalette = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 2a10 10 0 00-1 19.95c1.1.1 1.7-.72 1.7-1.45 0-.35-.15-.7-.42-.98-.55-.55-.85-1.15-.85-1.77A2.25 2.25 0 0113.68 15.5H16a6 6 0 006-5.5A10 10 0 0012 2z"/><circle cx="7.5" cy="11" r="1.25" fill="currentColor" stroke="none"/><circle cx="10" cy="7.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="15" cy="7.5" r="1.25" fill="currentColor" stroke="none"/><circle cx="17.5" cy="11" r="1.25" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconPalette.displayName = 'IconPalette'
