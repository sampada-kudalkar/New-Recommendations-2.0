import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DENTAL_IMPLANT_THEME,
  DENTAL_IMPLANT_PROMPTS,
  MY_BUSINESS,
  getResponseForPromptAndLlm,
  type DentalImplantResponse,
} from '../../../data/dentalImplantResponses'
import novaDentalLogo from '../../../assets/logos/nova-dental.png'
import absolutelyDentalLogo from '../../../assets/logos/absolutely-dental.png'
import townsvillePerioLogo from '../../../assets/logos/townsville-periodontics.png'

const LLMS = ['ChatGPT', 'Gemini', 'Perplexity'] as const
type LLM = typeof LLMS[number]

const RANKS = [1, 2, 3, 4, 5]

const AVATAR_COLORS = ['#f59e0b', '#6b7280', '#8b5cf6', '#10b981', '#ef4444', '#3b82f6']

const COMPETITOR_LOGOS: Record<string, string> = {
  'Nova Dental Implant Centre': novaDentalLogo,
  'Absolutely Dental @ Kirwan Plaza': absolutelyDentalLogo,
  'Townsville Periodontics & Dental Implants': townsvillePerioLogo,
}

function getAvatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

// ── Response modal ────────────────────────────────────────────────────────────
const LLM_BUBBLE_BG: Record<LLM, string> = {
  ChatGPT: '#d1fae5',
  Gemini: '#e8f0fe',
  Perplexity: '#f3e8ff',
}

function renderResponseText(text: string) {
  const lines = text.split('\n')
  return (
    <div>
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={i} className="h-3" />
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <p key={i} className="text-[14px] text-[#212121] leading-[22px] font-medium mb-1">
              {trimmed}
            </p>
          )
        }
        if (trimmed.startsWith('Rank ')) {
          return (
            <p key={i} className="text-[14px] text-[#212121] leading-[22px] font-semibold mt-3 mb-1">
              {trimmed}
            </p>
          )
        }
        return (
          <p key={i} className="text-[14px] text-[#212121] leading-[22px] font-normal mb-1">
            {trimmed}
          </p>
        )
      })}
    </div>
  )
}

interface ModalProps {
  entry: DentalImplantResponse
  onClose: () => void
}

function ResponseModal({ entry, onClose }: ModalProps) {
  const bubbleBg = LLM_BUBBLE_BG[entry.llm as LLM] ?? '#f4f4f4'
  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="fixed inset-0 bg-[rgba(33,33,33,0.64)]" onClick={onClose} />
      <div
        className="relative bg-white mx-auto"
        style={{ borderRadius: 8, padding: 30, marginTop: 65, marginBottom: 40, width: '92%', maxWidth: 860, boxShadow: 'rgba(0,0,0,0.15) 0px 2px 4px 0px' }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded hover:bg-[#f5f5f5]"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[18px] text-[#212121] leading-[26px] font-medium m-0">
              {entry.prompt}
            </h3>
            <span className="inline-block mt-1 text-[12px] text-[#555] bg-[#f0f0f0] rounded px-2 py-0.5">
              {entry.llm}
            </span>
          </div>

          {/* prompt bubble */}
          <div
            className="text-[14px] text-[#1a1a1a] leading-[22px] px-4 py-3 w-fit"
            style={{ background: bubbleBg, borderRadius: '18px 18px 18px 4px', maxWidth: '70%' }}
          >
            {entry.prompt}
          </div>

          {/* response */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
            {renderResponseText(entry.response)}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

// ── Main card ─────────────────────────────────────────────────────────────────
export default function TopMentionsCard() {
  const [selectedLlm, setSelectedLlm] = useState<LLM>('ChatGPT')
  const [modalEntry, setModalEntry] = useState<DentalImplantResponse | null>(null)

  const openModal = (prompt: string) => {
    const entry = getResponseForPromptAndLlm(prompt, selectedLlm)
    if (entry) setModalEntry(entry)
  }

  return (
    <>
      <div className="bg-white border border-[#eaeaea] rounded-[8px] overflow-hidden">

        {/* ── Card header ──────────────────────────────────────────────────── */}
        <div className="px-5 pt-4 pb-3">
          <p className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
            How you rank against competitors
          </p>
          <p className="text-[12px] text-[#555] leading-[18px] mt-[2px]">
            Understand how your brand compares to competitors by theme and ranking position across AI platforms
          </p>
        </div>

        {/* ── LLM Tabs ─────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-5">
          {LLMS.map(llm => (
            <button
              key={llm}
              onClick={() => setSelectedLlm(llm)}
              className={`px-1 py-2 text-[13px] leading-[20px] border-b-2 transition-colors ${
                selectedLlm === llm
                  ? 'border-[#1976d2] text-[#1976d2] font-medium'
                  : 'border-transparent text-[#555] hover:text-[#212121]'
              }`}
            >
              {llm}
            </button>
          ))}
        </div>

        {/* ── Table ────────────────────────────────────────────────────────── */}
        <div className="overflow-x-auto px-5 pb-6">
          {/* Column headers */}
          <div className="flex items-center h-[52px] border-b border-[#eaeaea] min-w-[700px]">
            <div className="w-[280px] flex-shrink-0 pr-4 text-[11px] text-[#555] font-normal">
              Prompt
            </div>
            {RANKS.map(r => (
              <div key={r} className="flex-1 min-w-0 px-3 text-[11px] text-[#555] font-normal">
                Rank {r}
              </div>
            ))}
          </div>

          {/* Prompt rows */}
          {DENTAL_IMPLANT_PROMPTS.map((prompt, idx) => {
            const entry = getResponseForPromptAndLlm(prompt, selectedLlm)
            const rankings = entry?.rankings ?? []
            const isLast = idx === DENTAL_IMPLANT_PROMPTS.length - 1

            return (
              <button
                key={prompt}
                className={`group w-full flex items-start min-h-[68px] py-4 border-b border-[#eaeaea] hover:bg-[#f9f9f9] transition-colors text-left min-w-[700px] ${isLast ? 'border-b-0 rounded-b-[8px]' : ''}`}
                onClick={() => openModal(prompt)}
              >
                {/* Prompt label */}
                <div className="w-[280px] flex-shrink-0 pr-4">
                  <p className="text-[13px] text-[#212121] group-hover:text-[#1976d2] leading-[18px] font-normal transition-colors">
                    {prompt}
                  </p>
                </div>

                {/* Rank cells */}
                {RANKS.map(rank => {
                  const business = rankings[rank - 1] ?? null
                  const isYou = business === MY_BUSINESS
                  return (
                    <div key={rank} className="flex-1 min-w-0 px-3">
                      {business ? (
                        isYou ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gradient-to-b from-[#0f7195] to-[#094459] border-2 border-white text-white text-[12px] font-normal leading-[18px] tracking-[-0.28px]">
                            You
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            {COMPETITOR_LOGOS[business] ? (
                              <img
                                src={COMPETITOR_LOGOS[business]}
                                alt={business}
                                className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div
                                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white"
                                style={{ background: getAvatarColor(business) }}
                              >
                                {business.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span className="text-[13px] text-[#212121] leading-[18px] font-normal">
                              {business}
                            </span>
                          </div>
                        )
                      ) : (
                        <span className="text-[13px] text-[#ccc]">—</span>
                      )}
                    </div>
                  )
                })}
              </button>
            )
          })}
        </div>
      </div>

      {modalEntry && (
        <ResponseModal entry={modalEntry} onClose={() => setModalEntry(null)} />
      )}
    </>
  )
}
