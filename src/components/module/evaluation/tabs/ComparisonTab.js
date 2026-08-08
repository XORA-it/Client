import React from "react";
import { CheckCircleIcon, XCircleIcon, LayersIcon } from "../icons";

const rows = [
  { feature: "Skin-tone awareness", existing: "Most rely on color/erythema, tone-blind", xora: "ITA-based Light/Medium/Dark classification" },
  { feature: "Preprocessing fairness", existing: "Fixed preprocessing for all skin tones", xora: "Adaptive CLAHE (clip-limit per tone)" },
  { feature: "Detection signal", existing: "Redness/erythema-based", xora: "Silvery-white scale texture-based (works across tones)" },
  { feature: "Severity staging", existing: "Often binary (disease/no disease)", xora: "3-class: Normal / Early / Full Psoriasis" },
  { feature: "Fairness evaluation", existing: "Rarely reported per skin tone", xora: "Disease-only IoU reported per skin-tone group" },
  { feature: "Dark-skin representation", existing: "Datasets skew toward light skin", xora: "Skin-tone-balanced augmentation (synthetic + real)" },
  { feature: "Explainability of output", existing: "Label-only in most systems", xora: "Mask overlay + coverage % + confidence shown to user" },
  { feature: "Deployment", existing: "Often research-only, no interface", xora: "Full web app (Flask API + React frontend)" },
];

const commonItems = [
  "CNN-based deep learning backbone",
  "Image-based (photo) input",
  "Binary lesion segmentation as an internal step",
];

export default function ComparisonTab() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-[#00B4D8]/15">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#0A1628]">
                <th className="w-1/4 px-4 py-3 text-left font-semibold text-slate-300">Feature</th>
                <th className="w-3/8 px-4 py-3 text-left font-semibold text-slate-400">Existing Psoriasis Detection Modules</th>
                <th className="w-3/8 px-4 py-3 text-left font-semibold text-[#00B4D8]">XORA Module 02 (This Work)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-[#0d1f33]" : "bg-[#0A1628]/60"}>
                  <td className="px-4 py-3 align-top font-medium text-white">{row.feature}</td>
                  <td className="px-4 py-3 align-top text-slate-400">
                    <div className="flex items-start gap-2">
                      <XCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                      <span>{row.existing}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-slate-200">
                    <div className="flex items-start gap-2">
                      <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#00B4D8]" />
                      <span>{row.xora}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Common ground - not part of the differentiation grid */}
      <div className="rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4">
        <div className="mb-2 flex items-center gap-2">
          <LayersIcon className="h-4 w-4 text-slate-400" />
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Common to both approaches</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-300">
          {commonItems.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
