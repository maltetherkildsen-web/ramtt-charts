// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconDownloadAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-download { 0% { transform: translateY(-6px); opacity: 0; } 30% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(2px); } 70% { transform: translateY(0); } 100% { transform: translateY(0); opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .ramtt-dl-arrow { animation: none !important; } }
    `}</style>
    <g className="ramtt-dl-arrow" style={{ animation: 'ramtt-download 1.2s ease infinite', transformOrigin: '12px 12px' }}>
      <path d="M12 4v11" />
      <path d="M8 11l4 4 4-4" />
    </g>
    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
  </IconBase>
))
IconDownloadAnimated.displayName = 'IconDownloadAnimated'
