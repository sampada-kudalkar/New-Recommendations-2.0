import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Recommendation } from '../../../types'
import { nsaThemesConfig } from '../../../data/nsaThemesConfig'
import { findResponseByPromptAndLlm, type AiResponseEntry } from '../../../data/aiResponses'
import AiResponseModal from './AiResponseModal'

const AVATAR_COLORS = ['#f59e0b', '#6b7280', '#8b5cf6', '#10b981', '#ef4444', '#3b82f6']

const AI_PLATFORMS = ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Google AI mode']

function SortChevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="inline-block ml-1 text-[#aaa] flex-shrink-0">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function AccordionChevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`flex-shrink-0 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── Mentions hover dropdown ───────────────────────────────────────────────────
function MentionsCell({ competitors }: { competitors: string[] }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const visibleComps = competitors.slice(0, 3)
  const overflowCount = competitors.length > 3 ? competitors.length - 3 : 0

  const handleMouseEnter = () => {
    if (!ref.current || competitors.length === 0) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ top: rect.bottom + 6, left: rect.left })
    setOpen(true)
  }

  return (
    <div
      ref={ref}
      className="flex-1 min-w-0 flex items-center gap-[4px] cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setOpen(false)}
    >
      {visibleComps.map((name, i) => (
        <div
          key={name}
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-normal flex-shrink-0"
          style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      ))}
      {overflowCount > 0 && (
        <span className="text-[12px] text-[#8f8f8f] font-normal ml-1">+{overflowCount}</span>
      )}
      {competitors.length === 0 && (
        <span className="text-[12px] text-[#ccc]">—</span>
      )}

      {open && competitors.length > 0 && createPortal(
        <div
          className="fixed z-[9999] w-[240px] bg-white rounded-[4px] shadow-[0px_4px_8px_0px_rgba(33,33,33,0.18)] py-3"
          style={{ top: pos.top, left: pos.left }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="flex flex-col gap-1 px-4">
            {competitors.map((name, i) => (
              <div
                key={name}
                className="flex items-center gap-2 px-0 py-2"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-medium flex-shrink-0"
                  style={{
                    background: AVATAR_COLORS[i % AVATAR_COLORS.length],
                    color: '#fff',
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px] font-normal">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

interface Props { rec: Recommendation }

export default function CompetitorCitationsCardV2({ rec }: Props) {
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null)
  const [modalEntry, setModalEntry] = useState<AiResponseEntry | null>(null)

  const themeConfig = nsaThemesConfig[rec.themeId]
  const themeLabel = themeConfig?.label ?? rec.category
  const prompts = themeConfig?.prompts ?? [themeLabel]

  // Expand first prompt by default
  useEffect(() => {
    if (prompts.length > 0 && expandedPrompt === null) {
      setExpandedPrompt(prompts[0])
    }
  }, [])

  const togglePrompt = (p: string) =>
    setExpandedPrompt(prev => (prev === p ? '' : p))

  const openModal = (entry: AiResponseEntry | undefined, platform: string, prompt: string) => {
    if (entry) {
      setModalEntry(entry)
    } else {
      setModalEntry({
        date: 'Jan 10, 2026',
        llm: platform,
        location: '',
        prompt,
        response: `No response data is available for ${platform} on this prompt.`,
        citations: [],
      })
    }
  }

  return (
    <>
      <div className="bg-white border border-[#eaeaea] rounded-[8px] overflow-hidden">

        {/* ── Card header ──────────────────────────────────────────────── */}
        <div className="px-5 pt-4 pb-4">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
              How do AI platforms respond to
            </span>
            <span className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
              '{themeLabel}'
            </span>
          </div>
          <p className="text-[12px] text-[#555] leading-[18px] mt-[2px]">
            Discover prompts are appearing in answers across AI platforms
          </p>
        </div>

        {/* ── Accordion sections — each is its own card ───────────────── */}
        <div className="px-6 pb-5 flex flex-col gap-3">
          {prompts.map((prompt) => {
            const isExpanded = expandedPrompt === prompt

            return (
              <div
                key={prompt}
                className="rounded-[8px] bg-white overflow-hidden"
              >
                {/* Accordion header row — 52px */}
                <button
                  className="w-full flex items-center gap-2 h-[52px] px-4 bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors text-left"
                  onClick={() => togglePrompt(prompt)}
                >
                  <AccordionChevron expanded={isExpanded} />
                  <span className="text-[13px] text-[#212121] leading-[20px] font-normal">
                    {prompt}
                  </span>
                </button>

                {/* Expanded table body */}
                {isExpanded && (
                  <div>
                    {/* Column headers — 36px, no top divider, left-aligned with accordion text */}
                    <div className="flex items-center h-[36px] pl-[40px] pr-4 border-b border-[#eaeaea] bg-[#fafafa]">
                      <div className="flex-1 min-w-0 flex items-center text-[11px] text-[#555] font-normal">
                        AI site <SortChevron />
                      </div>
                      <div className="flex-1 min-w-0 flex items-center text-[11px] text-[#555] font-normal">
                        Position <SortChevron />
                      </div>
                      <div className="flex-1 min-w-0 text-[11px] text-[#555] font-normal">
                        All mentions
                      </div>
                      <div className="flex-1 min-w-0 flex items-center text-[11px] text-[#555] font-normal">
                        Action <SortChevron />
                      </div>
                    </div>

                    {/* Platform rows — 54px each */}
                    {AI_PLATFORMS.map((platform, rowIdx) => {
                      const entry = findResponseByPromptAndLlm(prompt, platform)
                      const position = entry?.ourPosition ?? null
                      const competitors = entry?.mentionedCompetitors ?? []
                      const isLast = rowIdx === AI_PLATFORMS.length - 1

                      return (
                        <div
                          key={platform}
                          className={`flex items-center h-[54px] pl-[40px] pr-4 border-b border-[#eaeaea] bg-[#fafafa] hover:bg-[#f0f0f0] transition-colors ${isLast ? 'border-b-0 rounded-b-[8px]' : ''}`}
                        >
                          {/* AI site */}
                          <div className="flex-1 min-w-0 text-[13px] text-[#212121] font-normal">
                            {platform}
                          </div>

                          {/* Position */}
                          <div className="flex-1 min-w-0">
                            {position !== null ? (
                              <span className="text-[13px] text-[#212121] font-normal">{position}</span>
                            ) : (
                              <span className="text-[13px] text-[#8f8f8f] font-normal">No mention</span>
                            )}
                          </div>

                          {/* All mentions — competitor avatars with hover dropdown */}
                          <MentionsCell competitors={competitors} />

                          {/* Action */}
                          <div className="flex-1 min-w-0">
                            <button
                              className="text-[13px] text-[#1976d2] font-normal hover:underline transition-colors"
                              onClick={() => openModal(entry, platform, prompt)}
                            >
                              View response
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>

      <AiResponseModal
        open={modalEntry !== null}
        onClose={() => setModalEntry(null)}
        entry={modalEntry}
        themeTitle={themeLabel}
      />
    </>
  )
}
