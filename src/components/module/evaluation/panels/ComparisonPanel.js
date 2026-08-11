import React from "react";
import { CheckCircleIcon, XCircleIcon, LayersIcon, InfoIcon } from "../icons";
import PercentBars from "../charts/PercentBars";

const featureRows = [
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

const benchmarkRows = [
  { study: "Audinys et al. (2026), Applied Sciences", method: "Ensemble (DeepLabV3+, UperNet, SegFormer)", dice: "0.880", iou: "0.804" },
  { study: "Lin et al. (2021), Applied Sciences", method: "YOLACT++ instance segmentation", dice: "—", iou: "—" },
  { study: "Liang, Garnavi et al. (2015), EMBC/IEEE", method: "Multiscale superpixel clustering (color-based)", dice: "0.783", iou: "0.698" },
  { study: "XORA Module 02", method: "Attention U-Net (texture-driven, skin-tone independent)", dice: "0.762", iou: "0.686", highlighted: true },
];

const segmentationGaps = [
  "No reviewed segmentation study reports per-skin-tone Dice/IoU",
  "Reviewed studies rely on large datasets (6,252+ patches) or color-only features (a*/b* channels) rather than skin-tone-adaptive preprocessing",
  "No reviewed study combines segmentation + severity staging + fairness evaluation in a single pipeline",
  "No reviewed study validates performance specifically on darker skin tones (Fitzpatrick V/VI)",
];

const classificationAccuracy = [
  { label: "Aijaz et al. (2022)", value: 96.0 },
  { label: "Rios et al. (2025)", value: 97.5 },
  { label: "Hammad et al. (2023)", value: 96.2 },
  { label: "Chakraborty et al. (2024)", value: 97.2 },
  { label: "Nieniewski et al. (2023)", value: 80.1 },
  { label: "XORA (this work)", value: 77.4, tag: "This Work" },
];

const segmentationAccuracyRows = [
  { study: "Audinys et al. (2026)", dice: "0.880", iou: "0.804" },
  { study: "Liang, Garnavi et al. (2015)", dice: "0.783", iou: "0.698" },
  { study: "XORA (this work)", dice: "0.762", iou: "0.686", highlighted: true },
];

const stillValuable = [
  "Only system reporting fairness across skin tones- no other study does this, regardless of their accuracy",
  "Detects lesions using texture, which works the same for every skin tone",
  "Gives 3 severity stages instead of a single yes/no answer",
  "A complete working app, not just a research script",
];

const SectionHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold tracking-wide uppercase text-slate-400">{children}</h3>
);

export default function ComparisonPanel() {
  return (
    <div className="space-y-8">
      {/* Feature comparison */}
      <section>
        <SectionHeading>XORA vs Existing Psoriasis Detection Modules</SectionHeading>
        <div className="overflow-hidden rounded-2xl border border-[#00B4D8]/15">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#0A1628]">
                  <th className="w-1/4 px-4 py-3 font-semibold text-left text-slate-300">Feature</th>
                  <th className="px-4 py-3 font-semibold text-left w-3/8 text-slate-400">Existing Psoriasis Detection Modules</th>
                  <th className="w-3/8 px-4 py-3 text-left font-semibold text-[#00B4D8]">XORA Module 02 (This Work)</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-[#0d1f33]" : "bg-[#0A1628]/60"}>
                    <td className="px-4 py-3 font-medium text-white align-top">{row.feature}</td>
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

        <div className="mt-4 rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4">
          <div className="flex items-center gap-2 mb-2">
            <LayersIcon className="w-4 h-4 text-slate-400" />
            <p className="text-xs font-semibold tracking-wide uppercase text-slate-400">Common to both approaches</p>
          </div>
          <ul className="flex flex-wrap text-sm gap-x-6 gap-y-1 text-slate-300">
            {commonItems.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-slate-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

     

      {/* Accuracy vs published research - honest comparison */}
      <section className="border-t border-[#00B4D8]/10 pt-6">
        <SectionHeading>Accuracy vs Published Research</SectionHeading>

        <div className="rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4 sm:p-5">
          <p className="mb-3 text-xs font-semibold tracking-wide uppercase text-slate-400">
            Classification accuracy
          </p>
          <PercentBars items={classificationAccuracy} />
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[440px] space-y-2">
            <div className="grid grid-cols-[2fr_80px_80px] gap-3 rounded-lg bg-[#0A1628] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Segmentation study</span>
              <span className="text-right">Dice</span>
              <span className="text-right">IoU</span>
            </div>
            {segmentationAccuracyRows.map((row) => (
              <div
                key={row.study}
                className={`grid grid-cols-[2fr_80px_80px] items-center gap-3 rounded-xl px-4 py-3 ${
                  row.highlighted
                    ? "border-2 border-[#00B4D8]/60 bg-[#00B4D8]/5"
                    : "border border-[#00B4D8]/10 bg-[#0d1f33]"
                }`}
              >
                <span className={`flex flex-wrap items-center gap-2 text-sm font-medium ${row.highlighted ? "text-white" : "text-slate-200"}`}>
                  {row.study}
                  {row.highlighted && (
                    <span className="inline-flex items-center rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00B4D8]">
                      This Work
                    </span>
                  )}
                </span>
                <span className={`text-right text-sm font-semibold tabular-nums ${row.highlighted ? "text-[#00B4D8]" : "text-slate-300"}`}>
                  {row.dice}
                </span>
                <span className={`text-right text-sm font-semibold tabular-nums ${row.highlighted ? "text-[#00B4D8]" : "text-slate-300"}`}>
                  {row.iou}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-3 rounded-2xl border border-slate-500/25 bg-slate-500/[0.06] p-4">
          <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
          <p className="text-sm leading-relaxed text-slate-300">
            XORA&apos;s numbers are lower than most published studies. Two real reasons: (1) XORA
            trained on only ~1700images vs. 6,252+ in the top study, and (2) XORA does 3-class
            severity staging, a harder task than the simple yes/no detection used by most other
            studies.
          </p>
        </div>
      </section>

      {/* Why still valuable */}
      <section className="border-t border-[#00B4D8]/10 pt-6">
        <SectionHeading>Why XORA is Still Valuable</SectionHeading>
        <div className="space-y-2">
          {stillValuable.map((point) => (
            <div key={point} className="flex items-start gap-2 rounded-xl border border-[#00B4D8]/10 bg-[#0d1f33] px-4 py-3">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#00B4D8]" />
              <span className="text-sm leading-relaxed text-slate-300">{point}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
