import { useState, useRef, useCallback, useMemo, useEffect } from "react";

/*
  RAMTT Chart System v2
  
  What Perplexity does right (from pixel analysis):
  - Thin line (~1.5px), no smoothing, raw point-to-point
  - Very subtle area gradient (8-10% opacity → 0%)
  - Sparse axes: left Y, bottom X, very light gray
  - No grid lines except one dashed reference line (prev close)
  - Clean white tooltip card, monospace numbers
  - Volume mini-chart below with red/green candles
  - Massive whitespace, no container borders
  - Pre-market / after-hours zone with opacity + dashed divider
  - The overall feel: restrained, confident, data-first
  
  RAMTT adaptation:
  - Same restraint and confidence
  - Power / HR / Cadence data instead of price
  - Zone reference lines instead of prev close
  - Intensity-colored volume (zone colors) instead of red/green
  - Our typography: Cormorant Garamond, JetBrains Mono, Space Grotesk
*/

// ─── Data Generation ───

function generateSessionData(points = 240) {
  const power = [];
  const hr = [];
  const cadence = [];
  const now = new Date(2026, 2, 31, 7, 0, 0);

  let pBase = 0, hBase = 65, cBase = 0;

  for (let i = 0; i < points; i++) {
    const t = i / points;
    const time = new Date(now.getTime() + i * 15000); // 15s intervals = 1hr session
    const mins = `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`;

    // Warmup (0-10%)
    if (t < 0.10) {
      pBase = 80 + (t / 0.10) * 100;
      hBase = 65 + (t / 0.10) * 55;
      cBase = 70 + (t / 0.10) * 15;
    }
    // Steady Z2 (10-20%)
    else if (t < 0.20) {
      pBase = 185 + Math.sin(t * 40) * 8;
      hBase = 125 + Math.sin(t * 30) * 3;
      cBase = 88 + Math.sin(t * 20) * 2;
    }
    // Build to tempo (20-30%)
    else if (t < 0.30) {
      const p = (t - 0.20) / 0.10;
      pBase = 185 + p * 55;
      hBase = 125 + p * 20;
      cBase = 88 + p * 5;
    }
    // Intervals: 4x4min @ threshold / 3min recovery (30-75%)
    else if (t < 0.75) {
      const intervalTime = (t - 0.30) / 0.45;
      const intervalNum = Math.floor(intervalTime * 4);
      const withinInterval = (intervalTime * 4) % 1;
      const isWork = withinInterval < 0.57; // 4min work out of 7min cycle
      if (isWork) {
        pBase = 265 + Math.sin(withinInterval * Math.PI * 0.5) * 15 + intervalNum * 5;
        hBase = 155 + withinInterval * 12 + intervalNum * 2;
        cBase = 95 + Math.sin(withinInterval * 10) * 2;
      } else {
        const recPhase = (withinInterval - 0.57) / 0.43;
        pBase = 140 - recPhase * 20;
        hBase = 165 - recPhase * 25;
        cBase = 78 + Math.sin(recPhase * 5) * 3;
      }
    }
    // Cooldown (75-100%)
    else {
      const cd = (t - 0.75) / 0.25;
      pBase = 160 - cd * 100;
      hBase = 140 - cd * 55;
      cBase = 80 - cd * 15;
    }

    const pNoise = (Math.random() - 0.5) * 18;
    const hNoise = (Math.random() - 0.5) * 4;
    const cNoise = (Math.random() - 0.5) * 4;

    power.push({ time, label: mins, value: Math.max(0, Math.round(pBase + pNoise)) });
    hr.push({ time, label: mins, value: Math.max(55, Math.round(hBase + hNoise)) });
    cadence.push({ time, label: mins, value: Math.max(0, Math.round(cBase + cNoise)) });
  }

  return { power, hr, cadence };
}

// ─── Scales ───

function scaleLinear(domain, range) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const fn = (v) => r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
  fn.inv = (px) => d0 + ((px - r0) / (r1 - r0)) * (d1 - d0);
  fn.domain = domain;
  fn.range = range;
  return fn;
}

