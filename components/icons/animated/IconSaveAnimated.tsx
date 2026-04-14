// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconSaveAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-save-check { from { stroke-dashoffset: 14; } to { stroke-dashoffset: 0; } }
      @media (prefers-reduced-motion: reduce) { .ramtt-save-check { animation: none !important; stroke-dashoffset: 0; } }
    `}</style>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
    <path d="M17 21v-8H7v8" />
    <path className="ramtt-save-check" d="M9 15l2 2 4-4" strokeDasharray={14} strokeDashoffset={14} style={{ animation: 'ramtt-save-check 0.4s ease-out 0.3s forwards' }} />
  </IconBase>
))
IconSaveAnimated.displayName = 'IconSaveAnimated'
