// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import type { IconProps } from '../types'

export interface MorphIconProps extends IconProps {
  duration?: number // ms. Default: 250
}

export const MorphBase = forwardRef<SVGSVGElement, MorphIconProps & { children: ReactNode }>(
  ({ size = 16, color = 'currentColor', duration = 250, className, children, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      data-morph
      style={{
        '--morph-duration': `${duration}ms`,
      } as React.CSSProperties}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    >
      {children}
    </svg>
  ),
)
MorphBase.displayName = 'MorphBase'