function niceExtent(data, pad = 0.05) {
  const vals = data.map(d => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const step = Math.pow(10, Math.floor(Math.log10(range)));
  const niceMin = Math.floor((min - range * pad) / step) * step;
  const niceMax = Math.ceil((max + range * pad) / step) * step;
  return [niceMin, niceMax];
}

function generateTicks(min, max, count = 4) {
  const range = max - min;
  const rawStep = range / count;
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const nice = [1, 2, 2.5, 5, 10];
  let step = mag;
  for (const n of nice) {
    if (n * mag >= rawStep) { step = n * mag; break; }
  }
  const ticks = [];
  let t = Math.ceil(min / step) * step;
  while (t <= max) {
    ticks.push(t);
    t += step;
    t = Math.round(t * 1e10) / 1e10;
  }
  return ticks;
}

// ─── Path builder (NO smoothing — raw data, like Perplexity) ───

function buildLine(data, sx, sy) {
  if (!data.length) return "";
  return data.map((d, i) =>
    `${i === 0 ? "M" : "L"}${sx(i).toFixed(1)},${sy(d.value).toFixed(1)}`
  ).join("");
}

function buildArea(data, sx, sy, chartH) {
  if (!data.length) return "";
  const line = data.map((d, i) =>
    `${i === 0 ? "M" : "L"}${sx(i).toFixed(1)},${sy(d.value).toFixed(1)}`
  ).join("");
  return `${line}L${sx(data.length - 1).toFixed(1)},${chartH}L${sx(0).toFixed(1)},${chartH}Z`;
}

// ─── Zone definitions ───

const POWER_ZONES = [
  { label: "Z1", min: 0, max: 130, color: "#94a3b8" },
  { label: "Z2", min: 130, max: 185, color: "#22c55e" },
  { label: "Z3", min: 185, max: 240, color: "#eab308" },
  { label: "Z4", min: 240, max: 290, color: "#f97316" },
  { label: "Z5", min: 290, max: 340, color: "#ef4444" },
  { label: "Z6", min: 340, max: 9999, color: "#dc2626" },
];

function getZone(val) {
  for (const z of POWER_ZONES) if (val >= z.min && val < z.max) return z;
  return POWER_ZONES[POWER_ZONES.length - 1];
}

// ─── Fonts ───

function Fonts() {
  useEffect(() => {
    const id = "ramtt-chart-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
}

// ─── Main Chart ───

function Chart({ data, width, height, color = "#16a34a", refLine, refLabel, unit = "W" }) {
  const svgRef = useRef(null);
  const [hover, setHover] = useState(null);

  const padL = 48;
  const padR = 12;
  const padT = 8;
  const padB = 24;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const [yMin, yMax] = useMemo(() => niceExtent(data), [data]);
  const yTicks = useMemo(() => generateTicks(yMin, yMax, 4), [yMin, yMax]);
  const sx = useMemo(() => scaleLinear([0, data.length - 1], [0, chartW]), [data.length, chartW]);
  const sy = useMemo(() => scaleLinear([yMin, yMax], [chartH, 0]), [yMin, yMax, chartH]);

  const lineD = useMemo(() => buildLine(data, sx, sy), [data, sx, sy]);
  const areaD = useMemo(() => buildArea(data, sx, sy, chartH), [data, sx, sy, chartH]);

  const gradId = useMemo(() => `ag-${Math.random().toString(36).slice(2, 8)}`, []);

  // X labels: show ~6
  const xLabels = useMemo(() => {
    const step = Math.max(1, Math.floor(data.length / 6));
    const labels = [];
    for (let i = 0; i < data.length; i += step) labels.push({ i, label: data[i].label });
    return labels;
  }, [data]);

  const onMove = useCallback((e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const mx = e.clientX - rect.left - padL;
    const idx = Math.round(sx.inv(mx));
    const ci = Math.max(0, Math.min(data.length - 1, idx));
    setHover({ i: ci, x: sx(ci), y: sy(data[ci].value), d: data[ci] });
  }, [data, sx, sy, padL]);

  const onLeave = useCallback(() => setHover(null), []);

  const refY = refLine != null ? sy(refLine) : null;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      style={{ display: "block", overflow: "visible", cursor: "crosshair" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.10" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
        <clipPath id={`${gradId}-clip`}>
          <rect x="0" y="0" width={chartW} height={chartH} />
        </clipPath>
      </defs>

      <g transform={`translate(${padL},${padT})`}>
        {/* Y axis labels */}
        {yTicks.map(t => {
          const y = sy(t);
          return (
            <text
              key={t}
              x={-10}
              y={y + 3}
              textAnchor="end"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 300,
                fill: "#a1a1aa",
              }}
            >
              {t.toLocaleString()}
            </text>
          );
        })}

        {/* Chart area clipped */}
        <g clipPath={`url(#${gradId}-clip)`}>
          {/* Area fill */}
          <path d={areaD} fill={`url(#${gradId})`} />

          {/* Reference line (e.g. FTP, avg, threshold) */}
          {refY != null && refY >= 0 && refY <= chartH && (
            <g>
              <line
                x1={0} y1={refY} x2={chartW} y2={refY}
                stroke="#a1a1aa"
                strokeWidth="0.75"
                strokeDasharray="4 3"
              />
              <text
                x={chartW + 4}
                y={refY + 3}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  fontWeight: 400,
                  fill: "#a1a1aa",
                }}
              >
                {refLabel || refLine}
              </text>
            </g>
          )}

          {/* Main line */}
          <path
            d={lineD}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Hover crosshair */}
          {hover && (
            <g>
              <line
                x1={hover.x} y1={0} x2={hover.x} y2={chartH}
                stroke="#71717a"
                strokeWidth="0.5"
              />
              <circle
                cx={hover.x}
                cy={hover.y}
                r={3}
                fill="#fff"
                stroke={color}
                strokeWidth={1.5}
              />
            </g>
          )}
        </g>

        {/* X axis labels */}
        {xLabels.map(({ i, label }) => (
          <text
            key={i}
            x={sx(i)}
            y={chartH + 16}
            textAnchor="middle"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 300,
              fill: "#a1a1aa",
            }}
          >
            {label}
          </text>
        ))}

        {/* Tooltip */}
        {hover && (
          <Tooltip
            x={hover.x}
            y={hover.y}
            d={hover.d}
            unit={unit}
            chartW={chartW}
            chartH={chartH}
          />
        )}
      </g>
    </svg>
  );
}

