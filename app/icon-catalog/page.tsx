'use client'

import { useState, useEffect, useRef, useMemo, useCallback, type ReactNode, type ComponentType } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, HOVER_SAND, ACTIVE_SAND } from '@/lib/ui'
import { ICON_CATALOG, ICON_CATEGORIES, type IconMeta } from '@/components/icons/catalog'
import type { IconProps, IconDuoProps } from '@/components/icons/types'
import { Input, InputGroup, ToggleGroup, SectionHeader, Tag, Button, EmptyState, Badge, ToastProvider, useToast } from '@/components/ui'
import { IconSearch } from '@/components/icons/line/IconSearch'

// ─── Dynamic Icon Maps ───

import * as LineIcons from '@/components/icons/line'
import * as SolidIcons from '@/components/icons/solid'
import * as DuoIcons from '@/components/icons/duo'
import * as AnimatedIcons from '@/components/icons/animated'

type Variant = 'line' | 'solid' | 'duo'

function getIcon(name: string, variant: Variant): ComponentType<IconProps | IconDuoProps> | null {
  if (variant === 'solid') {
    const key = `${name}Solid` as keyof typeof SolidIcons
    return (SolidIcons[key] as ComponentType<IconProps>) ?? null
  }
  if (variant === 'duo') {
    const key = `${name}Duo` as keyof typeof DuoIcons
    return (DuoIcons[key] as ComponentType<IconDuoProps>) ?? null
  }
  const key = name as keyof typeof LineIcons
  return (LineIcons[key] as ComponentType<IconProps>) ?? null
}

function getAnimated(name: string): ComponentType<IconProps> | null {
  const ANIMATED_MAP: Record<string, keyof typeof AnimatedIcons> = {
    IconCheck: 'IconCheckAnimated',
    IconUpload: 'IconUploadAnimated',
    IconHeartRate: 'IconPulseHeart',
    IconRefresh: 'IconSyncRotate',
  }
  const key = ANIMATED_MAP[name]
  if (!key) return null
  return (AnimatedIcons[key] as ComponentType<IconProps>) ?? null
}

// ─── Animated icons standalone list ───

const ANIMATED_LIST = [
  { name: 'IconSpinnerRAMTT', component: AnimatedIcons.IconSpinnerRAMTT },
  { name: 'IconLoadingDots', component: AnimatedIcons.IconLoadingDots },
  { name: 'IconCheckAnimated', component: AnimatedIcons.IconCheckAnimated },
  { name: 'IconUploadAnimated', component: AnimatedIcons.IconUploadAnimated },
  { name: 'IconPulseHeart', component: AnimatedIcons.IconPulseHeart },
  { name: 'IconSyncRotate', component: AnimatedIcons.IconSyncRotate },
  { name: 'IconTypingDots', component: AnimatedIcons.IconTypingDots },
  { name: 'IconWaveform', component: AnimatedIcons.IconWaveform },
]

// ─── Color Options ───

const COLORS = [
  { value: 'var(--n1150)', label: 'Default' },
  { value: 'var(--n800)', label: 'Secondary' },
  { value: 'var(--n600)', label: 'Muted' },
  { value: 'var(--positive)', label: 'Positive' },
  { value: 'var(--negative)', label: 'Negative' },
]

// ─── Category counts ───

function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const icon of ICON_CATALOG) {
    counts[icon.category] = (counts[icon.category] || 0) + 1
  }
  return counts
}

// ─── Icon Cell ───

function IconCell({
  meta,
  variant,
  size,
  color,
  selected,
  onClick,
}: {
  meta: IconMeta
  variant: Variant
  size: number
  color: string
  selected: boolean
  onClick: () => void
}) {
  const Comp = getIcon(meta.name, variant)
  if (!Comp) return null

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-1.5',
        'border-[0.5px] rounded-[8px]',
        TRANSITION.background,
        selected
          ? 'bg-[var(--n200)] border-[var(--n400)]'
          : 'bg-[var(--n50)] border-[var(--n200)] hover:bg-[var(--n200)] hover:border-[var(--n400)]',
      )}
      style={{ height: 88 }}
    >
      <Comp size={size} color={color} />
      <span className={cn(FONT.body, 'text-[10px] font-[400] text-[var(--n600)] max-w-[76px] truncate')}>
        {meta.name.replace('Icon', '')}
      </span>
    </button>
  )
}

// ─── Detail Panel ───

