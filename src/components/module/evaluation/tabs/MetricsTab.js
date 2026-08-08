import React from "react";
import { TargetIcon, LayersIcon, AwardIcon, PercentIcon, ChartBarIcon } from "../icons";
import MetricCard from "../ui/MetricCard";
import HorizontalBars from "../charts/HorizontalBars";
import GroupedBars from "../charts/GroupedBars";

const perClassF1 = [
  { label: "Normal", value: 0.97 },
  { label: "Early Psoriasis", value: 0.62 },
  { label: "Psoriasis", value: 0.72 },
];

const fairnessIoU = [
  { label: "Light", value: 0.58 },
  { label: "Medium", value: 0.78, flagged: true },
  { label: "Dark", value: 0.67 },
];

const SectionHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{children}</h3>
);

export default function MetricsTab() {
  return (
    <div className="space-y-8">
      {/* Segmentation */}
      <section>
        <SectionHeading>Segmentation - Attention U-Net</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard icon={TargetIcon} value="0.686" label="IoU (test)" caption="Intersection over union on held-out test set" />
          <MetricCard icon={LayersIcon} value="0.762" label="Dice (test)" caption="Dice coefficient on held-out test set" />
          <MetricCard icon={AwardIcon} value="0.872" label="Dice (best val)" caption="Best Dice score reached during training" />
        </div>
      </section>

      {/* Severity classification */}
      <section>
        <SectionHeading>Severity Classification - MobileNetV2</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard icon={PercentIcon} value="77.4%" label="Accuracy" caption="41 of 53 test images classified correctly" />
          <div className="rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-5 sm:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <ChartBarIcon className="h-4 w-4 text-[#00B4D8]" />
              <span className="text-sm font-medium text-slate-200">Per-class F1 score</span>
            </div>
            <HorizontalBars items={perClassF1} />
          </div>
        </div>
      </section>

      {/* Fairness - key contribution */}
      <section className="rounded-2xl border-2 border-[#00B4D8]/50 bg-[#00B4D8]/5 p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00B4D8]">
            Key Contribution
          </span>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#00B4D8]">
            Fairness - Disease-only IoU per skin tone
          </h3>
        </div>

        <GroupedBars items={fairnessIoU} />

        <p className="mt-1 text-center text-xs text-slate-400">
          *Medium based on only 3 test images - limited sample
        </p>

        <p className="mt-4 border-t border-[#00B4D8]/10 pt-4 text-sm leading-relaxed text-slate-300">
          Disease-only IoU excludes Normal (blank-mask) images, which trivially score ~1.0 and
          inflate pooled results - this is the honest fairness metric.
        </p>
      </section>
    </div>
  );
}
