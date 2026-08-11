import React from "react";
import {
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateIcon,
  WaveIcon,
  MoveIcon,
  SlidersIcon,
  PhotoIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
} from "../icons";

const summarySteps = [
  "Collect and label images (mark the lesion area)",
  "Prepare images differently based on skin tone",
  "Train two AI models - one to find the lesion, one to grade its severity",
  "Test the models and check if results are fair across skin tones",
];

const preprocessingDetails = [
  "Input images preprocessed with ITA skin-tone classification + adaptive CLAHE (clip-limit varies by skin tone: Light 2.0, Medium 3.0, Dark 4.0)",
  "Attention U-Net trained on 256x256 images to segment lesion boundaries, guided by attention gates that focus on silvery-white scale texture rather than redness/erythema",
  "Trained on ~1700curated real clinical + public dataset images (DermNet, DermIS, Fitzpatrick17k, and Anuradhapura Kanola Hospital clinical images), skin-tone-balanced via augmentation",
  "Evaluated using Dice, IoU, and - uniquely - disease-only IoU broken down per skin-tone group (Light/Medium/Dark)",
];

const geometricTransforms = [
  { icon: FlipHorizontalIcon, label: "Horizontal flip" },
  { icon: FlipVerticalIcon, label: "Vertical flip" },
  { icon: RotateIcon, label: "Rotate 90°" },
  { icon: RotateIcon, label: "Rotate -90°" },
  { icon: RotateIcon, label: "Rotate 180°" },
  { icon: WaveIcon, label: "Elastic deformation", params: "α=34, σ=4" },
  { icon: MoveIcon, label: "Shift-Scale-Rotate", params: "±25° rot, 0.9-1.1× scale, ±5% shift" },
  { icon: SlidersIcon, label: "Blur + contrast jitter", params: "kernel 3/5, 0.85-1.25× contrast" },
];

// Matches PsoriasisResult's SKIN_TONE_CLASSES swatch colors exactly.
const toneSwatches = [
  { label: "Light", angle: "55°", hex: "#F5D0A9" },
  { label: "Medium", angle: "30°", hex: "#C8956C" },
  { label: "Dark", angle: "5°", hex: "#5C3317" },
];

const totals = [
  { label: "Normal", value: "≈689" },
  { label: "Early Psoriasis", value: "≈658" },
  { label: "Psoriasis", value: "≈710" },
];

const SectionHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{children}</h3>
);

export default function MethodologyPanel() {
  return (
    <div className="space-y-8">
      {/* Simple summary */}
      <section>
        <SectionHeading>Summary</SectionHeading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {summarySteps.map((step, i) => (
            <div key={step} className="flex gap-3 rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B4D8]/10 text-xs font-bold text-[#00B4D8]">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preprocessing & training details */}
      <section>
        <SectionHeading>Preprocessing &amp; Training Details</SectionHeading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {preprocessingDetails.map((point, i) => (
            <div key={point} className="flex gap-3 rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B4D8]/10 text-xs font-bold text-[#00B4D8]">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-slate-300">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data augmentation */}
      <section className="space-y-6 border-t border-[#00B4D8]/10 pt-6">
        <h3 className="text-lg font-semibold text-white">Data Augmentation</h3>

        <div>
          <SectionHeading>Geometric augmentation</SectionHeading>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {geometricTransforms.map((t, i) => (
              <div
                key={`${t.label}-${i}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4 text-center"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00B4D8]/10">
                  <t.icon className="h-[18px] w-[18px] text-[#00B4D8]" />
                </div>
                <p className="text-xs font-medium text-slate-200">{t.label}</p>
                {t.params && <p className="text-[11px] leading-tight text-slate-500">{t.params}</p>}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            A random subset applied per image - Normal ×3, Early Psoriasis ×4, Psoriasis ×2 - to
            balance raw class counts (87/74/104) after augmentation.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-[#00B4D8]/50 bg-[#00B4D8]/5 p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00B4D8]">
              Key Novelty
            </span>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-[#00B4D8]">
              Skin-tone simulation augmentation
            </h4>
          </div>

          <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex flex-col items-center gap-1.5">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#00B4D8]/20 bg-[#0A1628] text-slate-300">
                <PhotoIcon className="h-[22px] w-[22px]" />
              </div>
              <span className="text-[11px] text-slate-400">Source image</span>
            </div>

            <ArrowRightIcon className="h-5 w-5 shrink-0 rotate-90 text-[#00B4D8] sm:rotate-0" />

            <div className="flex gap-4">
              {toneSwatches.map((tone) => (
                <div key={tone.label} className="flex flex-col items-center gap-1.5">
                  <div
                    className="h-16 w-16 rounded-xl border border-[#00B4D8]/20 shadow-inner"
                    style={{ backgroundColor: tone.hex }}
                  />
                  <span className="text-xs font-medium text-slate-200">{tone.label}</span>
                  <span className="text-[11px] text-slate-500">ITA target {tone.angle}</span>
                </div>
              ))}
            </div>
          </div>

          <ul className="mb-5 space-y-1.5 text-sm text-slate-300">
            <li>• Every training image is synthetically re-rendered into the 2 skin-tone groups it doesn&apos;t belong to</li>
            <li>• Only the L-channel (lightness) is shifted - color (a/b chroma) stays unchanged</li>
            <li>• Each simulated image also gets a flipped copy for extra variety</li>
          </ul>

          <div className="mb-5 space-y-1.5 rounded-xl border border-[#00B4D8]/15 bg-[#0A1628] p-4 font-mono text-xs text-[#00B4D8] sm:text-sm">
            <div>target_L&nbsp;&nbsp;= 50 + b_median × tan(target_ITA)</div>
            <div className="text-slate-500">targets: 55° = Light, 30° = Medium, 5° = Dark</div>
            <div className="border-t border-[#00B4D8]/10 pt-1.5">factor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= target_L / current_L_median</div>
            <div className="text-slate-500">clipped to 0.30 – 3.2</div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/40 bg-[#0A1628] px-3 py-1.5">
            <BadgeCheckIcon className="h-4 w-4 text-[#00B4D8]" />
            <span className="text-xs text-slate-200">
              <span className="font-bold text-white">95% accuracy</span> - verified by re-classifying
              60 simulated samples back through the ITA classifier
            </span>
          </div>
        </div>

        <div>
          <SectionHeading>Post-augmentation totals</SectionHeading>
          <div className="grid grid-cols-3 gap-3">
            {totals.map((t) => (
              <div key={t.label} className="rounded-2xl border border-[#00B4D8]/15 bg-[#0d1f33] p-4 text-center">
                <p className="text-xl font-bold text-white sm:text-2xl">{t.value}</p>
                <p className="mt-1 text-xs text-slate-400">{t.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">
            Class-balanced; each class rebalanced across Light/Medium/Dark
          </p>
        </div>
      </section>
    </div>
  );
}
