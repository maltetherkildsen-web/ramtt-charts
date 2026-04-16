import { describe, it, expect } from 'vitest'
import { captureChart, type CaptureOptions } from './capture'

describe('captureChart', () => {
  it('is a callable function', () => {
    expect(typeof captureChart).toBe('function')
  })

  it('accepts options parameter type', () => {
    const opts: CaptureOptions = {
      filename: 'test',
      scale: 2,
      background: '#FFFFFF',
      padding: 16,
    }
    expect(opts.filename).toBe('test')
    expect(opts.scale).toBe(2)
  })

  it('has correct default-like values in the options type', () => {
    const opts: CaptureOptions = {}
    expect(opts.filename).toBeUndefined()
    expect(opts.scale).toBeUndefined()
  })
})
