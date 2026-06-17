import type { Recommendation } from '../types'

export function getPrimaryCompScore(rec: Recommendation, rawYou: number): number | null {
  if (rec.compScore !== undefined) return rec.compScore
  if (rec.competitors.length === 0) return null
  const maxCitations = rec.competitors[0].totalCitations ?? 1
  const compTotal = rec.competitors.reduce((s, c) => s + c.totalCitations, 0)
  const avgCitations = compTotal / rec.competitors.length
  return Math.min((avgCitations / maxCitations) * (rawYou * 1.1), 100)
}
