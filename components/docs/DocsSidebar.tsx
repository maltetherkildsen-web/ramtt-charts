// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn, FONT, WEIGHT, TRANSITION, HOVER_SAND, SIDEBAR_ITEM_STYLE, SIDEBAR_ITEM_ACTIVE } from '@/lib/ui'
import { DOCS_NAV, UI_COMPONENTS, CHART_TYPES } from '@/lib/docs/navigation'
import { Badge } from '@/components/ui/Badge'

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex flex-col', className)}>
      {/* Logo area */}
      <div className="px-4 pt-5 pb-4">
        <span className={cn(FONT.body, 'text-[15px] font-[550] text-[var(--n1150)]')}>
          RAMTT
        </span>
        <div className="mt-1.5">
          <Badge variant="outline" color="default" size="sm">v0.1.0</Badge>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-2 pb-6">
        {DOCS_NAV.map((section, si) => (
          <div key={si}>
            {section.title && (
              <div className={cn(
                FONT.body,
                'text-[11px] font-[550] text-[var(--n600)]',
                'px-2 pt-6 pb-1.5',
              )}>
                {section.title}
                {section.title === 'Components' && (
                  <span className="ml-1.5 tabular-nums text-[var(--n400)]">{UI_COMPONENTS.length}</span>
                )}
                {section.title === 'Charts' && (
                  <span className="ml-1.5 tabular-nums text-[var(--n400)]">{CHART_TYPES.length}</span>
                )}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    FONT.body,
                    'block px-2 py-1.5 rounded-[6px] text-[13px]',
                    'transition-[background-color,color] duration-150',
                    isActive
                      ? 'bg-[var(--n200)] font-[550] text-[var(--n1150)]'
                      : cn('font-[400] text-[var(--n800)]', HOVER_SAND, 'hover:text-[var(--n1150)]'),
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <Badge variant="filled" color="default" size="sm" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </nav>
  )
}
