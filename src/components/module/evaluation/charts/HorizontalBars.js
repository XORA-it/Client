import React from "react";

/**
 * Small horizontal bar chart - single metric (accent color) across
 * labelled categories. Values are expected on a 0-1 scale.
 */
export default function HorizontalBars({ items }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-32 shrink-0 text-sm text-slate-300">{item.label}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#0A1628]">
            <div
              className="h-full rounded-full bg-[#00B4D8] transition-all duration-700 ease-out"
              style={{ width: `${Math.round(item.value * 100)}%` }}
            />
          </div>
          <span className="w-12 shrink-0 text-right text-sm font-semibold text-white tabular-nums">
            {item.value.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}
