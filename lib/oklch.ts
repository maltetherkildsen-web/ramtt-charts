// RAMTT Color Lab — OKLCH ↔ Hex utilities
// All math follows CSS Color Level 4 spec

const DEG = Math.PI / 180

// ── OKLCH → intermediate LMS (cubed) ──
function toLMS(L: number, C: number, H: number): [number, number, number] {
  const a = C * Math.cos(H * DEG)
  const b = C * Math.sin(H * DEG)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b
  return [l_ ** 3, m_ ** 3, s_ ** 3]
}

// ── LMS → XYZ D65 ──
function lmsToXYZ(l: number, m: number, s: number): [number, number, number] {
  return [
     1.2270138511035211 * l - 0.5577999806518222 * m + 0.2812561489664678 * s,
    -0.0405801784232806 * l + 1.1122568696168302 * m - 0.0716766786656012 * s,
    -0.0763812845057069 * l - 0.4214819784180127 * m + 1.5861632204407947 * s,
  ]
}

// ── XYZ D65 → Linear RGB (three gamuts) ──
const MATRICES = {
  srgb: [
    [ 3.2404541621141054, -1.5371385940306089, -0.4985314095560162],
    [-0.9692660305051868,  1.8760108454466942,  0.0415560175303498],
    [ 0.0556434309591147, -0.2040259135167538,  1.0572251882231791],
  ],
  p3: [
    [ 2.4934969119414250, -0.9313836179191239, -0.4027107844507168],
    [-0.8294889695615747,  1.7626640603183463,  0.0236246858419436],
    [ 0.0358458302437845, -0.0761723892680418,  0.9568845240076872],
  ],
  rec2020: [
    [ 1.7166511879712674, -0.3556707837763923, -0.2533662813736597],
    [-0.6666843518324890,  1.6164812366349395,  0.0157685458139111],
    [ 0.0176398574453108, -0.0427706132578085,  0.9421031212354738],
  ],
} as const

function xyzToLinear(x: number, y: number, z: number, gamut: 'srgb' | 'p3' | 'rec2020'): [number, number, number] {
  const m = MATRICES[gamut]
  return [
    m[0][0] * x + m[0][1] * y + m[0][2] * z,
    m[1][0] * x + m[1][1] * y + m[1][2] * z,
    m[2][0] * x + m[2][1] * y + m[2][2] * z,
  ]
}

function toLinear(L: number, C: number, H: number, gamut: 'srgb' | 'p3' | 'rec2020'): [number, number, number] {
  const [l, m, s] = toLMS(L, C, H)
  const [x, y, z] = lmsToXYZ(l, m, s)
  return xyzToLinear(x, y, z, gamut)
}

// ── sRGB transfer function ──
function linearToGamma(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v))
}

function inGamut(r: number, g: number, b: number, eps = 0.002): boolean {
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && b >= -eps && b <= 1 + eps
}

// ── Public API ──

export function oklchToHex(L: number, C: number, H: number): { hex: string; inGamut: boolean } {
  const [r, g, b] = toLinear(L, C, H, 'srgb')
  const gamutOk = inGamut(r, g, b)
  const hex = '#' + [r, g, b]
    .map(c => Math.round(clamp01(linearToGamma(clamp01(c))) * 255).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
  return { hex, inGamut: gamutOk }
}

export function findMaxChroma(L: number, H: number, gamut: 'srgb' | 'p3' | 'rec2020' = 'srgb'): number {
  let lo = 0, hi = 0.4
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2
    const [r, g, b] = toLinear(L, mid, H, gamut)
    if (inGamut(r, g, b, 0.0001)) lo = mid
    else hi = mid
  }
  return Math.round(lo * 1000) / 1000
}

export function oklchToRGB(L: number, C: number, H: number): { r: number; g: number; b: number } {
  const [rl, gl, bl] = toLinear(L, C, H, 'srgb')
  return {
    r: Math.round(clamp01(linearToGamma(clamp01(rl))) * 255),
    g: Math.round(clamp01(linearToGamma(clamp01(gl))) * 255),
    b: Math.round(clamp01(linearToGamma(clamp01(bl))) * 255),
  }
}

export function oklchToHSL(L: number, C: number, H: number): { h: number; s: number; l: number } {
  const { r, g, b } = oklchToRGB(L, C, H)
  const rf = r / 255, gf = g / 255, bf = b / 255
  const mx = Math.max(rf, gf, bf), mn = Math.min(rf, gf, bf)
  const lum = (mx + mn) / 2
  if (mx === mn) return { h: 0, s: 0, l: Math.round(lum * 1000) / 10 }
  const d = mx - mn
  const sat = lum > 0.5 ? d / (2 - mx - mn) : d / (mx + mn)
  let hue = 0
  if (mx === rf) hue = ((gf - bf) / d + (gf < bf ? 6 : 0)) * 60
  else if (mx === gf) hue = ((bf - rf) / d + 2) * 60
  else hue = ((rf - gf) / d + 4) * 60
  return { h: Math.round(hue), s: Math.round(sat * 1000) / 10, l: Math.round(lum * 1000) / 10 }
}

export function oklchCSS(L: number, C: number, H: number): string {
  return `oklch(${L} ${C} ${H})`
}
