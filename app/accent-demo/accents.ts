// Accent color definitions + HSL-based token ramp generator for the RAMTT accent comparison page.

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

// ─── Token Ramp Generator ───

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
}

export function generateAccentTokens(primary: string): AccentTokens {
  const [h, s, l] = hexToHsl(primary)

  // Near-black special case — monochrome ramp using the neutral scale
  if (l < 15 && s < 10) {
    return {
      primary,
      hover: '#2A2826',
      pressed: '#383633',
      text: '#2A2826',
      icon: '#383633',
      iconLight: '#76726A',
      iconLightest: '#E8E5DC',
      border: '#E8E5DC',
      wash: '#F2F0EA',
      badgeBg: '#FDFCFA',
      selection: '#E8E5DC',
    }
  }

  // Darker variants — reduce lightness
  const hover = hslToHex(h, clamp(s + 2, 0, 100), clamp(l - 12, 5, 90))
  const pressed = hslToHex(h, clamp(s + 4, 0, 100), clamp(l - 20, 5, 85))

  // Text color — needs good contrast on sand (#FAF9F5), push darker
  const text = hslToHex(h, clamp(s * 0.85, 0, 100), clamp(Math.min(l, 38) - 5, 8, 40))

  // Icon variants — primary or slightly adjusted
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

  return { primary, hover, pressed, text, icon, iconLight, iconLightest, border, wash, badgeBg, selection }
}

// ─── Accent Definitions ───

export interface AccentDefinition {
  id: string
  name: string
  hex: string
  family: string
  tokens: AccentTokens
  addedByClaud?: boolean
  /** Gold accents need dark text on filled buttons */
  needsDarkText?: boolean
  /** Near-black accent needs underlined links */
  isMonochrome?: boolean
}

function defineAccent(
  id: string,
  name: string,
  hex: string,
  family: string,
  overrides?: Partial<{ addedByClaud: boolean; needsDarkText: boolean; isMonochrome: boolean }>,
): AccentDefinition {
  const tokens = generateAccentTokens(hex)
  return { id, name, hex, family, tokens, ...overrides }
}

// ─── The 17 Original Candidates ───

export const ACCENT_FAMILIES = [
  'Blues',
  'Violets',
  'Warm',
  'Magenta',
  'Dark',
  'Green',
  'Red/Orange',
  'Claude picks',
] as const

export type AccentFamily = (typeof ACCENT_FAMILIES)[number]

export const ACCENTS: AccentDefinition[] = [
  // Blues (5)
  defineAccent('figma-blue', 'Figma Blue', '#0D99FF', 'Blues'),
  defineAccent('ruth-navy', 'Ruth Navy', '#0230E0', 'Blues'),
  defineAccent('vercel-blue', 'Vercel Blue', '#0070F3', 'Blues'),
  defineAccent('anthropic-blue', 'Anthropic Blue', '#256ABF', 'Blues'),
  defineAccent('anthropic-dark', 'Anthropic Dark', '#1A4F8A', 'Blues'),

  // Violets & Indigos (3)
  defineAccent('electric-indigo', 'Electric Indigo', '#4D49FC', 'Violets'),
  defineAccent('figma-purple', 'Figma Purple', '#9747FF', 'Violets'),
  defineAccent('violet-rich', 'Violet Rich', '#7C3AED', 'Violets'),

  // Warm (2)
  defineAccent('anthropic-gold', 'Anthropic Gold', '#EDA100', 'Warm', { needsDarkText: true }),
  defineAccent('anthropic-gold-dark', 'Gold Dark', '#B07800', 'Warm', { needsDarkText: true }),

  // Magenta & Rose (2)
  defineAccent('ruth-magenta', 'Ruth Magenta', '#96004D', 'Magenta'),
  defineAccent('perplexity-magenta', 'Perplexity Magenta', '#8C2280', 'Magenta'),

  // Dark (1)
  defineAccent('near-black', 'Near-Black', '#141413', 'Dark', { isMonochrome: true }),

  // Green & Teal (2)
  defineAccent('anthropic-green', 'Anthropic Green', '#81B806', 'Green', { needsDarkText: true }),
  defineAccent('teal', 'Teal', '#0D9488', 'Green'),

  // Red / Orange (2)
  defineAccent('flare-orange', 'Flare Orange', '#FF6A00', 'Red/Orange', { needsDarkText: true }),
  defineAccent('signal-red', 'Signal Red', '#FE5733', 'Red/Orange', { needsDarkText: true }),

  // ─── Claude's Picks (added candidates) ───
  defineAccent('warm-coral', 'Warm Coral', '#E8705A', 'Claude picks', { addedByClaud: true }),
  defineAccent('clay-brown', 'Clay Brown', '#A0674B', 'Claude picks', { addedByClaud: true }),
  defineAccent('dusty-rose', 'Dusty Rose', '#C47A8A', 'Claude picks', { addedByClaud: true }),
  defineAccent('forest-green', 'Forest Green', '#3A7D5C', 'Claude picks', { addedByClaud: true }),
]

export const DEFAULT_ACCENT_ID = 'figma-blue'

export function getAccentById(id: string): AccentDefinition | undefined {
  return ACCENTS.find((a) => a.id === id)
}

/** Determine if white text has sufficient contrast on the given color */
export function needsDarkTextOnFill(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  // Relative luminance (simplified)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55
}

/** All CSS custom property names for accent tokens */
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
] as const

/** Apply accent tokens to :root as CSS custom properties */
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
}

/** Token name → label map for display */
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
}
