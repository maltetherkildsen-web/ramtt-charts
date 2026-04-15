// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * RAMTT Chart System — Math Layer
 *
 * Pure TypeScript, zero dependencies, zero React, zero DOM.
 * This is the foundation everything else builds on.
 */

// Scales
export { scaleLinear } from './scales/linear'
export type { LinearScale } from './scales/linear'
export { scaleLog, niceLogTicks } from './scales/log'
export type { LogScale } from './scales/log'
export { scaleBand } from './scales/band'
export type { BandScale } from './scales/band'
export { scaleTime, formatTimeTick } from './scales/time'
export type { TimeScale } from './scales/time'

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
export { interpolateColor, hexToRgb, rgbToHex } from './utils/colorInterpolate'

// Radar geometry
export { radarPoints, radarPath, radarGridPoints } from './paths/radar'

// Color scale (value-based interpolation for heatmaps)
export { interpolateColorScale, parseHexColor, isLightColor } from './utils/colorScale'
export type { ColorStop } from './utils/colorScale'

// Layouts
export { sankeyLayout } from './layouts/sankey'
export type { SankeyNodeInput, SankeyLinkInput, SankeyNode, SankeyLink, SankeyLayout } from './layouts/sankey'
export { sunburstLayout } from './layouts/sunburst'
export type { SunburstNode, SunburstArc } from './layouts/sunburst'

// Peak Power / MMP
export { findPeakPower, computeAllPeaks, buildMMPCurve, PEAK_DURATIONS } from './utils/peakPower'
export type { PeakPowerResult } from './utils/peakPower'

// PMC (Performance Management Chart)
export { computePMC, computeTSS } from './utils/pmc'
export type { PMCResult, PMCOptions } from './utils/pmc'

// Zoom
export { clampViewport, pixelToFraction, indicesToFractions, fractionsToIndices } from './utils/zoom'

// Animation
export { resolveAnimate, EASE_OUT_EXPO, EASE_SPRING } from './utils/animate'
export type { AnimateConfig, AnimateMode, ResolvedAnimate } from './utils/animate'