function Tooltip({ x, y, d, unit, chartW, chartH }) {
  const zone = getZone(d.value);
  const w = 130;
  const h = 58;
  let tx = x + 12;
  let ty = y - h - 8;
  if (tx + w > chartW) tx = x - w - 12;
  if (ty < 0) ty = y + 12;

  return (
    <foreignObject x={tx} y={ty} width={w} height={h} style={{ overflow: "visible" }}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          background: "#fff",
          borderRadius: "4px",
          padding: "6px 8px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 0 0 0.5px rgba(0,0,0,0.05)",
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontSize: "9px", color: "#71717a", fontWeight: 400, marginBottom: "2px" }}>
          {d.label}
          <span style={{
            marginLeft: "6px",
            fontSize: "8px",
            fontWeight: 500,
            color: zone.color,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            {zone.label}
          </span>
        </div>
        <div style={{ fontSize: "16px", fontWeight: 500, color: "#18181b", letterSpacing: "-0.02em" }}>
          {d.value.toLocaleString()}
          <span style={{ fontSize: "10px", color: "#a1a1aa", fontWeight: 300, marginLeft: "2px" }}>{unit}</span>
        </div>
      </div>
    </foreignObject>
  );
}

// ─── Volume-style mini chart (zone colored) ───

function MiniChart({ data, width, height, sx }) {
  const padL = 48;
  const padR = 12;
  const chartW = width - padL - padR;
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const barW = Math.max(1, (chartW / data.length) - 0.5);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      style={{ display: "block" }}
    >
      <g transform={`translate(${padL}, 0)`}>
        {data.map((d, i) => {
          const zone = getZone(d.value);
          const bh = (d.value / maxVal) * (height - 4);
          const bx = (i / data.length) * chartW;
          return (
            <rect
              key={i}
              x={bx}
              y={height - bh - 2}
              width={barW}
              height={bh}
              fill={zone.color}
              opacity={0.35}
              rx={0.5}
            />
          );
        })}
      </g>
    </svg>
  );
}

