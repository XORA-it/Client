import React from "react";

/**
 * Icon + big number + label + short caption tile, matching the research-gap
 * card style already used on PsoriasisHome (rounded-2xl border bg-[#0d1f33]).
 */
export default function MetricCard({ icon: Icon, value, label, caption, accent = false }) {
  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        accent
          ? "border-[#00B4D8]/50 bg-[#00B4D8]/5"
          : "border-[#00B4D8]/15 bg-[#0d1f33] hover:border-[#00B4D8]/40"
      }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00B4D8]/10">
        <Icon className="h-5 w-5 text-[#00B4D8]" />
      </div>
      <p className="mt-4 text-2xl font-bold leading-none text-white">{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-200">{label}</p>
      {caption && <p className="mt-1 text-sm leading-relaxed text-slate-400">{caption}</p>}
    </div>
  );
}
