import React from "react";
import { XCircleIcon } from "../icons";

const researchGaps = [
  "No system checks skin tone before processing the image",
  "No system uses different preprocessing for different skin tones",
  "Most systems only give a label- they don't show where the lesion is",
  "No system reports accuracy separately for light, medium, and dark skin",
  "Most systems classify type only, not severity stage",
  "Most studies use small, single-hospital datasets",
];

const novelty = [
  {
    title: "Texture-First Detection",
    description: "Uses scale texture, not skin redness, so it works fairly across all skin tones.",
  },
  {
    title: "Skin-Tone-Adaptive Pipeline",
    description: "Detects skin tone first (ITA formula), then adjusts image contrast per tone.",
  },
  {
    title: "Clear Severity Staging",
    description: "3 stages: Normal, Early Psoriasis, Psoriasis.",
  },
  {
    title: "Fairness Reporting",
    description: "Accuracy shown separately per skin tone, not just one combined number.",
  },
];

const SectionHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{children}</h3>
);

export default function ResearchGapNoveltyPanel() {
  return (
    <div className="space-y-8">
      <section>
        <SectionHeading>Research Gaps - What's Missing in Existing Work</SectionHeading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {researchGaps.map((gap) => (
            <div key={gap} className="flex items-start gap-2 rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4">
              <XCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              <p className="text-sm leading-relaxed text-slate-300">{gap}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>Our Novelty - What XORA Does New</SectionHeading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {novelty.map((item, i) => (
            <div key={item.title} className="flex gap-3 rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B4D8]/10 text-xs font-bold text-[#00B4D8]">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
