import React from "react";
import WorkflowTab from "../tabs/WorkflowTab";

const trainingFlow = [
  { step: 1, happens: "Collect photos and mark lesion areas", input: "Raw photos", output: "265 labeled images + masks" },
  { step: 2, happens: "Create more training images (augmentation)", input: "Labeled images", output: "1,792 images" },
  { step: 3, happens: "Split data into train/test groups", input: "All images", output: "Train/Val/Test lists" },
  { step: 4, happens: "Train Model 1 (find the lesion)", input: "Training images", output: "Saved Model 1 file" },
  { step: 5, happens: "Prepare images for Model 2", input: "Lesion masks + images", output: "Cropped, enhanced images" },
  { step: 6, happens: "Train Model 2 (grade severity)", input: "Cropped images", output: "Saved Model 2 file" },
  { step: 7, happens: "Test both models", input: "Test images", output: "Accuracy scores" },
];

const SectionHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{children}</h3>
);

export default function SystemFlowsPanel() {
  return (
    <div className="space-y-8">
      {/* Training flow - done once, offline */}
      <section>
        <SectionHeading>Training Flow (Done Once, Offline)</SectionHeading>
        <div className="overflow-x-auto">
          <div className="min-w-[560px] space-y-2">
            <div className="grid grid-cols-[48px_2fr_1.2fr_1.2fr] gap-3 rounded-lg bg-[#0A1628] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Step</span>
              <span>What Happens</span>
              <span>Input</span>
              <span>Output</span>
            </div>
            {trainingFlow.map((row, i) => (
              <div
                key={row.step}
                className={`grid grid-cols-[48px_2fr_1.2fr_1.2fr] items-center gap-3 rounded-xl border border-[#00B4D8]/10 px-4 py-3 ${
                  i % 2 === 0 ? "bg-[#0d1f33]" : "bg-[#0A1628]/60"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00B4D8]/10 text-xs font-bold text-[#00B4D8]">
                  {row.step}
                </span>
                <span className="text-sm font-medium text-white">{row.happens}</span>
                <span className="text-sm text-slate-400">{row.input}</span>
                <span className="text-sm text-slate-300">{row.output}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main / inference flow - every time a photo is uploaded */}
      <section className="border-t border-[#00B4D8]/10 pt-6">
        <SectionHeading>Main Flow (Every Time a Photo is Uploaded)</SectionHeading>
        <WorkflowTab />
      </section>
    </div>
  );
}
