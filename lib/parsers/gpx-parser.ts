// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * GPX file parser — converts .gpx XML into ParsedActivityData.
 *
 * Uses browser-native DOMParser (zero npm dependencies).
 *
 * Supports GPX 1.1 with Garmin/Cluetrust TrackPointExtension for HR/cadence/power.
 */

import type { ActivityPoint, ParsedActivityData, ActivityMeta } from './types'
import { resampleToSeconds } from './types'

/**
 * Parse a GPX XML string into ParsedActivityData.
 */
export function parseGPX(xml: string): ParsedActivityData {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error(`Invalid GPX XML: ${parseError.textContent?.slice(0, 100)}`)
  }

  // GPX structure: gpx → trk → trkseg → trkpt
  const name = getText(doc, 'trk > name') || getText(doc, 'metadata > name') || 'GPX Activity'
  const time = getText(doc, 'metadata > time') || ''

  const trkpts = doc.querySelectorAll('trkpt')
  const points: ActivityPoint[] = []

  let totalAscent = 0
  let totalDescent = 0
  let prevAlt: number | undefined
  let maxHR = 0
  let maxPower = 0
  let sumHR = 0
  let sumPower = 0
  let sumCadence = 0
  let sumSpeed = 0
  let hrCount = 0
  let powerCount = 0
  let cadenceCount = 0
  let speedCount = 0

  for (const pt of trkpts) {
    const lat = parseFloat(pt.getAttribute('lat') || '0')
    const lon = parseFloat(pt.getAttribute('lon') || '0')
    const eleText = getText(pt, 'ele')
    const timeText = getText(pt, 'time')
    const altitude = eleText ? parseFloat(eleText) : undefined

    // Extensions (Garmin TrackPointExtension)
    const hr = getExtNum(pt, 'hr') || getExtNum(pt, 'heartrate')
    const cad = getExtNum(pt, 'cad') || getExtNum(pt, 'cadence')
    const power = getExtNum(pt, 'power')
    const speed = getExtNum(pt, 'speed')

    // Elevation gain/loss
    if (altitude !== undefined && prevAlt !== undefined) {
      const diff = altitude - prevAlt
      if (diff > 0) totalAscent += diff
      else totalDescent += Math.abs(diff)
    }
    prevAlt = altitude

    // Stats
    if (hr) { sumHR += hr; hrCount++; if (hr > maxHR) maxHR = hr }
    if (power) { sumPower += power; powerCount++; if (power > maxPower) maxPower = power }
    if (cad) { sumCadence += cad; cadenceCount++ }
    if (speed) { sumSpeed += speed; speedCount++ }

    points.push({
      time: timeText ? new Date(timeText).getTime() : 0,
      lat,
      lon,
      altitude,
      heartRate: hr || undefined,
      cadence: cad || undefined,
      power: power || undefined,
      speed: speed || undefined,
    })
  }

  // Compute speed from lat/lon if not in extensions
  if (speedCount === 0 && points.length > 1) {
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      if (prev.lat && prev.lon && curr.lat && curr.lon && curr.time && prev.time) {
        const dt = (curr.time - prev.time) / 1000 // seconds
        if (dt > 0) {
          const dist = haversine(prev.lat, prev.lon, curr.lat, curr.lon)
          const spd = (dist / dt) * 3.6 // m/s → km/h
          curr.speed = spd
          sumSpeed += spd
          speedCount++
        }
      }
    }
  }

  // Compute total distance
  let totalDistance = 0
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    if (prev.lat && prev.lon && curr.lat && curr.lon) {
      totalDistance += haversine(prev.lat, prev.lon, curr.lat, curr.lon)
    }
  }

  const totalTime = points.length > 1
    ? (points[points.length - 1].time - points[0].time) / 1000
    : 0

  const meta: ActivityMeta = {
    sport: detectSport(name, sumSpeed / (speedCount || 1)),
    name,
    date: time || (points[0]?.time ? new Date(points[0].time).toISOString() : ''),
    totalTime,
    totalDistance: totalDistance / 1000, // m → km
    totalAscent: Math.round(totalAscent),
    totalDescent: Math.round(totalDescent),
    totalCalories: 0,
    avgPower: powerCount > 0 ? Math.round(sumPower / powerCount) : 0,
    maxPower,
    avgHR: hrCount > 0 ? Math.round(sumHR / hrCount) : 0,
    maxHR,
    avgCadence: cadenceCount > 0 ? Math.round(sumCadence / cadenceCount) : 0,
    avgSpeed: speedCount > 0 ? Math.round((sumSpeed / speedCount) * 10) / 10 : 0,
    recordCount: points.length,
  }

  const arrays = resampleToSeconds(points)

  return {
    meta,
    points,
    ...arrays,
  }
}

// ─── Helpers ───

function getText(parent: Document | Element, selector: string): string {
  return parent.querySelector(selector)?.textContent?.trim() || ''
}

function getExtNum(pt: Element, name: string): number | undefined {
  // Try multiple extension namespaces
  const selectors = [
    `extensions ${name}`,
    `extensions *|${name}`,
  ]
  for (const sel of selectors) {
    try {
      const el = pt.querySelector(sel)
      if (el?.textContent) {
        const v = parseFloat(el.textContent)
        if (!isNaN(v)) return v
      }
    } catch {
      // Selector might not be valid, try next
    }
  }

  // Fallback: iterate all extension children
  const exts = pt.querySelector('extensions')
  if (exts) {
    for (const child of exts.querySelectorAll('*')) {
      const localName = child.localName?.toLowerCase()
      if (localName === name.toLowerCase() && child.textContent) {
        const v = parseFloat(child.textContent)
        if (!isNaN(v)) return v
      }
    }
  }

  return undefined
}

/** Haversine distance in meters between two GPS coordinates. */
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function detectSport(name: string, avgSpeedKmh: number): string {
  const lower = name.toLowerCase()
  if (lower.includes('run') || lower.includes('løb')) return 'running'
  if (lower.includes('swim') || lower.includes('svøm')) return 'swimming'
  if (lower.includes('walk') || lower.includes('gå')) return 'walking'
  if (lower.includes('hike') || lower.includes('vand')) return 'hiking'
  if (avgSpeedKmh > 15) return 'cycling'
  if (avgSpeedKmh > 4) return 'running'
  return 'other'
}
