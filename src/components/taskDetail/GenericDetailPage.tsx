import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { Recommendation } from '../../types'
import type { BusinessMetrics } from '../../types'
import { nsaThemesConfig } from '../../data/nsaThemesConfig'
import { getLocationsForRec } from '../../data/locationsData'
import { useAppStore } from '../../store/useAppStore'
import { getDisplayScore } from '../../data/zeroScoreReplacements'


// ── Helpers ───────────────────────────────────────────────────────────────────
function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ── Category → metric mapping ─────────────────────────────────────────────────
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

// ── Score card ────────────────────────────────────────────────────────────────
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
export default function GenericDetailPage() {
  const { recommendations, metrics } = useAppStore()
  const id  = window.location.pathname.split('/').pop()
  const rec = recommendations.find(r => r.id === id)

  const [activeTab, setActiveTab] = useState<'recommendation' | 'evidence'>('recommendation')
  const [llmTab, setLlmTab] = useState('ChatGPT')
  const [showLocHover, setShowLocHover] = useState(false)
  const [locPopoverPos, setLocPopoverPos] = useState({ top: 0, left: 0 })

  if (!rec) return null

  const themeConfig   = nsaThemesConfig[rec.themeId]
  const locationCount = rec.locations ?? 1
  const locations     = getLocationsForRec(rec.id, locationCount)
  const firstLocation = locations[0] ?? ''
  const topComp       = rec.competitors[0]

  const handleLocMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setLocPopoverPos({ top: rect.bottom + 8, left: rect.left })
    setShowLocHover(true)
  }

  const PROMPT_ROWS = [
    { date: 'Jan 10, 2026', location: 'Dubbo, NSW',    mentioned: true,  position: 1, responseExcerpt: 'Here are the top-rated real estate agencies in Dubbo recommended for buyers and sellers...' },
    { date: 'Jan 10, 2026', location: 'Orange, NSW',   mentioned: false, position: null, responseExcerpt: 'The best property agencies in Orange NSW include several highly regarded local firms...' },
    { date: 'Jan 9, 2026',  location: 'Bathurst, NSW', mentioned: true,  position: 2, responseExcerpt: 'Top real estate agents in Bathurst are active across multiple suburbs offering appraisals...' },
    { date: 'Jan 8, 2026',  location: 'Parkes, NSW',   mentioned: true,  position: 1, responseExcerpt: 'Looking for a property appraisal in Parkes? Several well-reviewed local agencies offer...' },
  ]
  const LLM_TABS = ['ChatGPT', 'Gemini', 'Perplexity', 'Google AI Mode', 'Google AI Overviews', 'All sites']
  const themePrompt = nsaThemesConfig[rec.themeId]?.prompts?.[0] ?? rec.category

  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col">
      {/* ── Tab bar ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#eaeaea] px-6 flex gap-6 bg-white flex-shrink-0 sticky top-0 z-30">
        {(['recommendation', 'evidence'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-[14px] font-normal border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-[#1976d2] text-[#212121]'
                : 'border-transparent text-[#555] hover:text-[#212121]'
            }`}
          >
            {tab === 'recommendation' ? 'Recommendation' : 'Evidence'}
          </button>
        ))}
      </div>

      {/* ── Recommendation tab ──────────────────────────────────────────── */}
      {activeTab === 'recommendation' && (
      <div className="px-6 py-5 flex flex-col gap-4">

        {/* ═══ ROW 1: Score card (left) + Why it matters (right) ═══════════ */}
        <div className="flex gap-4 items-stretch">
          <div className="w-[30%] flex-shrink-0">
            <ScoreCard rec={rec} metrics={metrics} />
          </div>

          {rec.whyItWorks.length > 0 && (
            <div className="flex-1 bg-white border border-[#eaeaea] rounded-lg p-5 min-w-0">
              <p className="text-[16px] text-[#212121] leading-[24px] font-normal mb-0.5">
                Why does this recommendation matter to you
              </p>
              <p className="text-[12px] text-[#555] leading-[18px] mb-3">
                We analyzed your reports and found these gaps
              </p>
              <ul className="flex flex-col gap-2.5">
                {rec.whyItWorks.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#212121] leading-[21px]">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#555] flex-shrink-0" />
                    {pt}
                  </li>
                ))}
                {topComp && (
                  <li className="flex items-start gap-2.5 text-[13px] text-[#212121] leading-[21px]">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#555] flex-shrink-0" />
                    {topComp.name} is the top cited competitor for {themeConfig?.label ?? rec.category}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* ═══ CARD 2: Recommendation overview (no purple blog card) ════════ */}
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

        {/* ═══ CARD 4: What to do next (stepper) ══════════════════════════ */}
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
              <span className="text-[12px] text-[#555] leading-[18px]">
                Need help with implementation? Opt in for managed services and our team will make the updates for you on your website
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button style={{ color: '#1976d2', fontSize: 14, fontWeight: 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap' }}>
                Implement for me
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#ddeefa] transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="h-4 flex-shrink-0" />
      </div>
      )}

      {/* ── Evidence tab ────────────────────────────────────────────────── */}
      {activeTab === 'evidence' && (
      <div className="px-6 py-5 flex flex-col gap-4">

        {/* ═══ Prompt Execution — How did AI sites respond ═════════════════ */}
        <div className="bg-white border border-[#eaeaea] rounded-lg overflow-hidden">
          <div className="px-5 pt-4 pb-3">
            <p className="text-[16px] text-[#212121] leading-[24px] font-normal">
              How did AI sites respond to{' '}
              <span className="text-[#1976d2]">{themePrompt}</span>
            </p>
            <p className="text-[12px] text-[#888] leading-[18px] mt-0.5">
              To generate this recommendation, we ran these prompts across LLMs. Here are the responses each AI site returned.
            </p>
          </div>

          {/* LLM sub-tabs */}
          <div className="border-b border-[#eaeaea] px-5 flex gap-5 overflow-x-auto">
            {LLM_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setLlmTab(tab)}
                className={`py-2.5 text-[13px] font-normal border-b-2 -mb-px whitespace-nowrap transition-colors ${
                  llmTab === tab
                    ? 'border-[#1976d2] text-[#212121]'
                    : 'border-transparent text-[#555] hover:text-[#212121]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table header */}
          <div className="px-5 pt-3 pb-1 grid grid-cols-[120px_120px_80px_80px_1fr_1fr_100px] gap-3 text-[11px] text-[#888] font-medium tracking-[0.3px] uppercase">
            <span>Date</span>
            <span>Location</span>
            <span>Mention</span>
            <span>Position</span>
            <span>All mentions</span>
            <span>Response</span>
            <span>Citations</span>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-[#eaeaea]">
            {PROMPT_ROWS.map((row, i) => (
              <div key={i} className="px-5 py-3 grid grid-cols-[120px_120px_80px_80px_1fr_1fr_100px] gap-3 items-center">
                <span className="text-[13px] text-[#212121]">{row.date}</span>
                <span className="text-[13px] text-[#212121]">{row.location}</span>
                <span>
                  {row.mentioned
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  }
                </span>
                <span className="text-[13px] text-[#212121]">
                  {row.mentioned && row.position != null ? `${row.position} +1` : '—'}
                </span>
                <div className="flex items-center gap-1">
                  {['you', 'C1', 'C2'].map((m, mi) => (
                    <span key={mi} className="w-5 h-5 rounded-full bg-[#e3f2fd] flex items-center justify-center text-[9px] text-[#1976d2] font-medium flex-shrink-0">
                      {m[0]}
                    </span>
                  ))}
                  <span className="text-[12px] text-[#888] ml-0.5">+20</span>
                </div>
                <span className="text-[12px] text-[#555] truncate">{row.responseExcerpt}</span>
                <div className="flex items-center gap-1">
                  {['you', 'C1', 'C2'].map((c, ci) => (
                    <span key={ci} className="w-5 h-5 rounded-full bg-[#e3f2fd] flex items-center justify-center text-[9px] text-[#1976d2] font-medium flex-shrink-0">
                      {c[0]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4 flex-shrink-0" />
      </div>
      )}

      {/* Location hover portal (kept for future use) */}
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
