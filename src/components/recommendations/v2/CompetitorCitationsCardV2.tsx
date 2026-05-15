import { useState, useRef, useEffect } from 'react'
import type { Recommendation } from '../../../types'
import { nsaThemesConfig } from '../../../data/nsaThemesConfig'

const AVATAR_COLORS = ['#f59e0b', '#6b7280', '#8b5cf6', '#10b981', '#ef4444', '#3b82f6']

function PieIcon({ score }: { score: number }) {
  const r = 8
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" className="flex-shrink-0">
      <circle cx="10" cy="10" r={r} fill="none" stroke="#eaeaea" strokeWidth="2.5" />
      <circle cx="10" cy="10" r={r} fill="none" stroke="#377e2c" strokeWidth="2.5"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 10 10)" />
    </svg>
  )
}

interface Props { rec: Recommendation }

export default function CompetitorCitationsCardV2({ rec }: Props) {
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themeLabel = nsaThemesConfig[rec.themeId]?.label ?? rec.category
  const prompts = nsaThemesConfig[rec.themeId]?.prompts ?? [themeLabel]
  const hasMultiplePrompts = prompts.length > 1
  const activePrompt = prompts[selectedPromptIdx]
  // Rotate competitors per selected prompt for visual variation
  const n = rec.competitors.length
  const shiftedCompetitors = n > 0
    ? [
        ...rec.competitors.slice(selectedPromptIdx % n),
        ...rec.competitors.slice(0, selectedPromptIdx % n),
      ].slice(0, 3)
    : []

  // Close dropdown on outside click
  useEffect(() => {
    if (!showDropdown) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showDropdown])

  if (shiftedCompetitors.length === 0) return null

  return (
    <div className="bg-white border border-[#eaeaea] rounded-[8px] overflow-visible">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
            Which competitor pages are cited by AI for
          </span>

          {hasMultiplePrompts ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1"
                onClick={() => setShowDropdown(v => !v)}
              >
                <span className="text-[16px] text-[#1976d2] leading-[24px] tracking-[-0.32px] font-normal">
                  {activePrompt.replace(/\.$/, '')}
                </span>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`flex-shrink-0 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-1 z-50 bg-white border border-[#eaeaea] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] min-w-[480px] max-w-xl py-1">
                  {prompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedPromptIdx(i); setShowDropdown(false) }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] leading-[20px] transition-colors hover:bg-[#f5f5f5] ${
                        i === selectedPromptIdx
                          ? 'text-[#1976d2] bg-[#ecf5fd]'
                          : 'text-[#212121]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <span className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
              '{activePrompt.replace(/\.$/, '')}'
            </span>
          )}
        </div>

        <p className="text-[12px] text-[#555] leading-[18px] mt-0.5">
          Analyze competitor blogs cited in AI-generated answers for prompts you are tracking
        </p>
      </div>

      {/* ── 3-column competitor grid ─────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-[10px] px-6 py-3 pb-5">
        {shiftedCompetitors.map((comp, i) => {
          const initial = comp.name.charAt(0).toUpperCase()
          const avatarBg = AVATAR_COLORS[i % AVATAR_COLORS.length]
          const topCitations = rec.competitors[0]?.totalCitations ?? 1
          const score = rec.aeoScore
            ? Math.round(
                rec.aeoScore.competitor * (comp.totalCitations / topCitations) * 0.9 +
                rec.aeoScore.competitor * 0.1
              )
            : ([81, 74, 68][i] ?? 70)

          return (
            <div
              key={`${comp.id}-${selectedPromptIdx}-${i}`}
              className="bg-[#fafafa] rounded-[8px] flex flex-col pt-5 pb-3 px-5 justify-between group"
            >
              {/* Top content: avatar + name, link, snippet */}
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center gap-[4px]">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-normal flex-shrink-0"
                    style={{ background: avatarBg }}
                  >
                    {initial}
                  </div>
                  <span className="text-[12px] text-[#212121] leading-[18px] font-normal truncate">
                    {comp.name}
                  </span>
                </div>

                {comp.pageUrl ? (
                  <a
                    href={comp.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14px] text-[#212121] group-hover:text-[#1976d2] leading-[20px] tracking-[-0.28px] font-normal line-clamp-1 hover:underline transition-colors"
                  >
                    {comp.name} | {themeLabel}
                  </a>
                ) : (
                  <p className="text-[14px] text-[#212121] group-hover:text-[#1976d2] leading-[20px] tracking-[-0.28px] font-normal line-clamp-1 transition-colors">
                    {comp.name} | {themeLabel}
                  </p>
                )}

                <p
                  className="text-[14px] text-[#555] leading-[20px] tracking-[-0.28px] overflow-hidden"
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', height: 40 }}
                >
                  {comp.llmSnippet}
                </p>
              </div>

              {/* AEO content score — bottom-aligned */}
              <div className="flex items-end gap-[4px] mt-3">
                <span className="text-[12px] text-[#212121] leading-none font-normal whitespace-nowrap">
                  AEO content score
                </span>
                <PieIcon score={score} />
                <span className="text-[16px] text-[#377e2c] leading-none tracking-[-0.32px] font-normal">
                  {score > 0 ? Math.round(score) : '—'}
                </span>
                {score > 0 && (
                  <span className="text-[14px] text-[#8f8f8f] leading-none font-normal">/100</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
