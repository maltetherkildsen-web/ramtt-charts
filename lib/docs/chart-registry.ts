// lib/docs/chart-registry.ts — Chart primitives documentation
import type { PropDef } from '@/components/docs/DocPropTable'

export interface ChartDoc {
  slug: string
  name: string
  primitive: string
  description: string
  usage: string
  props: PropDef[]
  standalone: boolean // doesn't need ChartRoot wrapper
}

export const CHART_DOCS: Record<string, ChartDoc> = {
  'line': {
    slug: 'line',
    name: 'Line chart',
    primitive: 'ChartLine',
    description: 'SVG line path from a data array. Renders inside ChartRoot. Supports custom y-accessors for multi-series.',
    standalone: false,
    usage: `import { ChartRoot } from '@ramtt/charts'
import { ChartLine } from '@ramtt/charts'
import { ChartAxisY } from '@ramtt/charts'

<ChartRoot data={data} height={200}>
  <ChartLine className="stroke-[var(--n1150)] stroke-[1.5]" />
  <ChartAxisY />
</ChartRoot>`,
    props: [
      { name: 'data', type: 'readonly number[]', description: 'Override ChartRoot data for this line' },
      { name: 'className', type: 'string', description: 'SVG path class (stroke color, width)' },
      { name: 'yDomain', type: '[number, number]', description: 'Override Y domain' },
      { name: 'yAccessor', type: '(d, i) => number', description: 'Custom Y value accessor' },
    ],
  },

  'area': {
    slug: 'area',
    name: 'Area chart',
    primitive: 'ChartArea',
    description: 'Filled area under a line. Renders a gradient fill from opacityFrom to opacityTo.',
    standalone: false,
    usage: `import { ChartRoot, ChartArea, ChartLine } from '@ramtt/charts'

<ChartRoot data={data} height={200}>
  <ChartArea gradientColor="#16a34a" />
  <ChartLine className="stroke-green-600 stroke-[1.5]" />
</ChartRoot>`,
    props: [
      { name: 'gradientColor', type: 'string', default: "'#16a34a'", description: 'Fill gradient color' },
      { name: 'opacityFrom', type: 'number', default: '0.06', description: 'Top opacity' },
      { name: 'opacityTo', type: 'number', default: '0.005', description: 'Bottom opacity' },
      { name: 'thresholdY', type: 'number', description: 'Threshold for dual-color fill' },
      { name: 'negativeColor', type: 'string', default: "'#ef4444'", description: 'Color below threshold' },
    ],
  },

  'bar': {
    slug: 'bar',
    name: 'Bar chart',
    primitive: 'ChartBar',
    description: 'Vertical bars from data array. Supports per-bar coloring, rounded corners, and highlight.',
    standalone: false,
    usage: `import { ChartRoot, ChartBar, ChartAxisY } from '@ramtt/charts'

<ChartRoot data={[40, 65, 30, 80, 55]} height={200}>
  <ChartBar className="fill-[var(--n1150)]" radius={3} gap={2} />
  <ChartAxisY />
</ChartRoot>`,
    props: [
      { name: 'gap', type: 'number', default: '1', description: 'Gap between bars in pixels' },
      { name: 'radius', type: 'number', default: '0', description: 'Corner radius' },
      { name: 'colorFn', type: '(value, index) => string', description: 'Per-bar color function' },
      { name: 'highlightIndex', type: 'number | null', description: 'Highlighted bar index' },
      { name: 'className', type: 'string', description: 'Default bar fill class' },
    ],
  },

  'zone-line': {
    slug: 'zone-line',
    name: 'Zone line',
    primitive: 'ChartZoneLine',
    description: 'Line that changes color by zone. Each zone defines a min/max range and color. Used for power/HR zone visualization.',
    standalone: false,
    usage: `import { ChartRoot, ChartZoneLine } from '@ramtt/charts'

const zones = [
  { min: 0, max: 150, color: '#16A34A', label: 'Z2' },
  { min: 150, max: 250, color: '#F59E0B', label: 'Z3' },
  { min: 250, max: Infinity, color: '#EF4444', label: 'Z5' },
]

<ChartRoot data={powerData} height={200}>
  <ChartZoneLine zones={zones} threshold={200} />
</ChartRoot>`,
    props: [
      { name: 'zones', type: 'ZoneDefinition[]', description: 'Zone color ranges', required: true },
      { name: 'threshold', type: 'number', description: 'FTP/threshold value', required: true },
      { name: 'data', type: 'readonly number[]', description: 'Override data' },
    ],
  },

  'scatter': {
    slug: 'scatter',
    name: 'Scatter plot',
    primitive: 'ChartScatter',
    description: 'XY scatter with optional size encoding. Renders circles at data positions with configurable accessors.',
    standalone: false,
    usage: `import { ChartRoot, ChartScatter } from '@ramtt/charts'

<ChartRoot data={scatterData} height={280}>
  <ChartScatter
    xAccessor={(d) => d.x}
    yAccessor={(d) => d.y}
    className="fill-blue-500"
  />
</ChartRoot>`,
    props: [
      { name: 'xAccessor', type: '(d, i) => number', description: 'X value accessor' },
      { name: 'yAccessor', type: '(d, i) => number', description: 'Y value accessor' },
      { name: 'sizeAccessor', type: '(d, i) => number', description: 'Size encoding accessor' },
      { name: 'sizeRange', type: '[number, number]', default: '[3, 16]', description: 'Min/max circle size' },
      { name: 'colorFn', type: '(d, i) => string', description: 'Per-point color function' },
    ],
  },

  'donut': {
    slug: 'donut',
    name: 'Donut chart',
    primitive: 'ChartDonut',
    description: 'Standalone donut/pie chart. Does not use ChartRoot. Renders arc segments with center label.',
    standalone: true,
    usage: `import { ChartDonut } from '@ramtt/charts'

<ChartDonut
  data={[{ label: 'Z2', value: 60 }, { label: 'Z3', value: 25 }, { label: 'Z5', value: 15 }]}
  valueAccessor={(d) => d.value}
  labelAccessor={(d) => d.label}
  colors={['#16A34A', '#F59E0B', '#EF4444']}
  centerLabel="Zone split"
  centerValue="100%"
/>`,
    props: [
      { name: 'data', type: 'readonly any[]', description: 'Data items', required: true },
      { name: 'valueAccessor', type: '(d) => number', description: 'Value accessor', required: true },
      { name: 'colors', type: 'string[]', description: 'Segment colors', required: true },
      { name: 'innerRadius', type: 'number', default: '0.6', description: 'Inner radius ratio (0=pie, 1=thin ring)' },
      { name: 'size', type: 'number', default: '220', description: 'Diameter in pixels' },
      { name: 'centerLabel', type: 'string', description: 'Center text label' },
      { name: 'centerValue', type: 'string', description: 'Center text value' },
    ],
  },

  'candlestick': {
    slug: 'candlestick',
    name: 'Candlestick',
    primitive: 'ChartCandlestick',
    description: 'OHLC candlestick chart. Green for up, red for down. Renders inside ChartRoot.',
    standalone: false,
    usage: `import { ChartRoot, ChartCandlestick } from '@ramtt/charts'

<ChartRoot data={ohlcData} height={300}>
  <ChartCandlestick />
</ChartRoot>`,
    props: [
      { name: 'openAccessor', type: '(d) => number', description: 'Open price accessor' },
      { name: 'highAccessor', type: '(d) => number', description: 'High price accessor' },
      { name: 'lowAccessor', type: '(d) => number', description: 'Low price accessor' },
      { name: 'closeAccessor', type: '(d) => number', description: 'Close price accessor' },
      { name: 'upColor', type: 'string', default: "'#22c55e'", description: 'Up candle color' },
      { name: 'downColor', type: 'string', default: "'#ef4444'", description: 'Down candle color' },
    ],
  },

  'radar': {
    slug: 'radar',
    name: 'Radar chart',
    primitive: 'ChartRadar',
    description: 'Standalone radar/spider chart. Shows multi-dimensional data on radial axes.',
    standalone: true,
    usage: `import { ChartRadar } from '@ramtt/charts'

<ChartRadar
  dimensions={['Power', 'Endurance', 'Sprint', 'Recovery', 'Technique']}
  series={[{ label: 'Athlete', values: [80, 65, 90, 70, 85], color: '#3b82f6' }]}
/>`,
    props: [
      { name: 'dimensions', type: 'string[]', description: 'Axis labels', required: true },
      { name: 'series', type: 'RadarSeries[]', description: 'Data series', required: true },
      { name: 'size', type: 'number', default: '280', description: 'Chart diameter' },
      { name: 'rings', type: 'number', default: '5', description: 'Number of grid rings' },
      { name: 'showValues', type: 'boolean', default: 'false', description: 'Show values at points' },
    ],
  },

  'radial-bar': {
    slug: 'radial-bar',
    name: 'Radial bar',
    primitive: 'ChartRadialBar',
    description: 'Standalone radial progress bars. Concentric arcs showing progress toward goals.',
    standalone: true,
    usage: `import { ChartRadialBar } from '@ramtt/charts'

<ChartRadialBar
  items={[
    { label: 'TSS', value: 85, max: 100, color: '#3b82f6' },
    { label: 'kJ', value: 2400, max: 3000, color: '#f59e0b' },
  ]}
/>`,
    props: [
      { name: 'items', type: 'RadialBarItem[]', description: 'Bar items', required: true },
      { name: 'size', type: 'number', default: '240', description: 'Chart diameter' },
      { name: 'trackWidth', type: 'number', default: '12', description: 'Track width' },
      { name: 'gap', type: 'number', default: '6', description: 'Gap between bars' },
    ],
  },

  'treemap': {
    slug: 'treemap',
    name: 'Treemap',
    primitive: 'ChartTreemap',
    description: 'Standalone treemap for hierarchical data. Rectangles sized by value.',
    standalone: true,
    usage: `import { ChartTreemap } from '@ramtt/charts'

<ChartTreemap
  data={[
    { label: 'Power', value: 40, color: '#3b82f6' },
    { label: 'Endurance', value: 30, color: '#22c55e' },
    { label: 'Sprint', value: 20, color: '#f59e0b' },
  ]}
/>`,
    props: [
      { name: 'data', type: 'TreemapItem[]', description: 'Data items', required: true },
      { name: 'width', type: 'number', default: '880', description: 'Chart width' },
      { name: 'height', type: 'number', default: '300', description: 'Chart height' },
    ],
  },

  'funnel': {
    slug: 'funnel',
    name: 'Funnel',
    primitive: 'ChartFunnel',
    description: 'Standalone funnel chart. Tapered segments showing conversion flow.',
    standalone: true,
    usage: `import { ChartFunnel } from '@ramtt/charts'

<ChartFunnel
  data={[
    { label: 'Visitors', value: 10000, color: '#3b82f6' },
    { label: 'Signups', value: 3000, color: '#22c55e' },
    { label: 'Paid', value: 800, color: '#f59e0b' },
  ]}
/>`,
    props: [
      { name: 'data', type: 'FunnelItem[]', description: 'Funnel stages', required: true },
      { name: 'width', type: 'number', default: '600', description: 'Chart width' },
      { name: 'height', type: 'number', default: '300', description: 'Chart height' },
    ],
  },

  'box-plot': {
    slug: 'box-plot',
    name: 'Box plot',
    primitive: 'ChartBoxPlot',
    description: 'Statistical box-and-whisker plot. Shows min, Q1, median, Q3, max distributions.',
    standalone: false,
    usage: `import { ChartRoot, ChartBoxPlot } from '@ramtt/charts'

<ChartRoot data={boxData} height={200}>
  <ChartBoxPlot />
</ChartRoot>`,
    props: [
      { name: 'boxWidth', type: 'number', default: '0.5', description: 'Box width ratio' },
      { name: 'color', type: 'string', default: "'var(--n1150)'", description: 'Box color' },
      { name: 'medianColor', type: 'string', default: "'#3b82f6'", description: 'Median line color' },
    ],
  },

  'heatmap': {
    slug: 'heatmap',
    name: 'Heatmap',
    primitive: 'ChartHeatmap',
    description: 'Standalone grid heatmap. Color-encodes values in a 2D grid with configurable color scale.',
    standalone: true,
    usage: `import { ChartHeatmap } from '@ramtt/charts'

<ChartHeatmap
  data={matrix}
  xLabels={['Mon','Tue','Wed','Thu','Fri']}
  yLabels={['6am','9am','12pm','3pm','6pm']}
  colorScale={[
    { value: 0, color: '#f0f9ff' },
    { value: 100, color: '#3b82f6' },
  ]}
/>`,
    props: [
      { name: 'data', type: '(number | null)[][]', description: '2D data matrix', required: true },
      { name: 'colorScale', type: 'ColorStop[]', description: 'Color interpolation stops', required: true },
      { name: 'xLabels', type: 'string[]', description: 'Column labels' },
      { name: 'yLabels', type: 'string[]', description: 'Row labels' },
      { name: 'cellSize', type: 'number', default: '14', description: 'Cell size in pixels' },
      { name: 'showValues', type: 'boolean', default: 'false', description: 'Show values in cells' },
    ],
  },

  'calendar-heatmap': {
    slug: 'calendar-heatmap',
    name: 'Calendar heatmap',
    primitive: 'ChartCalendarHeatmap',
    description: 'Standalone GitHub-style contribution calendar. Shows daily values over months.',
    standalone: true,
    usage: `import { ChartCalendarHeatmap } from '@ramtt/charts'

<ChartCalendarHeatmap
  data={contributions}
  colors={['#f0f9ff', '#bae6fd', '#38bdf8', '#0284c7', '#0c4a6e']}
/>`,
    props: [
      { name: 'data', type: 'CalendarDay[]', description: 'Day values', required: true },
      { name: 'colors', type: 'string[]', description: 'Color scale (5 stops)', required: true },
      { name: 'cellSize', type: 'number', default: '11', description: 'Cell size' },
      { name: 'showMonthLabels', type: 'boolean', default: 'true', description: 'Show month labels' },
      { name: 'showDayLabels', type: 'boolean', default: 'true', description: 'Show day labels' },
    ],
  },

  'fuel-lollipop': {
    slug: 'fuel-lollipop',
    name: 'Fuel lollipop',
    primitive: 'ChartFuelLollipop',
    description: 'Lollipop chart for fueling timeline. Shows intake events as circles on stems.',
    standalone: false,
    usage: `import { ChartRoot, ChartFuelLollipop } from '@ramtt/charts'

<ChartRoot data={fuelData} height={120}>
  <ChartFuelLollipop />
</ChartRoot>`,
    props: [
      { name: 'data', type: 'readonly number[]', description: 'Override data' },
      { name: 'className', type: 'string', description: 'SVG class' },
    ],
  },

  'annotation': {
    slug: 'annotation',
    name: 'Annotation',
    primitive: 'ChartAnnotation',
    description: 'Overlay annotations on any chart. Supports point, range, and line annotations with labels.',
    standalone: false,
    usage: `import { ChartRoot, ChartLine, ChartAnnotation } from '@ramtt/charts'

<ChartRoot data={data} height={200}>
  <ChartLine />
  <ChartAnnotation annotations={[
    { type: 'point', x: 50, label: 'Peak' },
    { type: 'range', x0: 20, x1: 40, label: 'Interval' },
  ]} />
</ChartRoot>`,
    props: [
      { name: 'annotations', type: 'Annotation[]', description: 'Annotation definitions', required: true },
    ],
  },
}

export function getChartDoc(slug: string): ChartDoc | undefined {
  return CHART_DOCS[slug]
}

export function getAllChartSlugs(): string[] {
  return Object.keys(CHART_DOCS)
}
