import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpenIcon, SlidersIcon, ShuffleIcon, CpuIcon, ChartBarIcon, ScaleIcon, ShieldIcon } from "./icons";
import ResearchGapNoveltyPanel from "./panels/ResearchGapNoveltyPanel";
import MethodologyPanel from "./panels/MethodologyPanel";
import SystemFlowsPanel from "./panels/SystemFlowsPanel";
import ModelExplainPanel from "./panels/ModelExplainPanel";
import MetricsTab from "./tabs/MetricsTab";
import ComparisonPanel from "./panels/ComparisonPanel";
import LimitationsPanel from "./panels/LimitationsPanel";

const SECTIONS = [
  { id: "gaps", label: "Research Gap & Novelty", icon: BookOpenIcon, Panel: ResearchGapNoveltyPanel },
  { id: "methodology", label: "Methodology", icon: SlidersIcon, Panel: MethodologyPanel },
  { id: "flows", label: "System Flows", icon: ShuffleIcon, Panel: SystemFlowsPanel },
  { id: "models", label: "Model Explain", icon: CpuIcon, Panel: ModelExplainPanel },
  { id: "evaluation", label: "Evaluation", icon: ChartBarIcon, Panel: MetricsTab },
  { id: "comparison", label: "Comparison", icon: ScaleIcon, Panel: ComparisonPanel },
  { id: "limitations", label: "Limitations", icon: ShieldIcon, Panel: LimitationsPanel },
];

/**
 * Full-screen Research & Evaluation shell: a slim top bar, a left sidebar
 * (collapses to a horizontal scrollable nav below md), and a full-width
 * content pane. Replaces the old centered pill-tab card. Styling reuses
 * the exact tokens already used across the Psoriasis module
 * (#0A1628 / #0d1f33 / #00B4D8) - no new colors, no new dependencies.
 */
export default function EvaluationLayout() {
  const [activeSection, setActiveSection] = useState("gaps");
  const active = SECTIONS.find((s) => s.id === activeSection);
  const ActivePanel = active.Panel;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0A1628] text-white">
      {/* Top bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#00B4D8]/15 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            to="/module-2/psoriasis"
            className="text-sm font-medium text-[#00B4D8] transition hover:text-[#00cfff]"
          >
            ← Back
          </Link>
          <span className="hidden h-4 w-px bg-[#00B4D8]/20 sm:block" />
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">Research &amp; Evaluation</h1>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00B4D8]">
          XORA Module 2
        </span>
      </header>

      {/* Mobile nav - horizontal, shown below md */}
      <nav className="flex gap-2 overflow-x-auto border-b border-[#00B4D8]/15 bg-[#0d1f33] px-4 py-3 md:hidden">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = section.id === activeSection;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                isActive ? "bg-[#00B4D8] text-[#0A1628]" : "bg-[#0A1628] text-slate-300 hover:bg-[#0A1628]/70"
              }`}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
          );
        })}
      </nav>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar - md and up */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-[#00B4D8]/15 bg-[#0d1f33] px-4 py-6 md:block">
          <nav className="flex flex-col gap-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = section.id === activeSection;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                    isActive ? "bg-[#00B4D8] text-[#0A1628]" : "text-slate-300 hover:bg-[#0A1628]/70 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">
          <div key={activeSection} className="animate-[fadeIn_0.4s_ease-out]">
            <ActivePanel />
          </div>
        </main>
      </div>
    </div>
  );
}
