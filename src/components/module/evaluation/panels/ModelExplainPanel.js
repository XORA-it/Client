import React from "react";
import { CpuIcon, TagIcon } from "../icons";

const models = [
  {
    icon: CpuIcon,
    name: "Model 1 - Attention U-Net",
    tagline: "Finds the lesion",
    job: "Draws an outline around the psoriasis area on the skin",
    looksAt: "Scale texture, not skin color",
    resultLabel: "Dice score / IoU",
    resultValue: "0.762 / 0.686",
  },
  {
    icon: TagIcon,
    name: "Model 2 - MobileNetV2",
    tagline: "Grades severity",
    job: "Looks at the lesion and decides: Normal, Early Psoriasis, or full Psoriasis",
    looksAt: "How thick the scales are (thin = early, thick = full)",
    resultLabel: "Accuracy",
    resultValue: "77.4%",
  },
];

const DetailRow = ({ label, text }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-[#00B4D8]">{label}</p>
    <p className="mt-1 text-sm leading-relaxed text-slate-300">{text}</p>
  </div>
);

const SectionHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{children}</h3>
);

export default function ModelExplainPanel() {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeading>The Two Models Behind XORA</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {models.map((model) => (
            <div key={model.name} className="rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00B4D8]/10">
                  <model.icon className="h-5 w-5 text-[#00B4D8]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{model.name}</p>
                  <p className="text-xs text-slate-400">{model.tagline}</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <DetailRow label="Job" text={model.job} />
                <DetailRow label="Looks at" text={model.looksAt} />
              </div>

              <div className="mt-4 rounded-xl border border-[#00B4D8]/20 bg-[#0A1628] px-4 py-3">
                <p className="text-xs text-slate-400">{model.resultLabel}</p>
                <p className="text-lg font-bold text-[#00B4D8]">{model.resultValue}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