function DetailPanel({
  meta,
  color,
  onClose,
}: {
  meta: IconMeta
  color: string
  onClose: () => void
}) {
  const toast = useToast()

  const Line = getIcon(meta.name, 'line')
  const Solid = getIcon(meta.name, 'solid')
  const Duo = getIcon(meta.name, 'duo')

  function copyText(text: string, label: string) {
    navigator.clipboard.writeText(text)
    toast({ message: `${label} copied`, variant: 'success', duration: 2000 })
  }

  const importStr = `import { ${meta.name} } from '@ramtt/icons'`
  const jsxStr = `<${meta.name} size={20} />`

  return (
    <div className={cn(
      'col-span-full',
      'border-[0.5px] border-[var(--n400)] rounded-[12px] bg-white p-5',
      'flex gap-6 items-start',
      'mb-2',
    )}>
      {/* Large preview */}
      <div className={cn(
        'shrink-0 flex items-center justify-center',
        'w-[120px] h-[120px]',
        'bg-[var(--bg)] border-[0.5px] border-[var(--n200)] rounded-[12px]',
      )}>
        {Line && <Line size={48} color={color} />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Name + meta */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className={cn(FONT.body, 'text-[16px] font-[550] text-[var(--n1150)]')}>{meta.name}</h3>
            <button onClick={onClose} className={cn('text-[var(--n600)] hover:text-[var(--n1150)]', TRANSITION.colors, 'text-[18px]')}>
              &times;
            </button>
          </div>
          <p className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n600)] mt-0.5')}>{meta.category}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {meta.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>

        {/* Variants */}
        <div>
          <p className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] mb-1.5')}>VARIANTS</p>
          <div className="flex gap-4">
            {[
              { label: 'Line', Comp: Line },
              { label: 'Solid', Comp: Solid },
              { label: 'Duo', Comp: Duo },
            ].map(({ label, Comp }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 flex items-center justify-center bg-[var(--bg)] rounded-[6px] border-[0.5px] border-[var(--n200)]">
                  {Comp && <Comp size={24} color={color} />}
                </div>
                <span className={cn(FONT.body, 'text-[10px] font-[400] text-[var(--n600)]')}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Size spectrum */}
        <div>
          <p className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] mb-1.5')}>SIZES</p>
          <div className="flex items-end gap-4">
            {[14, 16, 20, 24, 32].map((s) => (
              <div key={s} className="flex flex-col items-center gap-1">
                {Line && <Line size={s} color={color} />}
                <span className={cn(FONT.body, 'text-[10px] font-[400] text-[var(--n600)] tabular-nums')}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code */}
        <div>
          <p className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] mb-1.5')}>USAGE</p>
          <div className={cn('bg-[var(--n200)] rounded-[8px] px-3 py-2.5', FONT.body, 'text-[12px] font-[400] text-[var(--n1050)] leading-relaxed tabular-nums')}>
            <div>{importStr}</div>
            <div className="mt-1">{jsxStr}</div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="sm" onClick={() => copyText(importStr, 'Import')}>Copy import</Button>
            <Button variant="ghost" size="sm" onClick={() => copyText(jsxStr, 'JSX')}>Copy JSX</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page Content (inside ToastProvider) ───

function CatalogContent() {
  const [search, setSearch] = useState('')
  const [variant, setVariant] = useState<Variant>('line')
  const [size, setSize] = useState(20)
  const [color, setColor] = useState('var(--n1150)')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const categoryCounts = useMemo(getCategoryCounts, [])

  // Keyboard: / to search, Esc to close detail
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') {
        setSelectedIcon(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Filter icons
  const filtered = useMemo(() => {
    let items = ICON_CATALOG
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.tags.some((t) => t.includes(q)),
      )
    }
    if (activeCategories.length > 0) {
      items = items.filter((i) => activeCategories.includes(i.category))
    }
    return items
  }, [search, activeCategories])

  // Group by category
  const grouped = useMemo(() => {
    if (search) return null // flat list when searching
    const map = new Map<string, IconMeta[]>()
    for (const icon of filtered) {
      const list = map.get(icon.category) || []
      list.push(icon)
      map.set(icon.category, list)
    }
    return map
  }, [filtered, search])

  const selectedMeta = selectedIcon ? ICON_CATALOG.find((i) => i.name === selectedIcon) : null

  // Category options for ToggleGroup
  const categoryOptions = useMemo(
    () =>
      ICON_CATEGORIES.map((c) => ({
        value: c,
        label: `${c} (${categoryCounts[c] || 0})`,
      })),
    [categoryCounts],
  )

  return (
    <div className="min-h-screen bg-[var(--bg)]" style={{ padding: '40px 32px' }}>
      <div className="max-w-[1000px] mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className={cn(FONT.body, 'text-[24px] font-[550] text-[var(--n1150)]')}>RAMTT Icons</h1>
          <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-1')}>
            126 icons · 3 variants · Zero dependencies · Satoshi-calibrated
          </p>
        </div>

        {/* ── Controls Bar ── */}
        <div className="sticky top-0 bg-[var(--bg)] z-10 pb-4 space-y-3">
          {/* Search */}
          <InputGroup>
            <InputGroup.Prefix>
              <IconSearch size={16} color="var(--n600)" />
            </InputGroup.Prefix>
            <Input
              ref={searchRef}
              placeholder="Search icons... (press / to focus)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          {/* Variant + Size + Color */}
          <div className="flex items-center gap-4 flex-wrap">
            <ToggleGroup
              options={[
                { value: 'line', label: 'Line' },
                { value: 'solid', label: 'Solid' },
                { value: 'duo', label: 'Duo' },
              ]}
              value={variant}
              onChange={(v) => setVariant(v as Variant)}
              size="sm"
            />
            <ToggleGroup
              options={[
                { value: '16', label: '16' },
                { value: '20', label: '20' },
                { value: '24', label: '24' },
              ]}
              value={String(size)}
              onChange={(v) => setSize(Number(v))}
              variant="pill"
              size="sm"
            />
            <div className="flex items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={cn(
                    'w-5 h-5 rounded-full',
                    TRANSITION.colors,
                    color === c.value && 'ring-2 ring-offset-2 ring-[var(--n1050)]',
                  )}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategories([])}
              className={cn(
                'px-2.5 py-1 rounded-full text-[12px]',
                FONT.body, WEIGHT.book, TRANSITION.background,
                activeCategories.length === 0
                  ? 'bg-[var(--n1150)] text-[var(--n50)]'
                  : 'bg-[var(--n200)] text-[var(--n800)] hover:bg-[var(--n400)]',
              )}
            >
              All
            </button>
            {ICON_CATEGORIES.map((cat) => {
              const active = activeCategories.includes(cat)
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategories((prev) =>
                      active ? prev.filter((c) => c !== cat) : [...prev, cat],
                    )
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-[12px]',
                    FONT.body, WEIGHT.book, TRANSITION.background,
                    active
                      ? 'bg-[var(--n1150)] text-[var(--n50)]'
                      : 'bg-[var(--n200)] text-[var(--n800)] hover:bg-[var(--n400)]',
                  )}
                >
                  {cat} ({categoryCounts[cat] || 0})
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Icon Grid ── */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<IconSearch size={32} />}
            title="No icons found"
            description={`No icons match "${search}". Try a different term.`}
          />
        ) : grouped ? (
          // Grouped by category
          <div className="space-y-8 mt-4">
            {Array.from(grouped.entries()).map(([category, icons]) => (
              <div key={category}>
                <SectionHeader
                  action={<Badge>{icons.length}</Badge>}
                >
                  {category}
                </SectionHeader>
                <div
                  className="grid gap-2 mt-2"
                  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))' }}
                >
                  {icons.map((meta) => (
                    <IconCell
                      key={meta.name}
                      meta={meta}
                      variant={variant}
                      size={size}
                      color={color}
                      selected={selectedIcon === meta.name}
                      onClick={() => setSelectedIcon(selectedIcon === meta.name ? null : meta.name)}
                    />
                  ))}
                  {selectedIcon && icons.some((i) => i.name === selectedIcon) && selectedMeta && (
                    <DetailPanel meta={selectedMeta} color={color} onClose={() => setSelectedIcon(null)} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Flat list (search mode)
          <div
            className="grid gap-2 mt-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))' }}
          >
            {filtered.map((meta) => (
              <IconCell
                key={meta.name}
                meta={meta}
                variant={variant}
                size={size}
                color={color}
                selected={selectedIcon === meta.name}
                onClick={() => setSelectedIcon(selectedIcon === meta.name ? null : meta.name)}
              />
            ))}
            {selectedIcon && selectedMeta && (
              <DetailPanel meta={selectedMeta} color={color} onClose={() => setSelectedIcon(null)} />
            )}
          </div>
        )}

        {/* ── Animated Section ── */}
        <div className="mt-12">
          <SectionHeader action={<Badge>{ANIMATED_LIST.length}</Badge>}>
            Animated
          </SectionHeader>
          <div
            className="grid gap-2 mt-2"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))' }}
          >
            {ANIMATED_LIST.map(({ name, component: Comp }) => (
              <div
                key={name}
                className={cn(
                  'flex flex-col items-center justify-center gap-1.5',
                  'border-[0.5px] rounded-[8px]',
                  'bg-[var(--n50)] border-[var(--n200)]',
                  'hover:bg-[var(--n200)] hover:border-[var(--n400)]',
                  TRANSITION.background,
                )}
                style={{ height: 88 }}
              >
                <Comp size={size} color={color} />
                <span className={cn(FONT.body, 'text-[10px] font-[400] text-[var(--n600)] max-w-[76px] truncate')}>
                  {name.replace('Icon', '')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-16 pb-8 text-center">
          <p className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n600)]')}>
            @ramtt/icons · 126 × 3 + 8 = 386 components · Zero dependencies
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Page ───

export default function IconCatalogPage() {
  return (
    <ToastProvider>
      <CatalogContent />
    </ToastProvider>
  )
}
