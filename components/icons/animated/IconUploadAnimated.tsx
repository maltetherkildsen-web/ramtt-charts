// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconUploadAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-upload { 0% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(-6px); opacity: 0; } 51% { transform: translateY(6px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .ramtt-upload-arrow { animation: none !important; } }
    `}</style>
    <g className="ramtt-upload-arrow" style={{ animation: 'ramtt-upload 1.5s ease infinite', transformOrigin: '12px 9px' }}>
      <path d="M12 15V4" />
      <path d="M8 8L12 4L16 8" />
    </g>
    <path d="M4 17V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V17" />
  </IconBase>
))
IconUploadAnimated.displayName = 'IconUploadAnimated'
