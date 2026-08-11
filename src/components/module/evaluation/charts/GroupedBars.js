import React from "react";

const CHART_HEIGHT = 140;
const BAR_WIDTH = 44;
const GAP = 36;

/**
 * Small vertical bar chart - IoU (0-1) per skin-tone group. A single
 * metric across three categories, so every bar shares the same accent
 * hue; a `flagged` bar (limited sample size) gets a diagonal hatch
 * overlay instead of a different color, so it stays legible under
 * color-blind simulation and print.
 */
export default function GroupedBars({ items }) {
  const width = items.length * (BAR_WIDTH + GAP) + GAP;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${CHART_HEIGHT + 50}`}
        className="mx-auto w-full max-w-md"
        role="img"
        aria-label="Disease-only IoU by skin tone"
      >
        <defs>
          <pattern id="fairness-hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="#00B4D8" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#7fe3f5" strokeWidth="2" />
          </pattern>
        </defs>

        <line x1="0" y1={CHART_HEIGHT} x2={width} y2={CHART_HEIGHT} stroke="#1c3350" strokeWidth="1" />

        {items.map((item, i) => {
          const barHeight = Math.max(item.value, 0) * (CHART_HEIGHT - 24);
          const x = GAP + i * (BAR_WIDTH + GAP) - BAR_WIDTH / 2;
          const y = CHART_HEIGHT - barHeight;
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={y}
                width={BAR_WIDTH}
                height={barHeight}
                rx="4"
                fill={item.flagged ? "url(#fairness-hatch)" : "#00B4D8"}
              />
              <text x={x + BAR_WIDTH / 2} y={y - 8} textAnchor="middle" className="fill-white text-[13px] font-semibold">
                {item.value.toFixed(2)}
                {item.flagged ? "*" : ""}
              </text>
              <text x={x + BAR_WIDTH / 2} y={CHART_HEIGHT + 22} textAnchor="middle" className="fill-slate-300 text-[12px]">
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
