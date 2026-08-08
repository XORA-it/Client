import React, { useState } from "react";
import { ChartBarIcon, CpuIcon, ScaleIcon, ShuffleIcon } from "./icons";
import MetricsTab from "./tabs/MetricsTab";
import WorkflowTab from "./tabs/WorkflowTab";
import ComparisonTab from "./tabs/ComparisonTab";
import AugmentationTab from "./tabs/AugmentationTab";

const TABS = [
  { id: "metrics", label: "Evaluation Metrics", icon: ChartBarIcon, Panel: MetricsTab },
  { id: "workflow", label: "How It Works", icon: CpuIcon, Panel: WorkflowTab },
  { id: "comparison", label: "Why XORA is Different", icon: ScaleIcon, Panel: ComparisonTab },
  { id: "augmentation", label: "Data Augmentation", icon: ShuffleIcon, Panel: AugmentationTab },
];

/**
 * Post-result evaluation section for the Psoriasis module: a pill-style tab
 * bar (matching the Your Photo / AI Highlighted Areas toggle on
 * PsoriasisResult) plus 4 rich, visual panels covering model performance,
 * the inference pipeline, competitive positioning, and the augmentation
 * strategy. Styling reuses the exact tokens already used across the
 * Psoriasis module (#0A1628 / #0d1f33 / #00B4D8) - no new colors, no new
 * dependencies.
 */
export default function EvaluationTabs() {
  const [activeTab, setActiveTab] = useState("metrics");
  const ActivePanel = TABS.find((tab) => tab.id === activeTab).Panel;

  return (
    <div className="mx-auto mt-8 w-full max-w-5xl animate-[fadeIn_0.6s_ease-out] rounded-2xl border border-[#00B4D8]/20 bg-[#0d1f33] p-6 shadow-lg shadow-black/40 md:p-8">
      <nav className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#00B4D8] text-[#0A1628]"
                  : "bg-[#0A1628] text-slate-300 hover:bg-[#0A1628]/70"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div key={activeTab} className="animate-[fadeIn_0.4s_ease-out]">
        <ActivePanel />
      </div>
    </div>
  );
}
