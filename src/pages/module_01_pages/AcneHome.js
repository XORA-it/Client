import React, { useCallback, useState } from "react";
import { analyzeAcne } from "../../apis/acneApi";
import AcneUpload from "../../components/module/AcneUpload";

const normalizeAcneResult = (result) => {
  const source = typeof result === "string" ? { message: result } : result || {};
  const entries = Object.entries(source).filter(
    ([, value]) => value !== null && value !== undefined && value !== ""
  );

  const getFirstValue = (keys) => {
    for (const key of keys) {
      const value = source[key];
      if (value !== undefined && value !== null && value !== "") {
        return value;
      }
    }
    return null;
  };

  const formatValue = (value) => {
    if (typeof value === "number") {
      return Number.isFinite(value) ? `${value}` : String(value);
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "None";
    }

    if (typeof value === "object") {
      if (value === null) return "";

      const entries = Object.entries(value).filter(
        ([, itemValue]) => itemValue !== null && itemValue !== undefined && itemValue !== ""
      );

      if (entries.length === 0) return "";

      if (entries.every(([, itemValue]) => typeof itemValue === "number" || typeof itemValue === "string")) {
        return entries
          .map(([key, itemValue]) => `${formatLabel(key)}: ${formatValue(itemValue)}`)
          .join(" • ");
      }

      return entries.map(([key, itemValue]) => ({
        label: formatLabel(key),
        value: formatValue(itemValue),
      }));
    }

    return String(value);
  };

  const formatLabel = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  const label =
    getFirstValue(["iga_label", "prediction_label", "predicted_label", "label", "prediction", "class", "predicted_class", "result"]) ||
    "Acne Analysis";

  const confidence =
    getFirstValue(["confidence", "confidence_score", "score", "probability"]) || null;

  const severity =
    getFirstValue(["severity", "severity_level", "risk_level", "stage"]) || null;

  const recommendation =
    getFirstValue(["recommendation", "advice", "notes", "message", "summary"]) || null;

  const summaryText =
    getFirstValue(["description", "explanation", "detail", "analysis"]) || null;

  const detailEntries = entries
    .filter(([key]) => {
      const normalized = key.toLowerCase();
      return ["iga_label", "iga_grade"].includes(normalized);
    })
    .map(([key, value]) => ({
      label: key.toLowerCase().includes("grade") ? "IGA Grade" : "IGA Label",
      value: formatValue(value),
    }));

  return {
    label: formatValue(label),
    confidence,
    severity,
    recommendation: formatValue(recommendation),
    summaryText: formatValue(summaryText),
    detailEntries,
  };
};

const formatConfidence = (value) => {
  if (typeof value === "number") {
    const percentage = value > 1 ? value : value * 100;
    return `${Math.round(percentage)}%`;
  }

  if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
    const numeric = Number(value);
    const percentage = numeric > 1 ? numeric : numeric * 100;
    return `${Math.round(percentage)}%`;
  }

  return value || "";
};

export default function AcneHome() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeAcne(file);
      setResult(data);
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const dismissError = useCallback(() => setError(null), []);
  const summary = normalizeAcneResult(result);

  return (
    <div className="min-h-screen w-full bg-[#0A1628] text-white">
      {error && (
        <div className="fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-xl border border-red-500/40 bg-[#1a0f0f] p-4 shadow-lg shadow-black/50 sm:right-6 sm:top-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              !
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-400">Analysis Failed</p>
              <p className="mt-1 text-sm text-slate-300">{error}</p>
            </div>
            <button
              type="button"
              onClick={dismissError}
              className="text-slate-500 transition hover:text-slate-300"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto max-w-5xl px-4 pb-8 pt-16 text-center sm:px-6 md:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#00B4D8]/40 bg-[#00B4D8]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#00B4D8]">
          XORA Module 1
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Acne Detection
        </h1>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        {result ? (
          <div className="rounded-2xl border border-[#00B4D8]/20 bg-[#0d1f33] p-6 shadow-lg shadow-black/40 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00B4D8]">
                  Analysis Complete
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {summary.label}
                </h2>
                {summary.summaryText && (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    {summary.summaryText}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-[#00B4D8]/40 bg-[#00B4D8]/10 px-4 py-2 text-sm font-semibold text-[#00B4D8] transition hover:bg-[#00B4D8]/20"
              >
                Upload Another Image
              </button>
            </div>

            {summary.detailEntries.length > 0 ? (
              <div className="mt-6 rounded-2xl border border-[#00B4D8]/15 bg-[#0A1628] p-5">
                <h3 className="text-lg font-semibold text-white">Acne Detection Summary</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {summary.detailEntries.map((entry) => {
                    const valueContent =
                      typeof entry.value === "string" ? (
                        <p className="text-sm leading-6 text-slate-200">{entry.value}</p>
                      ) : Array.isArray(entry.value) ? (
                        <div className="space-y-2">
                          {entry.value.map((item) => (
                            <div
                              key={item.label}
                              className="rounded-lg border border-[#00B4D8]/10 bg-[#0d1f33] p-2"
                            >
                              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                                {item.label}
                              </p>
                              <p className="mt-1 text-sm text-slate-200">{item.value}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        entry.value
                      );

                    return (
                      <div
                        key={entry.label}
                        className="rounded-xl border border-[#00B4D8]/10 bg-[#0d1f33] p-3"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          {entry.label}
                        </p>
                        <div className="mt-2">{valueContent}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-[#00B4D8]/15 bg-[#0A1628] p-5">
                <h3 className="text-lg font-semibold text-white">Additional Details</h3>
              </div>
            )}
          </div>
        ) : (
          <AcneUpload onAnalyze={handleAnalyze} loading={loading} />
        )}
      </section>
    </div>
  );
}
