import React from "react";

/**
 * Horizontal bar chart on a fixed 0-100% scale. Every bar uses the same
 * accent color and a length strictly proportional to its value - used for
 * the honest accuracy comparison, so "This Work" reads exactly as low as
 * its real number instead of being dressed up or re-scaled to look closer.
 */
export default function PercentBars({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="flex w-40 shrink-0 flex-wrap items-center gap-1.5 text-sm text-slate-300">
            {item.label}
            {item.tag && (
              <span className="inline-flex items-center rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#00B4D8]">
                {item.tag}
              </span>
            )}
          </span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#0A1628]">
            <div
              className="h-full rounded-full bg-[#00B4D8] transition-all duration-700 ease-out"
              style={{ width: `${item.value}%` }}
            />
          </div>
          <span className="w-14 shrink-0 text-right text-sm font-semibold text-white tabular-nums">
            {item.value.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
}
