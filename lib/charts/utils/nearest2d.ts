/**
 * 2D nearest-point lookup for scatter/bubble charts.
 *
 * Given an array of {x, y} points (in pixel space) and a target position,
 * finds the nearest point by euclidean distance in O(n).
 *
 * Pure function, zero dependencies.
 */

/**
 * Find the nearest point in 2D space by euclidean distance.
 *
 * @param data     Array of points with x and y coordinates.
 * @param targetX  Target x position.
 * @param targetY  Target y position.
 * @returns        Index of the nearest point and the squared distance, or { index: -1, distance: Infinity } if empty.
 */
export function nearest2d(
  data: readonly { x: number; y: number }[],
  targetX: number,
  targetY: number,
): { index: number; distance: number } {
  const len = data.length
  if (len === 0) return { index: -1, distance: Infinity }

  let bestIdx = 0
  let bestDist = Infinity

  for (let i = 0; i < len; i++) {
    const dx = data[i].x - targetX
    const dy = data[i].y - targetY
    const dist = dx * dx + dy * dy // squared — avoids sqrt for comparison
    if (dist < bestDist) {
      bestDist = dist
      bestIdx = i
    }
  }

  return { index: bestIdx, distance: Math.sqrt(bestDist) }
}
