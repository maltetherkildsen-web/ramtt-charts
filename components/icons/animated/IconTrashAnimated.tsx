// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase } from '../IconBase'
import type { IconProps } from '../types'

export const IconTrashAnimated = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <style>{`
      @keyframes ramtt-trash-lid { 0% { transform: rotate(0) translateY(0); } 30% { transform: rotate(-15deg) translateY(-2px); } 70% { transform: rotate(-15deg) translateY(-2px); } 100% { transform: rotate(0) translateY(0); } }
      @media (prefers-reduced-motion: reduce) { .ramtt-trash-lid { animation: none !important; } }
    `}</style>
    <g className="ramtt-trash-lid" style={{ animation: 'ramtt-trash-lid 1s ease-out', transformOrigin: '4px 6px' }}>
      <path d="M4 6h16" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </g>
    <path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
    <path d="M10 10v7" />
    <path d="M14 10v7" />
  </IconBase>
))
IconTrashAnimated.displayName = 'IconTrashAnimated'
