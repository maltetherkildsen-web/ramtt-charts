// Accent color definitions + HSL-based token ramp generator for the RAMTT accent comparison page.
// ~157 accent candidates across 19 families, with ground-truth tokens for the original 15.

// ─── HSL Utilities ───

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [h * 360, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  const sN = s / 100
  const lN = l / 100
  const c = (1 - Math.abs(2 * lN - 1)) * sN
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = lN - c / 2
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

// ─── Token Interface ───

export interface AccentTokens {
  primary: string
  hover: string
  pressed: string
  text: string
  icon: string
  iconLight: string
  iconLightest: string
  border: string
  wash: string
  badgeBg: string
  selection: string
  toggleTrack: string
}

// ─── Token Ramp Generator ───

export function generateAccentTokens(primary: string): AccentTokens {
  const [h, s, l] = hexToHsl(primary)

  // ── Near-black / very dark monochrome (L<15, S<10) ──
  if (l < 15 && s < 10) {
    return {
      primary,
      hover: hslToHex(h, clamp(s, 0, 5), clamp(l + 8, 5, 25)),
      pressed: hslToHex(h, clamp(s, 0, 5), clamp(l + 12, 5, 30)),
      text: primary,
      icon: primary,
      iconLight: hslToHex(h, clamp(s, 0, 8), 36),
      iconLightest: hslToHex(h, clamp(s, 0, 8), 54),
      border: hslToHex(h, clamp(s * 2, 0, 12), 83),
      wash: hslToHex(h, clamp(s * 2, 0, 12), 94),
      badgeBg: hslToHex(h, clamp(s * 2, 0, 12), 94),
      selection: hslToHex(h, clamp(s * 2, 0, 12), 90),
      toggleTrack: primary,
    }
  }

  // ── Dark earth tones (L<15, S>10) — like Espresso ──
  if (l < 15) {
    return {
      primary,
      hover: hslToHex(h, clamp(s - 5, 0, 100), clamp(l + 8, 5, 25)),
      pressed: hslToHex(h, clamp(s - 5, 0, 100), clamp(l + 12, 5, 30)),
      text: primary,
      icon: primary,
      iconLight: hslToHex(h, clamp(s * 0.6, 0, 50), 36),
      iconLightest: hslToHex(h, clamp(s * 0.4, 0, 40), 54),
      border: hslToHex(h, clamp(s * 0.25, 0, 25), 83),
      wash: hslToHex(h, clamp(s * 0.15, 0, 20), 94),
      badgeBg: hslToHex(h, clamp(s * 0.1, 0, 15), 96),
      selection: hslToHex(h, clamp(s * 0.2, 0, 25), 90),
      toggleTrack: primary,
    }
  }

  // ── Pastel primaries (L>75) — reverse ramp for functional tokens ──
  if (l > 75) {
    const darkL = clamp(30 + (100 - s) * 0.1, 25, 40)
    const medL = clamp(40 + (100 - s) * 0.1, 35, 50)
    return {
      primary,
      hover: hslToHex(h, clamp(s + 15, 0, 100), clamp(darkL + 5, 30, 50)),
      pressed: hslToHex(h, clamp(s + 20, 0, 100), darkL),
      text: hslToHex(h, clamp(s + 25, 0, 100), clamp(darkL - 5, 20, 35)),
      icon: hslToHex(h, clamp(s + 15, 0, 100), medL),
      iconLight: hslToHex(h, clamp(s * 0.6, 0, 80), clamp(l - 10, 60, 80)),
      iconLightest: hslToHex(h, clamp(s * 0.4, 0, 60), clamp(l - 5, 70, 85)),
      border: hslToHex(h, clamp(s * 0.5, 0, 60), clamp(l + 2, 80, 92)),
      wash: hslToHex(h, clamp(s * 0.2, 0, 40), 97),
      badgeBg: hslToHex(h, clamp(s * 0.12, 0, 30), 98),
      selection: primary,
      toggleTrack: hslToHex(h, clamp(s + 15, 0, 100), medL),
    }
  }

  // ── Standard accents ──
  const hover = hslToHex(h, clamp(s + 2, 0, 100), clamp(l - 12, 5, 90))
  const pressed = hslToHex(h, clamp(s + 4, 0, 100), clamp(l - 20, 5, 85))

  // Text — needs good contrast on sand (#FAF9F5)
  const text = l > 50
    ? hslToHex(h, clamp(s * 0.85, 0, 100), clamp(l - 25, 15, 45))
    : hslToHex(h, clamp(s * 0.85, 0, 100), clamp(Math.min(l, 38) - 3, 8, 42))

  // Icon — primary or slightly darker for bright ones
  const icon = l > 50
    ? hslToHex(h, clamp(s * 0.9, 0, 100), clamp(l - 10, 10, 55))
    : primary

  // Light icon — desaturated, lifted
  const iconLight = hslToHex(h, clamp(s * 0.5, 0, 100), clamp(l + (90 - l) * 0.5, 50, 82))

  // Lightest icon — very desaturated, very light
  const iconLightest = hslToHex(h, clamp(s * 0.35, 0, 100), clamp(l + (95 - l) * 0.75, 75, 92))

  // Border — light tint
  const border = hslToHex(h, clamp(s * 0.3, 0, 100), clamp(85, 80, 92))

  // Wash — barely tinted background
  const wash = hslToHex(h, clamp(s * 0.2, 0, 100), clamp(95, 92, 97))

  // Badge bg — even subtler
  const badgeBg = hslToHex(h, clamp(s * 0.15, 0, 100), clamp(97, 95, 98))

  // Selection — medium-light tint for text selection
  const selection = hslToHex(h, clamp(s * 0.4, 0, 100), clamp(82, 75, 88))

  return {
    primary, hover, pressed, text, icon,
    iconLight, iconLightest, border, wash, badgeBg,
    selection, toggleTrack: primary,
  }
}

// ─── Accent Definition ───

export interface AccentDefinition {
  id: string
  name: string
  hex: string
  family: string
  tokens: AccentTokens
  suggested?: boolean
  /** Bright accents need dark text on filled buttons */
  needsDarkText?: boolean
  /** Near-black/espresso accent needs underlined links */
  isMonochrome?: boolean
}

/** Determine if white text has sufficient contrast on the given color */
export function needsDarkTextOnFill(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55
}

// ─── Helper constructors ───

function defineAccent(
  id: string,
  name: string,
  hex: string,
  family: string,
  overrides?: Partial<Pick<AccentDefinition, 'suggested' | 'needsDarkText' | 'isMonochrome'>>,
): AccentDefinition {
  const tokens = generateAccentTokens(hex)
  return { id, name, hex, family, tokens, ...overrides }
}

function defineAccentExact(
  id: string,
  name: string,
  hex: string,
  family: string,
  tokens: AccentTokens,
  overrides?: Partial<Pick<AccentDefinition, 'needsDarkText' | 'isMonochrome'>>,
): AccentDefinition {
  return { id, name, hex, family, tokens, ...overrides }
}

// ─── Family Definitions ───

export const ACCENT_FAMILIES = [
  'Blues',
  'Violets',
  'Warm',
  'Magenta',
  'Red/Orange',
  'Green',
  'Dark',
  'Pastels',
  'Suggested',
  'Earth',
  'Teal & Cyan',
  'Forest & Lime',
  'Exotic',
  'TW 500',
  'TW 600',
  'TW 700',
  'TW 800',
  'TW 900',
  'TW 950',
] as const

export type AccentFamily = (typeof ACCENT_FAMILIES)[number]

// ─── The ~157 Accent Candidates ───
// 1-15: Ground-truth tokens extracted from Figma DevTools
// 16+: Generated via HSL manipulation

export const ACCENTS: AccentDefinition[] = [
  // ── Blues (5) ──

  defineAccentExact('figma-blue', 'Figma Blue', '#0D99FF', 'Blues', {
    primary: '#0D99FF', hover: '#007BE5', pressed: '#0768CF',
    text: '#007BE5', icon: '#007BE5', iconLight: '#80CAFF', iconLightest: '#BDE3FF',
    border: '#BDE3FF', wash: '#E5F4FF', badgeBg: '#F2F9FF',
    selection: '#B3D9FF', toggleTrack: '#0D99FF',
  }),

  defineAccentExact('ruth-navy', 'Ruth Navy', '#0230E0', 'Blues', {
    primary: '#0230E0', hover: '#021DB0', pressed: '#011888',
    text: '#0230E0', icon: '#0230E0', iconLight: '#6080E8', iconLightest: '#A0B8F4',
    border: '#B8CCF8', wash: '#EAF0FE', badgeBg: '#F0F4FF',
    selection: '#C0D0F8', toggleTrack: '#0230E0',
  }),

  defineAccentExact('vercel-blue', 'Vercel Blue', '#0070F3', 'Blues', {
    primary: '#0070F3', hover: '#005CC8', pressed: '#004AA0',
    text: '#0070F3', icon: '#0070F3', iconLight: '#66B0F8', iconLightest: '#B0D4FC',
    border: '#B0D4FC', wash: '#E8F2FE', badgeBg: '#F2F8FF',
    selection: '#B8D8FC', toggleTrack: '#0070F3',
  }),

  defineAccentExact('anthropic-blue', 'Anthropic Blue', '#256ABF', 'Blues', {
    primary: '#256ABF', hover: '#1A4F8A', pressed: '#143D6C',
    text: '#1A4F8A', icon: '#256ABF', iconLight: '#86B6EF', iconLightest: '#CDE2FB',
    border: '#CDE2FB', wash: '#F0F7FE', badgeBg: '#F5FAFF',
    selection: '#CDE2FB', toggleTrack: '#256ABF',
  }),

  defineAccentExact('anthropic-dark', 'Anthropic Dark', '#1A4F8A', 'Blues', {
    primary: '#1A4F8A', hover: '#143D6C', pressed: '#0E2D50',
    text: '#1A4F8A', icon: '#1A4F8A', iconLight: '#6396D6', iconLightest: '#9EC5F4',
    border: '#9EC5F4', wash: '#F0F7FE', badgeBg: '#F5FAFF',
    selection: '#CDE2FB', toggleTrack: '#1A4F8A',
  }),

  // ── Violets & Indigos (3) ──

  defineAccentExact('electric-indigo', 'Electric Indigo', '#4D49FC', 'Violets', {
    primary: '#4D49FC', hover: '#3D3AE0', pressed: '#2E2BC4',
    text: '#4D49FC', icon: '#4D49FC', iconLight: '#9B99FD', iconLightest: '#C8C7FE',
    border: '#C8C7FE', wash: '#EDEDFF', badgeBg: '#F4F4FF',
    selection: '#C0BFFF', toggleTrack: '#4D49FC',
  }),

  defineAccentExact('figma-purple', 'Figma Purple', '#9747FF', 'Violets', {
    primary: '#9747FF', hover: '#7C32D9', pressed: '#6425B3',
    text: '#7C32D9', icon: '#9747FF', iconLight: '#C094FF', iconLightest: '#DCC4FF',
    border: '#DCC4FF', wash: '#F3ECFF', badgeBg: '#F8F4FF',
    selection: '#D4C0FF', toggleTrack: '#9747FF',
  }),

  defineAccentExact('violet-rich', 'Violet Rich', '#7C3AED', 'Violets', {
    primary: '#7C3AED', hover: '#6D28D9', pressed: '#5B21B6',
    text: '#6D28D9', icon: '#6D28D9', iconLight: '#B794F6', iconLightest: '#D8C4FC',
    border: '#D8C4FC', wash: '#F0EAFF', badgeBg: '#F5F0FF',
    selection: '#CDBCF7', toggleTrack: '#7C3AED',
  }),

  // ── Warm (2) ──

  defineAccentExact('anthropic-gold', 'Anthropic Gold', '#EDA100', 'Warm', {
    primary: '#EDA100', hover: '#D08E00', pressed: '#B07800',
    text: '#B07800', icon: '#D08E00', iconLight: '#F5CC66', iconLightest: '#FAE0A0',
    border: '#FAE0A0', wash: '#FFF8E8', badgeBg: '#FFFBF0',
    selection: '#FAE0A0', toggleTrack: '#EDA100',
  }, { needsDarkText: true }),

  defineAccentExact('anthropic-gold-dark', 'Gold Dark', '#B07800', 'Warm', {
    primary: '#B07800', hover: '#966600', pressed: '#7C5400',
    text: '#7C5400', icon: '#B07800', iconLight: '#EDA100', iconLightest: '#F5CC66',
    border: '#F5CC66', wash: '#FFF8E8', badgeBg: '#FFFBF0',
    selection: '#FAE0A0', toggleTrack: '#B07800',
  }, { needsDarkText: true }),

  // ── Magenta & Rose (6) ──

  defineAccentExact('ruth-magenta', 'Ruth Magenta', '#96004D', 'Magenta', {
    primary: '#96004D', hover: '#7D0040', pressed: '#640033',
    text: '#96004D', icon: '#96004D', iconLight: '#D466A0', iconLightest: '#F0B8D4',
    border: '#F0B8D4', wash: '#FDF0F6', badgeBg: '#FFF5F9',
    selection: '#F2C0D8', toggleTrack: '#96004D',
  }),

  defineAccentExact('perplexity-magenta', 'Perplexity', '#8C2280', 'Magenta', {
    primary: '#8C2280', hover: '#721A68', pressed: '#5C1454',
    text: '#8C2280', icon: '#8C2280', iconLight: '#C468B8', iconLightest: '#E0A8D8',
    border: '#E0A8D8', wash: '#FAF0F8', badgeBg: '#FDF5FC',
    selection: '#E8B8E0', toggleTrack: '#8C2280',
  }),

  defineAccent('rosewood', 'Rosewood', '#B0204E', 'Magenta'),
  defineAccent('berry', 'Berry', '#A8174B', 'Magenta'),
  defineAccent('wine', 'Wine', '#7A1B4A', 'Magenta'),
  defineAccent('dusty-rose', 'Dusty Rose', '#C45B78', 'Magenta'),

  // ── Red & Orange (3) ──

  defineAccent('flare-orange', 'Flare Orange', '#FF6A00', 'Red/Orange', { needsDarkText: true }),
  defineAccent('signal-red', 'Signal Red', '#FE5733', 'Red/Orange', { needsDarkText: true }),
  defineAccent('warm-red', 'Warm Red', '#F56565', 'Red/Orange', { needsDarkText: true }),

  // ── Green & Teal & Mint (3) ──

  defineAccentExact('anthropic-green', 'Anthropic Green', '#81B806', 'Green', {
    primary: '#81B806', hover: '#6EA100', pressed: '#4A7B00',
    text: '#4A7B00', icon: '#6EA100', iconLight: '#95C53E', iconLightest: '#BFDE8D',
    border: '#BFDE8D', wash: '#E6F1D5', badgeBg: '#F2F8E8',
    selection: '#BFDE8D', toggleTrack: '#81B806',
  }, { needsDarkText: true }),

  defineAccentExact('teal', 'Teal', '#0D9488', 'Green', {
    primary: '#0D9488', hover: '#0A7A70', pressed: '#086058',
    text: '#0A7A70', icon: '#0A7A70', iconLight: '#5CC8BE', iconLightest: '#A8E8E2',
    border: '#A8E8E2', wash: '#E8FAF8', badgeBg: '#F0FDF9',
    selection: '#B0EAE4', toggleTrack: '#0D9488',
  }),

  defineAccent('mint', 'Mint', '#30C78A', 'Green'),

  // ── Dark & Earth (2) ──

  defineAccentExact('near-black', 'Near-Black', '#141413', 'Dark', {
    primary: '#141413', hover: '#0F0F0E', pressed: '#2A2826',
    text: '#141413', icon: '#141413', iconLight: '#5C5A55', iconLightest: '#8A8780',
    border: '#D4D1CA', wash: '#F3F1EC', badgeBg: '#F3F1EC',
    selection: '#E8E6DC', toggleTrack: '#141413',
  }, { isMonochrome: true }),

  defineAccent('espresso', 'Espresso', '#2B180A', 'Dark', { isMonochrome: true }),

  // ── Pastels (3) ──

  defineAccent('blush', 'Blush', '#FFC9C9', 'Pastels', { needsDarkText: true }),
  defineAccent('spring', 'Spring', '#CFFFB2', 'Pastels', { needsDarkText: true }),
  defineAccent('lavender', 'Lavender', '#E5DAF6', 'Pastels', { needsDarkText: true }),

  // ── Claude's Suggestions (4) ──

  defineAccent('warm-coral', 'Warm Coral', '#E8705A', 'Suggested', { suggested: true, needsDarkText: true }),
  defineAccent('terracotta', 'Terracotta', '#A0674B', 'Suggested', { suggested: true }),
  defineAccent('forest', 'Forest', '#2D6A4F', 'Suggested', { suggested: true }),
  defineAccent('copper', 'Copper', '#B87333', 'Suggested', { suggested: true, needsDarkText: true }),

  // ── Earth Tones (8) ──

  defineAccent('warm-orange', 'Warm Orange', '#E8650A', 'Earth', { needsDarkText: true }),
  defineAccent('dark-saffron', 'Dark Saffron', '#D4600A', 'Earth'),
  defineAccent('burnt-amber', 'Burnt Amber', '#C45A1A', 'Earth'),
  defineAccent('terracotta-warm', 'Terracotta Warm', '#C2552A', 'Earth'),
  defineAccent('burnt-sienna', 'Burnt Sienna', '#A0522D', 'Earth'),
  defineAccent('paprika', 'Paprika', '#8B2500', 'Earth'),
  defineAccent('persimmon', 'Persimmon', '#EC5800', 'Earth', { needsDarkText: true }),
  defineAccent('rust', 'Rust', '#B7410E', 'Earth'),

  // ── Teal & Cyan (4) ──

  defineAccent('deep-teal', 'Deep Teal', '#0A7B6C', 'Teal & Cyan'),
  defineAccent('petroleum', 'Petroleum', '#0D8B78', 'Teal & Cyan'),
  defineAccent('viridian', 'Viridian', '#40826D', 'Teal & Cyan'),
  defineAccent('petrol', 'Petrol', '#005F6B', 'Teal & Cyan'),

  // ── Forest & Lime (5) ──

  defineAccent('emerald-deep', 'Emerald', '#00694E', 'Forest & Lime'),
  defineAccent('jade', 'Jade', '#00A86B', 'Forest & Lime'),
  defineAccent('malachite', 'Malachite', '#0B6623', 'Forest & Lime'),
  defineAccent('chartreuse-dark', 'Dark Chartreuse', '#4B6F1E', 'Forest & Lime'),
  defineAccent('moss', 'Moss', '#8A9A5B', 'Forest & Lime', { needsDarkText: true }),

  // ── Exotic (9) ──

  defineAccent('deep-indigo', 'Deep Indigo', '#4B0082', 'Exotic'),
  defineAccent('byzantium', 'Byzantium', '#702963', 'Exotic'),
  defineAccent('mulberry', 'Mulberry', '#C54B8C', 'Exotic'),
  defineAccent('plum', 'Plum', '#8E4585', 'Exotic'),
  defineAccent('prussian-blue', 'Prussian Blue', '#003153', 'Exotic'),
  defineAccent('oxblood', 'Oxblood', '#4A0000', 'Exotic'),
  defineAccent('olive-lime', 'Olive Lime', '#6B8E23', 'Exotic'),
  defineAccent('dusted-mauve', 'Dusted Mauve', '#966F8A', 'Exotic'),
  defineAccent('warm-slate', 'Warm Slate', '#5D6B7A', 'Exotic'),

  // ── Tailwind 500 (17) ──

  defineAccent('tw-red-500', 'Red 500', '#EF4444', 'TW 500'),
  defineAccent('tw-orange-500', 'Orange 500', '#F97316', 'TW 500', { needsDarkText: true }),
  defineAccent('tw-amber-500', 'Amber 500', '#F59E0B', 'TW 500', { needsDarkText: true }),
  defineAccent('tw-lime-500', 'Lime 500', '#84CC16', 'TW 500', { needsDarkText: true }),
  defineAccent('tw-emerald-500', 'Emerald 500', '#10B981', 'TW 500'),
  defineAccent('tw-teal-500', 'Teal 500', '#14B8A6', 'TW 500'),
  defineAccent('tw-cyan-500', 'Cyan 500', '#06B6D4', 'TW 500'),
  defineAccent('tw-sky-500', 'Sky 500', '#0EA5E9', 'TW 500'),
  defineAccent('tw-blue-500', 'Blue 500', '#3B82F6', 'TW 500'),
  defineAccent('tw-indigo-500', 'Indigo 500', '#6366F1', 'TW 500'),
  defineAccent('tw-violet-500', 'Violet 500', '#8B5CF6', 'TW 500'),
  defineAccent('tw-fuchsia-500', 'Fuchsia 500', '#D946EF', 'TW 500'),
  defineAccent('tw-pink-500', 'Pink 500', '#EC4899', 'TW 500'),
  defineAccent('tw-rose-500', 'Rose 500', '#F43F5E', 'TW 500'),
  defineAccent('tw-stone-500', 'Stone 500', '#78716C', 'TW 500'),
  defineAccent('tw-zinc-500', 'Zinc 500', '#71717A', 'TW 500'),
  defineAccent('tw-slate-500', 'Slate 500', '#64748B', 'TW 500'),

  // ── Tailwind 600 (15) — skipping violet-600/teal-600 (duplicates of existing) ──

  defineAccent('tw-red-600', 'Red 600', '#DC2626', 'TW 600'),
  defineAccent('tw-orange-600', 'Orange 600', '#EA580C', 'TW 600'),
  defineAccent('tw-amber-600', 'Amber 600', '#D97706', 'TW 600'),
  defineAccent('tw-lime-600', 'Lime 600', '#65A30D', 'TW 600'),
  defineAccent('tw-emerald-600', 'Emerald 600', '#059669', 'TW 600'),
  defineAccent('tw-cyan-600', 'Cyan 600', '#0891B2', 'TW 600'),
  defineAccent('tw-sky-600', 'Sky 600', '#0284C7', 'TW 600'),
  defineAccent('tw-blue-600', 'Blue 600', '#2563EB', 'TW 600'),
  defineAccent('tw-indigo-600', 'Indigo 600', '#4F46E5', 'TW 600'),
  defineAccent('tw-fuchsia-600', 'Fuchsia 600', '#C026D3', 'TW 600'),
  defineAccent('tw-pink-600', 'Pink 600', '#DB2777', 'TW 600'),
  defineAccent('tw-rose-600', 'Rose 600', '#E11D48', 'TW 600'),
  defineAccent('tw-stone-600', 'Stone 600', '#57534E', 'TW 600'),
  defineAccent('tw-zinc-600', 'Zinc 600', '#52525B', 'TW 600'),
  defineAccent('tw-slate-600', 'Slate 600', '#475569', 'TW 600'),

  // ── Tailwind 700 (17) ──

  defineAccent('tw-red-700', 'Red 700', '#B91C1C', 'TW 700'),
  defineAccent('tw-orange-700', 'Orange 700', '#C2410C', 'TW 700'),
  defineAccent('tw-amber-700', 'Amber 700', '#B45309', 'TW 700'),
  defineAccent('tw-lime-700', 'Lime 700', '#4D7C0F', 'TW 700'),
  defineAccent('tw-emerald-700', 'Emerald 700', '#047857', 'TW 700'),
  defineAccent('tw-teal-700', 'Teal 700', '#0F766E', 'TW 700'),
  defineAccent('tw-cyan-700', 'Cyan 700', '#0E7490', 'TW 700'),
  defineAccent('tw-sky-700', 'Sky 700', '#0369A1', 'TW 700'),
  defineAccent('tw-blue-700', 'Blue 700', '#1D4ED8', 'TW 700'),
  defineAccent('tw-indigo-700', 'Indigo 700', '#4338CA', 'TW 700'),
  defineAccent('tw-violet-700', 'Violet 700', '#6D28D9', 'TW 700'),
  defineAccent('tw-fuchsia-700', 'Fuchsia 700', '#A21CAF', 'TW 700'),
  defineAccent('tw-pink-700', 'Pink 700', '#BE185D', 'TW 700'),
  defineAccent('tw-rose-700', 'Rose 700', '#BE123C', 'TW 700'),
  defineAccent('tw-stone-700', 'Stone 700', '#44403C', 'TW 700'),
  defineAccent('tw-zinc-700', 'Zinc 700', '#3F3F46', 'TW 700'),
  defineAccent('tw-slate-700', 'Slate 700', '#334155', 'TW 700'),

  // ── Tailwind 800 (17) ──

  defineAccent('tw-red-800', 'Red 800', '#991B1B', 'TW 800'),
  defineAccent('tw-orange-800', 'Orange 800', '#9A3412', 'TW 800'),
  defineAccent('tw-amber-800', 'Amber 800', '#92400E', 'TW 800'),
  defineAccent('tw-lime-800', 'Lime 800', '#3F6212', 'TW 800'),
  defineAccent('tw-emerald-800', 'Emerald 800', '#065F46', 'TW 800'),
  defineAccent('tw-teal-800', 'Teal 800', '#115E59', 'TW 800'),
  defineAccent('tw-cyan-800', 'Cyan 800', '#155E75', 'TW 800'),
  defineAccent('tw-sky-800', 'Sky 800', '#075985', 'TW 800'),
  defineAccent('tw-blue-800', 'Blue 800', '#1E40AF', 'TW 800'),
  defineAccent('tw-indigo-800', 'Indigo 800', '#3730A3', 'TW 800'),
  defineAccent('tw-violet-800', 'Violet 800', '#5B21B6', 'TW 800'),
  defineAccent('tw-fuchsia-800', 'Fuchsia 800', '#86198F', 'TW 800'),
  defineAccent('tw-pink-800', 'Pink 800', '#9D174D', 'TW 800'),
  defineAccent('tw-rose-800', 'Rose 800', '#9F1239', 'TW 800'),
  defineAccent('tw-stone-800', 'Stone 800', '#292524', 'TW 800'),
  defineAccent('tw-zinc-800', 'Zinc 800', '#27272A', 'TW 800'),
  defineAccent('tw-slate-800', 'Slate 800', '#1E293B', 'TW 800'),

  // ── Tailwind 900 (17) ──

  defineAccent('tw-red-900', 'Red 900', '#7F1D1D', 'TW 900'),
  defineAccent('tw-orange-900', 'Orange 900', '#7C2D12', 'TW 900'),
  defineAccent('tw-amber-900', 'Amber 900', '#78350F', 'TW 900'),
  defineAccent('tw-lime-900', 'Lime 900', '#365314', 'TW 900'),
  defineAccent('tw-emerald-900', 'Emerald 900', '#064E3B', 'TW 900'),
  defineAccent('tw-teal-900', 'Teal 900', '#134E4A', 'TW 900'),
  defineAccent('tw-cyan-900', 'Cyan 900', '#164E63', 'TW 900'),
  defineAccent('tw-sky-900', 'Sky 900', '#0C4A6E', 'TW 900'),
  defineAccent('tw-blue-900', 'Blue 900', '#1E3A5F', 'TW 900'),
  defineAccent('tw-indigo-900', 'Indigo 900', '#312E81', 'TW 900'),
  defineAccent('tw-violet-900', 'Violet 900', '#4C1D95', 'TW 900'),
  defineAccent('tw-fuchsia-900', 'Fuchsia 900', '#701A75', 'TW 900'),
  defineAccent('tw-pink-900', 'Pink 900', '#831843', 'TW 900'),
  defineAccent('tw-rose-900', 'Rose 900', '#881337', 'TW 900'),
  defineAccent('tw-stone-900', 'Stone 900', '#1C1917', 'TW 900'),
  defineAccent('tw-zinc-900', 'Zinc 900', '#18181B', 'TW 900'),
  defineAccent('tw-slate-900', 'Slate 900', '#0F172A', 'TW 900'),

  // ── Tailwind 950 (17) ──

  defineAccent('tw-red-950', 'Red 950', '#450A0A', 'TW 950'),
  defineAccent('tw-orange-950', 'Orange 950', '#431407', 'TW 950'),
  defineAccent('tw-amber-950', 'Amber 950', '#451A03', 'TW 950'),
  defineAccent('tw-lime-950', 'Lime 950', '#1A2E05', 'TW 950'),
  defineAccent('tw-emerald-950', 'Emerald 950', '#022C22', 'TW 950'),
  defineAccent('tw-teal-950', 'Teal 950', '#042F2E', 'TW 950'),
  defineAccent('tw-cyan-950', 'Cyan 950', '#083344', 'TW 950'),
  defineAccent('tw-sky-950', 'Sky 950', '#082F49', 'TW 950'),
  defineAccent('tw-blue-950', 'Blue 950', '#172554', 'TW 950'),
  defineAccent('tw-indigo-950', 'Indigo 950', '#1E1B4B', 'TW 950'),
  defineAccent('tw-violet-950', 'Violet 950', '#2E1065', 'TW 950'),
  defineAccent('tw-fuchsia-950', 'Fuchsia 950', '#4A044E', 'TW 950'),
  defineAccent('tw-pink-950', 'Pink 950', '#500724', 'TW 950'),
  defineAccent('tw-rose-950', 'Rose 950', '#4C0519', 'TW 950'),
  defineAccent('tw-stone-950', 'Stone 950', '#0C0A09', 'TW 950'),
  defineAccent('tw-zinc-950', 'Zinc 950', '#09090B', 'TW 950'),
  defineAccent('tw-slate-950', 'Slate 950', '#020617', 'TW 950'),
]

export const DEFAULT_ACCENT_ID = 'figma-blue'

export function getAccentById(id: string): AccentDefinition | undefined {
  return ACCENTS.find((a) => a.id === id)
}

// ─── CSS Variable Application ───

export const ACCENT_CSS_VARS = [
  '--accent',
  '--accent-hover',
  '--accent-pressed',
  '--accent-text',
  '--accent-icon',
  '--accent-icon-light',
  '--accent-icon-lightest',
  '--accent-border',
  '--accent-wash',
  '--accent-badge',
  '--accent-selection',
  '--accent-toggle',
] as const

export function applyAccentTokens(tokens: AccentTokens) {
  const root = document.documentElement
  root.style.setProperty('--accent', tokens.primary)
  root.style.setProperty('--accent-hover', tokens.hover)
  root.style.setProperty('--accent-pressed', tokens.pressed)
  root.style.setProperty('--accent-text', tokens.text)
  root.style.setProperty('--accent-icon', tokens.icon)
  root.style.setProperty('--accent-icon-light', tokens.iconLight)
  root.style.setProperty('--accent-icon-lightest', tokens.iconLightest)
  root.style.setProperty('--accent-border', tokens.border)
  root.style.setProperty('--accent-wash', tokens.wash)
  root.style.setProperty('--accent-badge', tokens.badgeBg)
  root.style.setProperty('--accent-selection', tokens.selection)
  root.style.setProperty('--accent-toggle', tokens.toggleTrack)
}

/** Token name -> display label map */
export const TOKEN_LABELS: Record<keyof AccentTokens, string> = {
  primary: 'primary',
  hover: 'hover',
  pressed: 'pressed',
  text: 'text',
  icon: 'icon',
  iconLight: 'icon-light',
  iconLightest: 'icon-lightest',
  border: 'border',
  wash: 'wash',
  badgeBg: 'badge-bg',
  selection: 'selection',
  toggleTrack: 'toggle-track',
}