// ─── Demo Page ───

export default function RAMTTChartV2() {
  const [tab, setTab] = useState("power");
  const session = useMemo(() => generateSessionData(240), []);
  const containerRef = useRef(null);
  const [w, setW] = useState(720);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const cw = entries[0].contentRect.width;
      if (cw > 100) setW(cw);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const data = session[tab];
  const avg = Math.round(data.reduce((s, d) => s + d.value, 0) / data.length);
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));

  const config = {
    power: { unit: "W", color: "#16a34a", refLine: 240, refLabel: "FTP 240W" },
    hr: { unit: "bpm", color: "#16a34a", refLine: 150, refLabel: "LT2 150bpm" },
    cadence: { unit: "rpm", color: "#16a34a", refLine: 90, refLabel: "Target 90rpm" },
  }[tab];

  const tabs = [
    { key: "power", label: "Power" },
    { key: "hr", label: "Heart Rate" },
    { key: "cadence", label: "Cadence" },
  ];

  return (
    <div style={{
      background: "#fff",
      minHeight: "100vh",
      color: "#18181b",
    }}>
      <Fonts />

      <div ref={containerRef} style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "40px 24px",
      }}>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "26px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            marginBottom: "2px",
          }}>
            Interval Session
          </div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "12px",
            color: "#a1a1aa",
            fontWeight: 400,
          }}>
            Mar 31, 2026 · 07:00 – 08:00 · 4×4 min @ FTP
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: "32px",
          marginBottom: "24px",
          borderBottom: "1px solid #f4f4f5",
          paddingBottom: "16px",
        }}>
          <Stat label="Avg" value={avg} unit={config.unit} />
          <Stat label="Max" value={max} unit={config.unit} />
          <Stat label="Min" value={min} unit={config.unit} />
          <Stat label="Duration" value="1:00:00" unit="" />
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex",
          gap: "0",
          marginBottom: "20px",
          borderBottom: "1px solid #f4f4f5",
        }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "12px",
                fontWeight: tab === t.key ? 500 : 400,
                color: tab === t.key ? "#18181b" : "#a1a1aa",
                background: "none",
                border: "none",
                borderBottom: tab === t.key ? "1.5px solid #18181b" : "1.5px solid transparent",
                padding: "6px 14px 8px",
                cursor: "pointer",
                transition: "all 0.15s",
                marginBottom: "-1px",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Main chart */}
        <Chart
          data={data}
          width={w}
          height={280}
          color={config.color}
          refLine={config.refLine}
          refLabel={config.refLabel}
          unit={config.unit}
        />

        {/* Mini chart (zone-colored intensity) */}
        <div style={{ marginTop: "2px" }}>
          <MiniChart data={data} width={w} height={36} />
        </div>

        {/* Zone legend — very subtle */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          paddingLeft: "48px",
        }}>
          {POWER_ZONES.slice(0, 5).map(z => (
            <div key={z.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: z.color,
                opacity: 0.6,
              }} />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "9px",
                color: "#a1a1aa",
                fontWeight: 400,
              }}>
                {z.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, unit }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "10px",
        color: "#a1a1aa",
        fontWeight: 400,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: "2px",
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "15px",
        fontWeight: 400,
        color: "#18181b",
        letterSpacing: "-0.01em",
      }}>
        {typeof value === "number" ? value.toLocaleString() : value}
        {unit && (
          <span style={{ fontSize: "10px", color: "#a1a1aa", fontWeight: 300, marginLeft: "2px" }}>{unit}</span>
        )}
      </div>
    </div>
  );
}
