import { describe, it, expect } from 'vitest'
import { resolveAnimate, EASE_OUT_EXPO, EASE_SPRING } from './animate'

const defaults = { duration: 600, delay: 0, easing: EASE_OUT_EXPO }

describe('resolveAnimate', () => {
  it('returns disabled when animate is undefined', () => {
    const result = resolveAnimate(undefined, defaults)
    expect(result.enabled).toBe(false)
  })

  it('returns disabled when animate is false', () => {
    const result = resolveAnimate(false, defaults)
    expect(result.enabled).toBe(false)
  })

  it('returns enabled with defaults when animate is true', () => {
    const result = resolveAnimate(true, defaults)
    expect(result.enabled).toBe(true)
    expect(result.duration).toBe(600)
    expect(result.delay).toBe(0)
    expect(result.easing).toBe(EASE_OUT_EXPO)
    expect(result.mode).toBe('draw')
  })

  it('merges partial config with defaults', () => {
    const result = resolveAnimate({ duration: 300, mode: 'fade' }, defaults)
    expect(result.enabled).toBe(true)
    expect(result.duration).toBe(300)
    expect(result.delay).toBe(0)
    expect(result.mode).toBe('fade')
  })
})

describe('easing constants', () => {
  it('exports EASE_OUT_EXPO', () => {
    expect(EASE_OUT_EXPO).toContain('cubic-bezier')
  })

  it('exports EASE_SPRING', () => {
    expect(EASE_SPRING).toContain('cubic-bezier')
  })
})
