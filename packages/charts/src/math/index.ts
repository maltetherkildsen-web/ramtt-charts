// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// Re-export math layer from lib/charts
export {
  scaleLinear,
  linePath,
  areaPath,
  arcPath,
  pieLayout,
  niceTicks,
  niceNum,
  lttb,
  extent,
  extentOf,
  bisectNearest,
  bisectData,
  nearest2d,
  stackSeries,
  waterfallLayout,
  treemapLayout,
  interpolateColor,
  hexToRgb,
  rgbToHex,
} from '../../../../lib/charts/index'

export type {
  LinearScale,
  Accessor,
  Point,
  WaterfallItem,
  WaterfallBar,
  TreemapItem,
  TreemapRect,
} from '../../../../lib/charts/index'
