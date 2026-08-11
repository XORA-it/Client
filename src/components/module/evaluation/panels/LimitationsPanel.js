import React from "react";

const limitations = [
  "Small dataset- only ~1700original images",
  "Dark-skin images for “Early Psoriasis” are still limited",
  "“Early Psoriasis” is the hardest class to detect (F1 score 0.62)",
];

const SectionHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-slate-400">{children}</h3>
);

export default function LimitationsPanel() {
  return (
    <div>
      <SectionHeading>Limitations</SectionHeading>
      <div className="rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4">
        <ul className="space-y-2.5">
          {limitations.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
