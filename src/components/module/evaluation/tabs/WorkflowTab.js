import React, { useState } from "react";
import {
  ShieldIcon,
  UploadIcon,
  FingerprintIcon,
  ContrastIcon,
  CropIcon,
  CpuIcon,
  TagIcon,
  DocumentIcon,
  ChevronDownIcon,
} from "../icons";

const steps = [
  {
    id: 1,
    icon: UploadIcon,
    title: "Input - skin lesion image",
    input: "User-uploaded photo (JPEG/PNG)",
    output: "Decoded BGR pixel array",
  },
  {
    id: 2,
    icon: FingerprintIcon,
    title: "Skin-tone classification (ITA, CIE-LAB)",
    input: "BGR image",
    output: "skin_tone_group (Light / Medium / Dark)",
    detail: "ITA = arctan((L− 50) / b) × 180/π, thresholds: >41° = Light, 19–41° = Medium, ≤19° = Dark",
  },
  {
    id: 3,
    icon: ContrastIcon,
    title: "Adaptive CLAHE preprocessing",
    input: "Image + skin_tone_group",
    output: "Contrast-enhanced image",
    detail: "Clip-limit Light = 2.0, Medium = 3.0, Dark = 4.0 (stronger boost for dark skin)",
  },
  {
    id: 4,
    icon: CropIcon,
    title: "Resize + denoise",
    input: "CLAHE image",
    output: "256×256 normalized tensor",
    detail: "Gaussian blur 3×3, σ = 0.5 - removes noise, keeps scale-texture sharp",
  },
  {
    id: 5,
    icon: CpuIcon,
    title: "Attention U-Net segmentation",
    input: "256×256×3 tensor",
    output: "Binary lesion mask",
    detail: "Attention gates focus on scale texture; threshold 0.5, blobs < 50px removed",
  },
  {
    id: 6,
    icon: TagIcon,
    title: "Severity classification (MobileNetV2)",
    input: "Masked 224×224 image",
    output: "Label + confidence %",
    detail: "3-class softmax - Normal / Early Psoriasis / Psoriasis",
  },
  {
    id: 7,
    icon: DocumentIcon,
    title: "Output",
    input: "Label, confidence, mask, skin-tone",
    output: "JSON result → shown on frontend",
  },
];

const StepDetailRow = ({ label, text }) => (
  <div className="flex gap-2">
    <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wide text-[#00B4D8]">{label}</span>
    <span className="text-sm text-slate-300">{text}</span>
  </div>
);

export default function WorkflowTab() {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded((current) => (current === id ? null : id));

  return (
    <div className="space-y-6">
      {/* Step 0 - safeguard, separated from the main flow */}
      <button
        type="button"
        onClick={() => toggle(0)}
        className="flex w-full items-start gap-4 rounded-2xl border-2 border-dashed border-[#00B4D8]/30 bg-[#0A1628] p-4 text-left transition-colors hover:border-[#00B4D8]/60"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-slate-400 text-slate-300">
          <ShieldIcon className="h-[18px] w-[18px]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-200">Step 0 (safeguard) - Non-skin rejection</p>
          <p className="mt-0.5 text-xs text-slate-400">Prevents non-skin photos from reaching the model</p>
          {expanded === 0 && (
            <div className="mt-3 animate-[fadeIn_0.4s_ease-out] space-y-1.5">
              <StepDetailRow label="Input" text="Uploaded photo" />
              <StepDetailRow label="Output" text="Pass / fail" />
              <StepDetailRow label="Detail" text="Rejects if fewer than 8% of pixels look skin-colored (YCrCb check)" />
            </div>
          )}
        </div>
        <ChevronDownIcon className={`mt-2 h-4 w-4 shrink-0 text-slate-400 transition-transform ${expanded === 0 ? "rotate-180" : ""}`} />
      </button>

      <div className="flex justify-start pl-9">
        <div className="h-4 w-px border-l border-dashed border-[#00B4D8]/30" />
      </div>

      {/* Main flow, steps 1-7 */}
      <div>
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isExpanded = expanded === step.id;
          const isLast = i === steps.length - 1;

          return (
            <div key={step.id} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00B4D8] font-bold text-[#0A1628]">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                {!isLast && <div className="my-1 w-px flex-1 bg-[#00B4D8]/20" />}
              </div>

              <button
                type="button"
                onClick={() => toggle(step.id)}
                className="mb-4 flex-1 rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4 text-left transition-colors hover:border-[#00B4D8]/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="mb-0.5 text-xs font-semibold text-[#00B4D8]">Step {step.id}</p>
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                  </div>
                  <ChevronDownIcon className={`mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>

                {isExpanded && (
                  <div className="mt-3 animate-[fadeIn_0.4s_ease-out] space-y-1.5">
                    <StepDetailRow label="Input" text={step.input} />
                    <StepDetailRow label="Output" text={step.output} />
                    {step.detail && <StepDetailRow label="Detail" text={step.detail} />}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
