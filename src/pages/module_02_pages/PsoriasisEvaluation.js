import React from "react";
import EvaluationLayout from "../../components/module/evaluation/EvaluationLayout";

/**
 * Standalone "Research & Evaluation" page for the Psoriasis module -
 * reachable any time via the button on PsoriasisHome, independent of
 * whether a scan has been run. Full-screen shell with a left sidebar -
 * see EvaluationLayout.
 */
export default function PsoriasisEvaluation() {
  return <EvaluationLayout />;
}
