import { useState, useRef, useEffect } from 'react'
import type { Recommendation } from '../../../types'
import { nsaThemesConfig } from '../../../data/nsaThemesConfig'
import { findAiResponse, type AiResponseEntry } from '../../../data/aiResponses'
import AiResponseModal from './AiResponseModal'

const LLM_TABS = ['ChatGPT', 'Gemini', 'Perplexity', 'Google AI Mode', 'Google AI Overviews']

const PROMPT_ROWS = [
  { date: 'Jan 10, 2026', location: 'Dubbo, NSW',    responseExcerpt: 'Here are the top-rated real estate agencies in Dubbo that consistently appear in AI-generated recommendations for buyers and sellers looking to transact in the local property market.' },
  { date: 'Jan 10, 2026', location: 'Orange, NSW',   responseExcerpt: 'The leading property agencies in Orange NSW include several highly regarded firms offering residential sales, property management, and free market appraisals for homeowners.' },
  { date: 'Jan 9, 2026',  location: 'Bathurst, NSW', responseExcerpt: 'Top real estate agents in Bathurst are active across multiple suburbs, with many offering complimentary property appraisals and tailored marketing plans for vendors.' },
  { date: 'Jan 8, 2026',  location: 'Parkes, NSW',   responseExcerpt: 'Looking for a property appraisal in Parkes? Several well-reviewed agencies offer no-obligation valuations with experienced local agents who understand the regional NSW market.' },
]

interface Props {
  rec: Recommendation
}

export default function AiResponseTableV2({ rec }: Props) {
  const [llmTab, setLlmTab] = useState('ChatGPT')
  const [modalEntry, setModalEntry] = useState<AiResponseEntry | null>(null)
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themeLabel = nsaThemesConfig[rec.themeId]?.label ?? rec.category
  const prompts = nsaThemesConfig[rec.themeId]?.prompts ?? [themeLabel]
  const hasMultiplePrompts = prompts.length > 1
  const activePrompt = prompts[selectedPromptIdx]

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

  const openModal = (date: string, location: string) => {
    const entry = findAiResponse(date, llmTab, location)
    if (entry) setModalEntry(entry)
  }

  return (
    <>
      <div className="bg-white border border-[#eaeaea] rounded-[8px]">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[16px] text-[#212121] leading-[24px] font-normal">
              What were the AI sites' responses to
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
                  <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-[#eaeaea] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] min-w-[280px] max-w-sm py-1">
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

          <p className="text-[12px] text-[#888] leading-[18px] mt-0.5">
            To generate this recommendation, we ran these prompts across LLMs. Here are the responses each AI site returned
          </p>
        </div>

        {/* ── LLM tab bar (no bottom border — divider removed) ─────────── */}
        <div className="flex gap-5 px-5 overflow-x-auto">
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

        {/* ── Table header ─────────────────────────────────────────────── */}
        <div className="flex items-center h-[32px] px-5 text-[12px] text-[#555] font-normal border-b border-[#eaeaea]">
          <div className="w-[140px] flex-shrink-0">Date</div>
          <div className="w-[160px] flex-shrink-0">Location</div>
          <div className="flex-1 min-w-0">Response</div>
        </div>

        {/* ── Table rows ──────────────────────────────────────────────── */}
        <div>
          {(showAll ? PROMPT_ROWS : PROMPT_ROWS.slice(0, 5)).map((row, i) => (
            <div
              key={i}
              className="group flex items-center h-[48px] px-5 border-b border-[#eaeaea] hover:bg-[#f2f4f7] transition-colors last:border-b-0 cursor-pointer"
              onClick={() => openModal(row.date, row.location)}
            >
              <div className="w-[140px] flex-shrink-0 text-[13px] text-[#212121]">{row.date}</div>
              <div className="w-[160px] flex-shrink-0 text-[13px] text-[#212121]">{row.location}</div>

              <div className="flex-1 min-w-0 flex items-center gap-3">
                <span className="text-[13px] text-[#212121] group-hover:text-[#1976d2] truncate flex-1 min-w-0 transition-colors">
                  {row.responseExcerpt}
                </span>
                <button
                  className="hidden group-hover:flex flex-shrink-0 items-center whitespace-nowrap hover:bg-[#f5f5f5] transition-colors"
                  style={{
                    height: 36,
                    padding: '8px 12px',
                    border: '1px solid #e5e9f0',
                    borderRadius: 4,
                    background: 'white',
                    fontSize: 14,
                    lineHeight: '20px',
                    letterSpacing: '-0.28px',
                    color: '#212121',
                    cursor: 'pointer',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                  }}
                  onClick={e => { e.stopPropagation(); openModal(row.date, row.location) }}
                >
                  View response
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Show more ────────────────────────────────────────────────── */}
        {!showAll && PROMPT_ROWS.length > 5 && (
          <button
            className="w-full py-2.5 text-[13px] text-[#1976d2] hover:bg-[#f5f5f5] transition-colors border-t border-[#eaeaea]"
            onClick={() => setShowAll(true)}
          >
            Show {PROMPT_ROWS.length - 5} more
          </button>
        )}

      </div>

      {/* Response modal */}
      <AiResponseModal
        open={modalEntry !== null}
        onClose={() => setModalEntry(null)}
        entry={modalEntry}
      />
    </>
  )
}
