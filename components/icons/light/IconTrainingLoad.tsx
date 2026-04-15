// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTrainingLoad = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M12 4v16"/>
    <ellipse cx="12" cy="8" rx="5" ry="1.5"/>
    <ellipse cx="12" cy="13" rx="6" ry="2"/>
    <ellipse cx="12" cy="18" rx="7" ry="2"/>
  </IconBaseLight>
))
IconTrainingLoad.displayName = 'IconTrainingLoad'
