/**
 * RAMTT Chart System — Math Layer
 *
 * Pure TypeScript, zero dependencies, zero React, zero DOM.
 * This is the foundation everything else builds on.
 */

// Scales
export { scaleLinear } from './scales/linear'
export type { LinearScale } from './scales/linear'

// Paths
export { linePath } from './paths/line'
export type { Accessor } from './paths/line'
export { areaPath } from './paths/area'
export { arcPath, pieLayout } from './paths/arc'

// Ticks
export { niceTicks, niceNum } from './ticks/nice'

// Utils
export { lttb } from './utils/lttb'
export type { Point } from './utils/lttb'
export { extent, extentOf } from './utils/extent'
export { bisectNearest, bisectData } from './utils/bisect'
export { nearest2d } from './utils/nearest2d'
export { stackSeries } from './utils/stack'
export { waterfallLayout } from './utils/waterfall'
export type { WaterfallItem, WaterfallBar } from './utils/waterfall'
export { treemapLayout } from './utils/treemap'
export type { TreemapItem, TreemapRect } from './utils/treemap'
