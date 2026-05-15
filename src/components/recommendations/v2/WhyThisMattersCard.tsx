import type { Recommendation, RecCategory } from '../../../types'
import type { BusinessMetrics } from '../../../types'
import { getDisplayScore } from '../../../data/zeroScoreReplacements'
import { nsaThemesConfig } from '../../../data/nsaThemesConfig'

const CATEGORY_METRIC: Partial<Record<RecCategory, { label: string; key: keyof BusinessMetrics }>> = {
  'Content':             { label: 'Citation share',   key: 'citationShare' },
  'Website content':     { label: 'Citation share',   key: 'citationShare' },
  'FAQ':                 { label: 'Citation share',   key: 'citationShare' },
  'Social':              { label: 'Citation share',   key: 'citationShare' },
  'Local SEO':           { label: 'Visibility score', key: 'visibility' },
  'Technical SEO':       { label: 'Visibility score', key: 'visibility' },
  'Website improvement': { label: 'Visibility score', key: 'visibility' },
  'Conversion':          { label: 'Visibility score', key: 'visibility' },
  'Trust & Reputation':  { label: 'Sentiment score',  key: 'sentiment' },
  'Reviews':             { label: 'Sentiment score',  key: 'sentiment' },
}

interface Props {
  rec: Recommendation
  metrics: BusinessMetrics
}

export default function WhyThisMattersCard({ rec, metrics }: Props) {
  const meta = CATEGORY_METRIC[rec.category]
  const metricLabel = meta?.label ?? 'Score'
  const themeLabel = nsaThemesConfig[rec.themeId]?.label ?? rec.category

  const rawYou = rec.youScore !== undefined
    ? rec.youScore
    : (meta ? (metrics[meta.key] as number) : 0)
  const youPct = getDisplayScore(rec.id, rawYou)

  // Build up to 3 competitor entries with normalised scores
  const maxCitations = rec.competitors[0]?.totalCitations ?? 1
  const competitors = rec.competitors.slice(0, 3).map((c, i) => ({
    name: c.name,
    score: i === 0 && rec.compScore !== undefined
      ? rec.compScore
      : Math.round(Math.min((c.totalCitations / maxCitations) * (rawYou * 1.1), 100)),
  }))

  return (
    <div
      className="bg-white border border-[#eaeaea] rounded-[8px] flex flex-col gap-[8px] py-[16px] w-full"
      onClick={e => e.stopPropagation()}
    >
      {/* Title */}
      <div className="px-[20px]">
        <p className="text-[16px] text-[#555] leading-[24px] tracking-[-0.32px] font-normal">
          What is your {metricLabel} compared to competitors for{' '}
          <span className="text-[#555555]">'{themeLabel}'</span>
        </p>
      </div>

      {/* Score comparison row */}
      <div className="flex items-center gap-[40px] px-[20px]">

        {/* You block */}
        <div className="flex flex-col items-start gap-[2px]">
          <p className="text-[32px] text-[#212121] leading-[48px] tracking-[-0.64px] font-normal">
            {youPct.toFixed(1)}%
          </p>
          <div
            className="flex items-center gap-[4px] px-[8px] py-[2px] rounded-full"
            style={{ background: 'linear-gradient(180deg, #0f7195 0%, #05242f 100%)', border: '1px solid white' }}
          >
            <span className="text-[12px] text-white leading-[16px] font-normal">You</span>
          </div>
        </div>

        {/* Competitor groups */}
        {competitors.map((comp, i) => (
          <div key={i} className="flex items-center gap-[40px]">
            {/* vs pill */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 40, height: 32, background: '#ecf5fd' }}
            >
              <span className="text-[16px] text-[#212121] leading-[28px] font-normal">vs</span>
            </div>

            {/* Competitor block */}
            <div className="flex flex-col items-start gap-[2px]">
              <p className="text-[32px] text-[#212121] leading-[48px] tracking-[-0.64px] font-normal">
                {comp.score.toFixed(1)}%
              </p>
              <p className="text-[12px] text-[#555] leading-[18px] font-normal">
                {comp.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
