// Hard-coded demo results for the Melanoma module (no backend needed).
// Reference images live in public/references/<folder>/.
// Set REACT_APP_MELANOMA_DEMO=false in .env to use the real API again.

export const MELANOMA_DEMO_ENABLED = process.env.REACT_APP_MELANOMA_DEMO !== "false";

const CATEGORIES = {
  high: {
    folder: "high risk",
    images: ["Melanoma 1.jpg", "melanoma2.png", "mellanoma3.webp"],
    prediction: {
      prediction_label: "Melanoma Detected",
      risk_level: "HIGH RISK",
      melanoma_probability: 92.4,
      recommendation:
        "High likelihood of melanoma. Please see a dermatologist urgently for a clinical examination and biopsy.",
    },
    abcd_scores: {
      asymmetry: { score: 1.8, status: "Highly asymmetric" },
      border: { score: 6.5, status: "Irregular" },
      color: { score: 5, status: "Multiple colours" },
      diameter_mm: { score: 8.2, status: "> 6 mm" },
    },
    skin_tone: { detected_skin_tone: "Light", ita_score: 48.3, model_accuracy: "91%" },
  },
  medium: {
    folder: "medium",
    images: ["image 4.jpg", "images 5.jpg"],
    prediction: {
      prediction_label: "Suspicious Lesion",
      risk_level: "MEDIUM RISK",
      melanoma_probability: 56.7,
      recommendation:
        "Some features are concerning. Book a dermatology appointment and monitor the lesion for changes.",
    },
    abcd_scores: {
      asymmetry: { score: 1.1, status: "Mildly asymmetric" },
      border: { score: 3.8, status: "Slightly irregular" },
      color: { score: 3, status: "Two colours" },
      diameter_mm: { score: 5.4, status: "Borderline" },
    },
    skin_tone: { detected_skin_tone: "Medium", ita_score: 31.6, model_accuracy: "88%" },
  },
  low: {
    folder: "low",
    images: ["images 1.jpg", "images 2.jpg"],
    prediction: {
      prediction_label: "Likely Benign",
      risk_level: "LOW RISK",
      melanoma_probability: 18.2,
      recommendation:
        "Features look mostly benign. Keep monitoring and have it checked if it changes in size, shape, or colour.",
    },
    abcd_scores: {
      asymmetry: { score: 0.4, status: "Symmetric" },
      border: { score: 1.5, status: "Regular" },
      color: { score: 1, status: "Single colour" },
      diameter_mm: { score: 3.1, status: "< 6 mm" },
    },
    skin_tone: { detected_skin_tone: "Tan", ita_score: 22.9, model_accuracy: "89%" },
  },
  non: {
    folder: "non melanoma",
    images: ["images 10.jpg", "images 11.jpg"],
    prediction: {
      prediction_label: "Non-Melanoma",
      risk_level: "NON-MELANOMA",
      melanoma_probability: 4.6,
      recommendation:
        "No melanoma features detected. Routine skin checks are still recommended.",
    },
    abcd_scores: {
      asymmetry: { score: 0.1, status: "Symmetric" },
      border: { score: 0.8, status: "Regular" },
      color: { score: 1, status: "Uniform" },
      diameter_mm: { score: 2.4, status: "< 6 mm" },
    },
    skin_tone: { detected_skin_tone: "Dark", ita_score: -8.4, model_accuracy: "87%" },
  },
};

const normalize = (name) =>
  name.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]/g, "");

function referenceUrl(category, image) {
  return `${window.location.origin}${encodeURI(`/references/${category.folder}/${image}`)}`;
}

