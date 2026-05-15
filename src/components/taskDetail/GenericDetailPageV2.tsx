import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { Recommendation } from '../../types'
import type { BusinessMetrics } from '../../types'
import { nsaThemesConfig } from '../../data/nsaThemesConfig'
import { getLocationsForRec } from '../../data/locationsData'
import { useAppStore } from '../../store/useAppStore'
import { getDisplayScore } from '../../data/zeroScoreReplacements'
import WhyThisMattersCard from '../recommendations/v2/WhyThisMattersCard'
import CompetitorCitationsCardV2 from '../recommendations/v2/CompetitorCitationsCardV2'
import AiResponseTableV2 from '../recommendations/v2/AiResponseTableV2'


// ── Helpers ───────────────────────────────────────────────────────────────────
function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ── Category → metric mapping (kept for potential future use) ─────────────────
type MetricsKey = 'citationShare' | 'visibility' | 'sentiment'

function getMetricForCategory(category: string): { label: string; key: MetricsKey } {
  if (['Content', 'Website content', 'FAQ', 'Social'].includes(category)) {
    return { label: 'Citation share', key: 'citationShare' }
  }
  if (['Local SEO', 'Technical SEO', 'Website improvement', 'Conversion'].includes(category)) {
    return { label: 'Visibility score', key: 'visibility' }
  }
  return { label: 'Sentiment score', key: 'sentiment' }
}

