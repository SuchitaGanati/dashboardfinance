"use client";

import React, { useState } from "react";

type SpendingsSlice = { label: string; value: number; color: string };

const salesData: SpendingsSlice[] = [
  { label: "Food",     value: 4000, color: "#3b82f6" },
  { label: "Shopping", value: 3000, color: "#10b981" },
  { label: "Bills",    value: 2000, color: "#f59e0b" },
  { label: "Travel",   value: 1500, color: "#f43f5e" },
];

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeArc = (
  cx: number, cy: number, r: number,
  startAngle: number, endAngle: number,
) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end   = polarToCartesian(cx, cy, r, startAngle);
  const large = endAngle - startAngle > 180 ? "1" : "0";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
};

export default function SpendingBreakdown() {
  const SIZE   = 200;
  const STROKE = 28;
  const RADIUS = (SIZE - STROKE) / 2;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const BITE_R = STROKE * 0.55;

  const total = salesData.reduce((s, d) => s + d.value, 0);
  const [hovered, setHovered] = useState<number | null>(null);

  const slices = salesData.reduce<{
    _cursor: number;
    result: (SpendingsSlice & { startAngle: number; endAngle: number; bitePoint: { x: number; y: number }; percent: number })[];
  }>(
    (acc, slice) => {
      const angle = (slice.value / total) * 360;
      const start = acc._cursor;
      const end   = start + angle;
      acc.result.push({
        ...slice,
        startAngle: start,
        endAngle: end,
        bitePoint: polarToCartesian(CX, CY, RADIUS, start),
        percent: (slice.value / total) * 100,
      });
      return { _cursor: end, result: acc.result };
    },
    { _cursor: -90, result: [] },
  ).result;

  return (
    <div className="w-full bg-card text-card-foreground border border-border p-5 rounded-xl shadow-sm">
      <h2 className="text-sm font-semibold text-foreground mb-4">Spending Breakdown</h2>

      {/* Chart + centre label */}
      <div className="relative flex justify-center">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-44">
          <defs>
            {slices.map((s, i) => (
              <mask key={s.label} id={`bite-mask-${i}`} maskUnits="userSpaceOnUse">
                <rect width={SIZE} height={SIZE} fill="white" />
                <circle cx={s.bitePoint.x} cy={s.bitePoint.y} r={BITE_R} fill="black" />
              </mask>
            ))}
          </defs>

          {slices.map((s, i) => (
            <path
              key={s.label}
              d={describeArc(CX, CY, RADIUS, s.startAngle, s.endAngle)}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE - 6}
              strokeLinecap="round"
              mask={`url(#bite-mask-${i})`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all duration-150"
              opacity={hovered === null || hovered === i ? 1 : 0.45}
            />
          ))}

          {/* Centre text */}
          <text x={CX} y={CY - 6} textAnchor="middle" className="fill-foreground" fontSize={13} fontWeight={600}>
            {hovered !== null ? slices[hovered].label : "Total"}
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" className="fill-muted-foreground" fontSize={11}>
            {hovered !== null
              ? `₹${slices[hovered].value.toLocaleString("en-IN")}`
              : `₹${total.toLocaleString("en-IN")}`}
          </text>
        </svg>

        {/* Hover tooltip */}
        {hovered !== null && (
          <div className="absolute top-0 right-0 bg-popover text-popover-foreground border border-border rounded-lg px-2.5 py-1 text-xs shadow-md pointer-events-none">
            {slices[hovered].percent.toFixed(1)}%
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2.5">
        {slices.map((s, i) => (
          <div
            key={s.label}
            className="flex items-center justify-between cursor-default"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{s.percent.toFixed(0)}%</span>
              <span className="text-xs font-medium text-foreground tabular-nums">
                ₹{s.value.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}