// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useState, useMemo, useEffect, type ComponentType } from 'react'
import { cn, FONT, BORDER, RADIUS } from '@/lib/ui'
import { ICON_CATALOG, ICON_CATEGORIES, type IconMeta } from '@/components/icons/catalog'
import { Input, ToggleGroup, Badge } from '@/components/ui'
import { DocSection } from '@/components/docs/DocSection'
import { DocCode } from '@/components/docs/DocCode'
import type { IconProps, IconDuoProps } from '@/components/icons/types'

// Line variant loads eagerly — it's the default view.
// Solid and duo variants lazy-load only when the user toggles to them.
import * as LineIcons from '@/components/icons/line'

type Variant = 'line' | 'solid' | 'duo'
type IconModule = Record<string, ComponentType<IconProps | IconDuoProps>>

function lookupIcon(mod: IconModule | null, name: string, variant: Variant): ComponentType<IconProps | IconDuoProps> | null {
  if (!mod) return null
  const key = variant === 'solid' ? `${name}Solid` : variant === 'duo' ? `${name}Duo` : name
  return mod[key] ?? null
}

export default function IconsPage() {
  const [search, setSearch] = useState('')
  const [variant, setVariant] = useState<Variant>('line')
  const [size, setSize] = useState(24)
  const [category, setCategory] = useState<string | null>(null)
  const [selected, setSelected] = useState<IconMeta | null>(null)
  const [solidMod, setSolidMod] = useState<IconModule | null>(null)
  const [duoMod, setDuoMod] = useState<IconModule | null>(null)

  useEffect(() => {
    if (variant === 'solid' && !solidMod) {
      import('@/components/icons/solid').then((m) => setSolidMod(m as unknown as IconModule))
    }
    if (variant === 'duo' && !duoMod) {
      import('@/components/icons/duo').then((m) => setDuoMod(m as unknown as IconModule))
    }
  }, [variant, solidMod, duoMod])

  const activeMod: IconModule | null =
    variant === 'solid' ? solidMod :
    variant === 'duo' ? duoMod :
    (LineIcons as unknown as IconModule)
  const isLoadingVariant = !activeMod

  const filtered = useMemo(() => {
    let icons = ICON_CATALOG
    if (search) {
      const q = search.toLowerCase()
      icons = icons.filter(
        (ic) => ic.name.toLowerCase().includes(q) || ic.tags.some((t) => t.includes(q))
      )
    }
    if (category) {
      icons = icons.filter((ic) => ic.category === category)
    }
    return icons
  }, [search, category])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const icon of ICON_CATALOG) {
      counts[icon.category] = (counts[icon.category] || 0) + 1
    }
    return counts
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Icons
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-2')}>
          {ICON_CATALOG.length} icons across {ICON_CATEGORIES.length} categories.
          Each icon ships in 3 variants: line (stroke), solid (fill), and duo (two-tone).
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          className="w-[200px]"
        />
        <ToggleGroup
          options={['line', 'solid', 'duo']}
          value={variant}
          onChange={(v) => setVariant(v as Variant)}
          size="sm"
        />
        <ToggleGroup
          options={['16', '20', '24', '28']}
          value={String(size)}
          onChange={(v) => setSize(Number(v))}
          size="sm"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            FONT.body, 'text-[12px] px-2 py-1 rounded-[4px]',
            'transition-[background-color,color] duration-150',
            !category
              ? 'bg-[var(--n400)] font-[550] text-[var(--n1150)]'
              : 'font-[400] text-[var(--n800)] hover:bg-[var(--n200)]',
          )}
        >
          All {ICON_CATALOG.length}
        </button>
        {ICON_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(category === cat ? null : cat)}
            className={cn(
              FONT.body, 'text-[12px] px-2 py-1 rounded-[4px]',
              'transition-[background-color,color] duration-150',
              category === cat
                ? 'bg-[var(--n400)] font-[550] text-[var(--n1150)]'
                : 'font-[400] text-[var(--n800)] hover:bg-[var(--n200)]',
            )}
          >
            {cat} {categoryCounts[cat]}
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1">
        {filtered.map((icon) => {
          const Icon = lookupIcon(activeMod, icon.name, variant)
          if (!Icon) return null
          const isSelected = selected?.name === icon.name
          return (
            <button
              key={icon.name}
              onClick={() => setSelected(isSelected ? null : icon)}
              className={cn(
                'flex flex-col items-center justify-center p-2 rounded-[6px]',
                'transition-[background-color] duration-150',
                isSelected ? 'bg-[var(--n400)]' : 'hover:bg-[var(--n200)]',
              )}
              // CSS perf hint — skip paint/layout for offscreen icons, no Tailwind equivalent
              style={{ contentVisibility: 'auto', containIntrinsicSize: '0 56px' }}
              title={icon.name.replace('Icon', '')}
            >
              <Icon size={size} color="var(--n1150)" />
            </button>
          )
        })}
      </div>

      {isLoadingVariant && (
        <p className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n600)] text-center py-8')}>
          Loading {variant} variant…
        </p>
      )}

      {!isLoadingVariant && filtered.length === 0 && (
        <p className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n600)] text-center py-8')}>
          No icons match &quot;{search}&quot;.
        </p>
      )}

      {/* Selected icon detail */}
      {selected && (
        <div className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-5')}>
          <div className="flex items-start gap-4">
            {(() => {
              const Icon = lookupIcon(activeMod, selected.name, variant)
              return Icon ? <Icon size={48} color="var(--n1150)" /> : null
            })()}
            <div className="flex-1">
              <div className={cn(FONT.body, 'text-[15px] font-[550] text-[var(--n1150)]')}>
                {selected.name.replace('Icon', '')}
              </div>
              <div className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n600)] mt-0.5')}>
                Category: {selected.category}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {selected.tags.map((t) => (
                  <Badge key={t} size="sm">{t}</Badge>
                ))}
              </div>
              <div className="mt-3">
                <DocCode>{`import { ${selected.name} } from '@ramtt/icons/${variant}'`}</DocCode>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage */}
      <DocSection title="Usage">
        <DocCode>{`// Line variant (default)
import { IconHeart } from '@ramtt/icons/line'

// Solid variant
import { IconHeartSolid } from '@ramtt/icons/solid'

// Duo-tone variant
import { IconHeartDuo } from '@ramtt/icons/duo'

// Usage
<IconHeart size={24} color="var(--n1150)" />
<IconHeartSolid size={20} color="var(--negative)" />
<IconHeartDuo size={24} primary="var(--n1150)" secondary="var(--n400)" />`}</DocCode>
      </DocSection>
    </div>
  )
}
