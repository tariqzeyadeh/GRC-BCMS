/** @typedef {'low' | 'med' | 'high'} RiskBand */

/** Board residual appetite threshold (scores above = out of appetite) */
export const RISK_APPETITE_THRESHOLD = 12;

/**
 * @param {number} score Impact * Likelihood (1–25)
 * @returns {RiskBand}
 */
export function getRiskBand(score) {
  if (score <= 6) return 'low';
  if (score <= 15) return 'med';
  return 'high';
}

export function isWithinAppetite(residualScore, threshold = RISK_APPETITE_THRESHOLD) {
  return residualScore <= threshold;
}

export const RISK_BAND_CLASSES = {
  low: 'bg-green-500 text-white',
  med: 'bg-amber-400 text-dark',
  high: 'bg-red-500 text-white',
};

export const RISK_BAND_LABELS = {
  low: 'Low',
  med: 'Med',
  high: 'High',
};

export const TREATMENT_OPTIONS = ['Mitigate', 'Transfer', 'Accept', 'Avoid'];

export const CONTROL_EFFECTIVENESS = ['Effective', 'Partially Effective', 'Ineffective'];

/** RAG status vs appetite */
export function getAppetiteRag(residualScore, threshold = RISK_APPETITE_THRESHOLD) {
  if (residualScore <= threshold - 4) return 'green';
  if (residualScore <= threshold) return 'amber';
  return 'red';
}

export const RAG_CLASSES = {
  green: 'bg-green-100 text-green-700 border border-green-500',
  amber: 'bg-amber-50 text-amber-800 border border-amber-400',
  red: 'bg-red-100 text-red-600 border border-red-500',
};
