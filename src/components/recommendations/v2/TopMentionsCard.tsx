import { useState } from 'react'
import AiResponseModal from './AiResponseModal'
import type { AiResponseEntry } from '../../../data/aiResponses'
import {
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

function toAiEntry(r: DentalImplantResponse): AiResponseEntry {
  return {
    date: 'Jan 10, 2026',
    location: 'Kirwan, QLD',
    llm: r.llm,
    prompt: r.prompt,
    response: r.response,
    citations: [],
  }
}

// ── Main card ─────────────────────────────────────────────────────────────────
export default function TopMentionsCard() {
  const [selectedLlm, setSelectedLlm] = useState<LLM>('ChatGPT')
  const [modalEntry, setModalEntry] = useState<AiResponseEntry | null>(null)

  const openModal = (prompt: string) => {
    const entry = getResponseForPromptAndLlm(prompt, selectedLlm)
    if (entry) setModalEntry(toAiEntry(entry))
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
            See where you appear in AI-generated answers across AI sites
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
                          <div className="flex items-start gap-1.5">
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

      <AiResponseModal
        open={modalEntry !== null}
        onClose={() => setModalEntry(null)}
        entry={modalEntry}
        themeTitle={modalEntry?.prompt}
      />
    </>
  )
}