async function sha256(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Hash of every reference image, computed once (lets us match by file content,
// so renamed copies of a reference image are still recognised).
let referenceHashes = null;
async function loadReferenceHashes() {
  if (referenceHashes) return referenceHashes;
  const entries = [];
  for (const category of Object.values(CATEGORIES)) {
    for (const image of category.images) {
      try {
        const res = await fetch(referenceUrl(category, image));
        const hash = await sha256(await res.arrayBuffer());
        entries.push({ hash, category, image });
      } catch {
        /* skip images that cannot be loaded */
      }
    }
  }
  referenceHashes = entries;
  return entries;
}

// 1) match by file content, 2) match by file name, 3) random category.
async function pickCategory(file) {
  try {
    const hash = await sha256(await file.arrayBuffer());
    const hit = (await loadReferenceHashes()).find((e) => e.hash === hash);
    if (hit) return { category: hit.category, image: hit.image };
  } catch {
    /* fall through to name matching */
  }

  const target = normalize(file?.name || "");
  for (const category of Object.values(CATEGORIES)) {
    const match = category.images.find((img) => normalize(img) === target);
    if (match) return { category, image: match };
  }
  const all = Object.values(CATEGORIES);
  const category = all[Math.floor(Math.random() * all.length)];
  return { category, image: category.images[0] };
}

export async function demoAnalyzeMelanoma(file) {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // fake "processing"
  const { category, image } = await pickCategory(file);
  return {
    success: true,
    prediction: category.prediction,
    abcd_scores: category.abcd_scores,
    skin_tone_analysis: category.skin_tone,
    urls: { heatmap_image: referenceUrl(category, image) },
  };
}

// ---------- Demo evaluation data ----------
const svgUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

function metricsBySkinToneSvg(rows) {
  const metrics = [["precision", "#00B4D8"], ["recall", "#f59e0b"], ["f1_score", "#10b981"]];
  const W = 760, H = 420, left = 60, bottom = 60, top = 50, plotH = H - top - bottom;
  const groupW = (W - left - 20) / rows.length;
  let body = `<text x="${W / 2}" y="28" text-anchor="middle" font-size="18" font-weight="bold" fill="#0A1628">Performance by skin tone</text>`;
  for (let i = 0; i <= 5; i++) {
    const y = top + plotH - (plotH * i) / 5;
    body += `<line x1="${left}" x2="${W - 20}" y1="${y}" y2="${y}" stroke="#e2e8f0"/><text x="${left - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="#475569">${(i * 20)}%</text>`;
  }
  rows.forEach((row, g) => {
    const gx = left + g * groupW + groupW * 0.15, bw = (groupW * 0.7) / metrics.length;
    metrics.forEach(([key, color], m) => {
      const h = plotH * row[key], x = gx + m * bw, y = top + plotH - h;
      body += `<rect x="${x}" y="${y}" width="${bw - 4}" height="${h}" fill="${color}" rx="3"/><text x="${x + (bw - 4) / 2}" y="${y - 5}" text-anchor="middle" font-size="10" fill="#0A1628">${(row[key] * 100).toFixed(0)}</text>`;
    });
    body += `<text x="${left + g * groupW + groupW / 2}" y="${H - bottom + 20}" text-anchor="middle" font-size="12" fill="#0A1628">${row.skin_tone}</text>`;
  });
  metrics.forEach(([key, color], i) => {
    body += `<rect x="${W / 2 - 150 + i * 105}" y="${H - 22}" width="12" height="12" fill="${color}"/><text x="${W / 2 - 133 + i * 105}" y="${H - 12}" font-size="12" fill="#0A1628">${key.replace("_", " ")}</text>`;
  });
  return svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="Arial, sans-serif"><rect width="${W}" height="${H}" fill="white"/>${body}</svg>`);
}

function confusionMatrixSvg(tn, fp, fn, tp) {
  const cells = [[tn, fp], [fn, tp]], max = Math.max(tn, fp, fn, tp);
  let body = `<text x="200" y="28" text-anchor="middle" font-size="18" font-weight="bold" fill="#0A1628">Confusion matrix</text>`;
  cells.forEach((r, i) => r.forEach((v, j) => {
    const a = 0.15 + 0.85 * (v / max);
    body += `<rect x="${90 + j * 140}" y="${50 + i * 140}" width="136" height="136" fill="rgba(0,180,216,${a})"/><text x="${158 + j * 140}" y="${126 + i * 140}" text-anchor="middle" font-size="26" font-weight="bold" fill="${a > 0.55 ? "white" : "#0A1628"}">${v}</text>`;
  }));
  body += `<text x="158" y="338" text-anchor="middle" font-size="12" fill="#0A1628">Pred. Non-Melanoma</text><text x="298" y="338" text-anchor="middle" font-size="12" fill="#0A1628">Pred. Melanoma</text>`;
  body += `<text x="82" y="122" text-anchor="end" font-size="12" fill="#0A1628">Actual</text><text x="82" y="138" text-anchor="end" font-size="12" fill="#0A1628">Non-Mel.</text><text x="82" y="262" text-anchor="end" font-size="12" fill="#0A1628">Actual</text><text x="82" y="278" text-anchor="end" font-size="12" fill="#0A1628">Melanoma</text>`;
  return svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 350" font-family="Arial, sans-serif"><rect width="400" height="350" fill="white"/>${body}</svg>`);
}

export async function demoMelanomaEvaluation() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const skinToneRows = [
    { skin_tone: "Light", n: 412, precision: 0.82, recall: 0.8, f1_score: 0.81 },
    { skin_tone: "Medium", n: 356, precision: 0.77, recall: 0.74, f1_score: 0.75 },
    { skin_tone: "Tan", n: 298, precision: 0.73, recall: 0.7, f1_score: 0.71 },
    { skin_tone: "Dark", n: 184, precision: 0.68, recall: 0.65, f1_score: 0.66 },
  ];
  return {
    success: true,
    performance: { precision: 0.7455, recall: 0.7189, f1_score: 0.732 },
    sample_counts: {
      total_n: skinToneRows.reduce((t, r) => t + r.n, 0),
      by_skin_tone: skinToneRows.map(({ skin_tone, n }) => ({ skin_tone, n })),
    },
    overall_metrics: [
      { metric: "Accuracy", value: "0.8412" },
      { metric: "Precision", value: "0.7455" },
      { metric: "Recall", value: "0.7189" },
      { metric: "F1 Score", value: "0.7320" },
      { metric: "AUC-ROC", value: "0.9034" },
    ],
    skin_tone_metrics: skinToneRows.map((r) => ({
      ...r,
      precision: r.precision.toFixed(2),
      recall: r.recall.toFixed(2),
      f1_score: r.f1_score.toFixed(2),
    })),
    evaluation_plots: [
      { name: "Performance by skin tone", url: metricsBySkinToneSvg(skinToneRows) },
      { name: "Confusion matrix", url: confusionMatrixSvg(612, 98, 112, 428) },
    ],
  };
}