// ── Score card — HIDDEN in v2, kept for reference ─────────────────────────────
function ScoreCard({ rec, metrics }: { rec: Recommendation; metrics: BusinessMetrics }) {
  const themeConfig = nsaThemesConfig[rec.themeId]
  const label       = themeConfig?.label ?? rec.category
  const { label: metricLabel, key: metricsKey } = getMetricForCategory(rec.category)
  const rawScore = rec.youScore !== undefined ? rec.youScore : metrics[metricsKey]
  const current = getDisplayScore(rec.id, rawScore)
  const compPct = rec.compScore !== undefined
    ? rec.compScore
    : (() => {
        const compTotal    = rec.competitors.reduce((s, c) => s + c.totalCitations, 0)
        const avgCitations = rec.competitors.length > 0 ? compTotal / rec.competitors.length : 0
        const maxCitations = rec.competitors[0]?.totalCitations ?? 1
        return Math.min((avgCitations / maxCitations) * (current * 1.1), 100)
      })()

  const yourW = Math.min(current, 100)
  const compW = Math.min(compPct, 100)

  return (
    <div className="bg-white border border-[#eaeaea] rounded-lg p-5 flex flex-col gap-3 h-full">
      <p className="text-[14px] text-[#212121] leading-[22px] font-normal">
        What is your {metricLabel} for {label}?
      </p>
      <p className="text-[12px] text-[#888] leading-[18px]" style={{ marginTop: 4 }}>You vs competitor average</p>

      <div className="relative mt-1" style={{ height: 36 }}>
        <p className="absolute text-[28px] font-normal text-[#212121] leading-none" style={{ left: 0 }}>
          {current.toFixed(1)}%
        </p>
        <p
          className="absolute text-[28px] font-normal text-[#212121] leading-none"
          style={{ left: `${compW}%` }}
        >
          {compPct.toFixed(1)}%
        </p>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <span className="flex items-center gap-1.5 text-[11px] text-[#555]">
          <span className="w-2 h-2 rounded-full bg-[#1976d2] flex-shrink-0" />
          Current score
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-[#555]">
          <span className="w-2 h-2 rounded-full bg-[#e53935] flex-shrink-0" />
          Competitor average
        </span>
      </div>

      <div className="relative h-1.5 bg-[#eaeaea] rounded-full mt-2">
        <div className="absolute left-0 top-0 h-full bg-[#1976d2] rounded-full" style={{ width: `${yourW}%` }} />
        {compW > yourW && (
          <div
            className="absolute top-0 h-full bg-[#F99E8F] rounded-full"
            style={{ left: `${yourW}%`, width: `${compW - yourW}%` }}
          />
        )}
        <div className="absolute top-1/2 w-2 h-2 bg-[#1976d2] rounded-full border-2 border-white shadow-sm" style={{ left: `${yourW}%`, transform: 'translate(-50%, -50%)', boxSizing: 'content-box' }} />
        <div className="absolute top-1/2 w-2 h-2 bg-[#e53935] rounded-full border-2 border-white shadow-sm" style={{ left: `${compW}%`, transform: 'translate(-50%, -50%)', boxSizing: 'content-box' }} />
      </div>
    </div>
  )
}

// ── Main layout ───────────────────────────────────────────────────────────────
export default function GenericDetailPageV2() {
  const { recommendations, metrics } = useAppStore()
  const id  = window.location.pathname.split('/').pop()
  const _recMaybe = recommendations.find(r => r.id === id)

  const [showLocHover, setShowLocHover] = useState(false)
  const [locPopoverPos, setLocPopoverPos] = useState({ top: 0, left: 0 })

  if (!_recMaybe) return null
  const rec = _recMaybe

  const locationCount = rec.locations ?? 1
  const locations     = getLocationsForRec(rec.id, locationCount)
  const firstLocation = locations[0] ?? ''

  const handleLocMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setLocPopoverPos({ top: rect.bottom + 8, left: rect.left })
    setShowLocHover(true)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col">
      <div className="px-6 py-5 flex flex-col gap-6">

        {/* ═══ ROW 1 — v2: WhyThisMattersCard replaces ScoreCard + Why it matters ═══ */}
        <WhyThisMattersCard rec={rec} metrics={metrics} />

        {/* HIDDEN v2 — Card 1: ScoreCard (citation share bar chart) */}
        {false && (
          <div className="flex gap-4 items-stretch">
            <div className="w-[30%] flex-shrink-0">
              <ScoreCard rec={rec} metrics={metrics} />
            </div>
          </div>
        )}

        {/* HIDDEN v2 — Card 2: Why does this recommendation matter */}
        {false && rec.whyItWorks.length > 0 && (
          <div className="flex-1 bg-white border border-[#eaeaea] rounded-lg p-5 min-w-0">
            <p className="text-[16px] text-[#212121] leading-[24px] font-normal mb-0.5">
              Why does this recommendation matter to you
            </p>
          </div>
        )}

        {/* ═══ CARD 2: Recommendation overview ════════════════════════════ */}
        <div className="bg-white border border-[#eaeaea] rounded-lg">
          <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-2">
            <div className="flex-1 min-w-0">
              <p className="text-[16px] text-[#555] leading-[24px] tracking-[-0.32px] font-normal">
                {rec.title}
              </p>
            </div>
            {locationCount > 0 && (
              <div
                className="flex items-center gap-1 flex-shrink-0 cursor-pointer"
                onMouseEnter={handleLocMouseEnter}
                onMouseLeave={() => setShowLocHover(false)}
              >
                <PinIcon />
                <span
                  className={`text-[12px] text-[#555] leading-[normal] whitespace-nowrap ${locationCount > 1 ? 'border-b border-dashed border-[#888]' : ''}`}
                >
                  {locationCount === 1 ? firstLocation : `${locationCount} locations`}
                </span>
              </div>
            )}
          </div>
          <div className="px-5 pb-5">
            <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">
              {rec.expectedImpact ?? rec.description}
            </p>
          </div>
        </div>

        {/* ═══ CARD 3: What to do next (stepper) ══════════════════════════ */}
        <div className="bg-white border border-[#eaeaea] rounded-lg">
          <div className="px-5 pt-5 pb-3">
            <p className="text-[16px] text-[#212121] leading-[24px] font-normal">What to do next</p>
            <p className="text-[12px] text-[#555] leading-[18px] mt-2 font-normal">Step by step guide on what you need to do next</p>
          </div>

          <div className="pb-2">
            {rec.checklist.map((step, idx) => {
              const isLast = idx === rec.checklist.length - 1
              return (
                <div key={step.id} className="flex gap-3 items-stretch px-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-5 h-5 border border-[#eaeaea] rounded-full flex items-center justify-center text-[11px] text-[#555] leading-none flex-shrink-0 bg-white mt-0.5">
                      {idx + 1}
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-[#eaeaea] mt-1" />}
                  </div>
                  <div className={`flex flex-col flex-1 min-w-0 pt-0.5 ${!isLast ? 'pb-5' : 'pb-1'}`}>
                    <p className="text-[14px] text-[#212121] leading-[22px]">{step.label}</p>
                    <p className="text-[13px] text-[#555] leading-[20px] mt-0.5">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Need help banner */}
          <div className="flex items-center justify-between gap-3 mx-5 mb-5 mt-2 px-4 py-3 bg-[#ECF5FD] rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-[14px] text-[#555] leading-[20px]">
                Need help with implementation? Opt in for managed services and our team will make the updates for you on your website
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button style={{ color: '#1976d2', fontSize: 14, fontWeight: 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap' }}>
                Contact Support
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#ddeefa] transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ═══ CARD 4: Competitor citations (v2 — horizontal grid, no table) ═ */}
        {rec.competitors.length > 0 && (
          <CompetitorCitationsCardV2 rec={rec} />
        )}

        {/* ═══ CARD 5: How did AI sites respond (v2 — 3 columns) ══════════ */}
        <AiResponseTableV2 rec={rec} />

        <div className="h-4 flex-shrink-0" />
      </div>

      {/* Location hover portal */}
      {showLocHover && locationCount > 1 && createPortal(
        <div
          className="fixed z-[9999] bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#eaeaea] w-56 py-2"
          style={{ top: locPopoverPos.top, left: locPopoverPos.left }}
          onMouseEnter={() => setShowLocHover(true)}
          onMouseLeave={() => setShowLocHover(false)}
        >
          <p className="px-3 pt-1 pb-2 text-[11px] text-[#888] font-medium tracking-[0.4px] uppercase">
            Locations covered
          </p>
          <ul className="max-h-52 overflow-y-auto">
            {locations.map(loc => (
              <li key={loc} className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#f5f5f5]">
                <span className="text-[13px] text-[#212121] leading-[18px]">{loc}</span>
              </li>
            ))}
          </ul>
        </div>,
        document.body,
      )}
    </div>
  )
}
