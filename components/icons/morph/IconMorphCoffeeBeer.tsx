// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphCoffeeBeerProps extends MorphIconProps {
  state: 'coffee' | 'beer'
}

// Coffee ↔ Beer — morning to evening, opacity crossfade
export const IconMorphCoffeeBeer = forwardRef<SVGSVGElement, IconMorphCoffeeBeerProps>(
  ({ state, ...props }, ref) => {
    const transition = 'opacity var(--morph-duration) ease, transform var(--morph-duration) ease'
    const isCoffee = state === 'coffee'
    return (
      <MorphBase ref={ref} {...props}>
        <g style={{ opacity: isCoffee ? 1 : 0, transform: isCoffee ? 'scale(1)' : 'scale(0.85)', transformOrigin: 'center', transition }}>
          <path d="M4 6h12v7a4 4 0 01-4 4H8a4 4 0 01-4-4V6z" />
          <path d="M16 9h2a2 2 0 010 4h-2" />
          <path d="M6 1v2" />
          <path d="M10 1v2" />
          <path d="M14 1v2" />
          <path d="M2 20h16" />
        </g>
        <g style={{ opacity: isCoffee ? 0 : 1, transform: isCoffee ? 'scale(0.85)' : 'scale(1)', transformOrigin: 'center', transition }}>
          <path d="M7 4h10l-1 16H8L7 4z" />
          <path d="M7 4c0-1 1.5-2 5-2s5 1 5 2" />
          <path d="M7 8h10" />
          <path d="M9.5 8c0-1.5 1-2.5 2.5-2.5s2.5 1 2.5 2.5" />
        </g>
      </MorphBase>
    )
  },
)
IconMorphCoffeeBeer.displayName = 'IconMorphCoffeeBeer'
