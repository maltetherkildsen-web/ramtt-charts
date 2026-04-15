// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import type { IconProps } from '../types'

export interface ReactiveIconProps extends IconProps {
  reactive?: boolean // Default: true. Set false to disable hover reactions.
}

export const ReactiveBase = forwardRef<SVGSVGElement, ReactiveIconProps & {
  children: ReactNode
  reactionClass: string
}>(
  ({ size = 16, color = 'currentColor', strokeWidth = 1.5, reactive = true, reactionClass, className, children, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${reactive ? `ramtt-reactive ${reactionClass}` : ''}${className ? ` ${className}` : ''}`}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  ),
)
ReactiveBase.displayName = 'ReactiveBase'
