// Accent color definitions + HSL-based token ramp generator for the RAMTT accent comparison page.
// ~32 accent candidates across 9 families, with ground-truth tokens for the original 15.

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
  hoverWash: string
  badgeBg: string
  selection: string
  toggleTrack: string
}

// ─── Hover Wash Derivation ───
// Subtle bg for list/dropdown hover — slightly more visible than wash, lighter than border

function computeHoverWash(hex: string): string {
  const [h, s, l] = hexToHsl(hex)
  if (l < 15 && s < 10) return hslToHex(h, clamp(s * 2.5, 0, 15), 91)
  if (l < 15) return hslToHex(h, clamp(s * 0.2, 0, 22), 91)
  if (l > 75) return hslToHex(h, clamp(s * 0.25, 0, 45), 94)
  return hslToHex(h, clamp(s * 0.25, 0, 100), 93)
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
      hoverWash: computeHoverWash(primary),
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
      hoverWash: computeHoverWash(primary),
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
      hoverWash: computeHoverWash(primary),
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
    iconLight, iconLightest, border, wash,
    hoverWash: computeHoverWash(primary),
    badgeBg, selection, toggleTrack: primary,
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
  tokens: Omit<AccentTokens, 'hoverWash'>,
  overrides?: Partial<Pick<AccentDefinition, 'needsDarkText' | 'isMonochrome'>>,
): AccentDefinition {
  return { id, name, hex, family, tokens: { ...tokens, hoverWash: computeHoverWash(hex) }, ...overrides }
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
] as const

export type AccentFamily = (typeof ACCENT_FAMILIES)[number]

// ─── The ~32 Accent Candidates ───
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
  '--accent-hover-wash',
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
  root.style.setProperty('--accent-hover-wash', tokens.hoverWash)
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
  hoverWash: 'hover-wash',
  badgeBg: 'badge-bg',
  selection: 'selection',
  toggleTrack: 'toggle-track',
}
