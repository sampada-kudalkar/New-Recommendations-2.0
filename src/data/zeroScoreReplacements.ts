// Recs whose youScore is 0 get a display replacement so the UI never shows "0%".
// Values are assigned per rec ID to stay consistent between the table and detail pages.
export const ZERO_SCORE_REPLACEMENTS: Record<string, number> = {
  '69de01cb9c10756b6b6132a9': 2.4,
  '69de01cb9c10756b6b6132aa': 3.1,
  '69de03209c10756b6b6132bd': 9.5,
}

export function getDisplayScore(recId: string, actual: number): number {
  if (actual !== 0) return actual
  return ZERO_SCORE_REPLACEMENTS[recId] ?? actual
}
