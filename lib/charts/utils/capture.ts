// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Chart capture — export a chart SVG as a PNG image.
 *
 * Uses native SVG serialization + Canvas rendering.
 * Zero external dependencies.
 */

export interface CaptureOptions {
  /** Filename without extension. Default: 'chart' */
  filename?: string
  /** Pixel scale factor. Default: 2 (retina) */
  scale?: number
  /** Background color. Default: '#FDFCFA' (--n50) */
  background?: string
  /** Padding around the chart in px. Default: 16 */
  padding?: number
}

/**
 * Capture an SVG element as a PNG and trigger download.
 */
export async function captureChart(
  svgElement: SVGSVGElement,
  options?: CaptureOptions,
): Promise<void> {
  const {
    filename = 'chart',
    scale = 2,
    background = '#FDFCFA',
    padding = 16,
  } = options ?? {}

  // 1. Clone and inline styles
  const clone = svgElement.cloneNode(true) as SVGSVGElement
  const svgWidth = svgElement.viewBox.baseVal.width || svgElement.clientWidth
  const svgHeight = svgElement.viewBox.baseVal.height || svgElement.clientHeight

  // Resolve CSS variables to computed values
  const computed = getComputedStyle(svgElement)
  const cssVars = [
    '--n50', '--n200', '--n400', '--n600', '--n800', '--n1050', '--n1100', '--n1150', '--bg',
    '--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5',
    '--chart-6', '--chart-7', '--chart-8', '--chart-positive', '--chart-negative',
  ]
  const varMap = new Map<string, string>()
  for (const v of cssVars) {
    const val = computed.getPropertyValue(v).trim()
    if (val) varMap.set(`var(${v})`, val)
  }

  // Replace var() references in the clone
  const allElements = clone.querySelectorAll('*')
  for (const el of allElements) {
    const svgEl = el as SVGElement
    for (const attr of ['fill', 'stroke', 'stop-color']) {
      const val = svgEl.getAttribute(attr)
      if (val) {
        for (const [varRef, resolved] of varMap) {
          if (val.includes(varRef)) {
            svgEl.setAttribute(attr, val.replace(varRef, resolved))
          }
        }
      }
    }
    // Inline style overrides
    if (svgEl.style) {
      for (const prop of ['fill', 'stroke', 'color', 'opacity']) {
        const sval = svgEl.style.getPropertyValue(prop)
        if (sval) {
          for (const [varRef, resolved] of varMap) {
            if (sval.includes(varRef)) {
              svgEl.style.setProperty(prop, sval.replace(varRef, resolved))
            }
          }
        }
      }
    }
  }

  // Set explicit dimensions
  clone.setAttribute('width', String(svgWidth))
  clone.setAttribute('height', String(svgHeight))

  // 2. Serialize to data URL
  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(clone)
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  // 3. Draw onto canvas
  const canvasWidth = (svgWidth + padding * 2) * scale
  const canvasHeight = (svgHeight + padding * 2) * scale
  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = background
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, padding * scale, padding * scale, svgWidth * scale, svgHeight * scale)
      URL.revokeObjectURL(url)

      // 4. Trigger download
      canvas.toBlob((blob) => {
        if (!blob) return
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `${filename}.png`
        a.click()
        URL.revokeObjectURL(a.href)
        resolve()
      }, 'image/png')
    }
    img.src = url
  })
}
