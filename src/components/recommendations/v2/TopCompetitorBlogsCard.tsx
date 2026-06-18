import type { Recommendation } from '../../../types'
import { nsaThemesConfig, formatThemeLabel } from '../../../data/nsaThemesConfig'
import { findResponseByPromptAndLlm } from '../../../data/aiResponses'

const AI_PLATFORMS = ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'Google AI mode']
const AVATAR_COLORS = ['#f59e0b', '#6b7280', '#8b5cf6', '#10b981', '#ef4444', '#3b82f6']

const DUMMY_SNIPPETS = [
  'Providing comprehensive dental care and professional teeth whitening services to patients across the local area...',
  'Offering expert cosmetic dentistry including professional in-chair and take-home whitening treatments for every smile...',
  'Trusted local dental practice specialising in smile enhancement, teeth whitening, and general family dentistry services...',
]

function aeoScoreForName(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff
  return 50 + (h % 36)
}

function AeoScoreInline({ score }: { score: number }) {
  return (
    <div className="flex gap-[4px] items-center">
      <p className="text-[12px] text-[#212121] leading-normal font-normal whitespace-nowrap">
        AEO content score
      </p>
      <p className="font-normal leading-[0] text-[0px]">
        <span className="text-[16px] text-[#377e2c] leading-[24px] tracking-[-0.32px] font-medium">{score}</span>
        {' '}
        <span className="text-[14px] text-[#8f8f8f] leading-[20px]">/100</span>
      </p>
    </div>
  )
}

interface Props { rec: Recommendation }

export default function TopCompetitorBlogsCard({ rec }: Props) {
  const themeConfig = nsaThemesConfig[rec.themeId]
  const themeLabel  = rec.themeId ? formatThemeLabel(rec.themeId) : (themeConfig?.label ?? rec.category)
  const prompts     = themeConfig?.prompts ?? [themeLabel]

  // Aggregate mention frequency across all prompts × platforms
  const freq: Record<string, number> = {}
  for (const prompt of prompts) {
    for (const platform of AI_PLATFORMS) {
      const entry = findResponseByPromptAndLlm(prompt, platform)
      for (const name of (entry?.mentionedCompetitors ?? [])) {
        freq[name] = (freq[name] ?? 0) + 1
      }
    }
  }

  const top3Names = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name)

  if (top3Names.length === 0) return null

  return (
    <div className="bg-white border border-[#eaeaea] rounded-[8px] overflow-hidden">

      {/* Header */}
      <div className="px-[20px] py-[16px]">
        <p className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
          Which top competitor blogs are cited by AI for prompts related to '{themeLabel}'
        </p>
        <p className="text-[12px] text-[#555] leading-[18px] mt-[2px] overflow-hidden text-ellipsis whitespace-nowrap">
          Discover prompts are appearing in answers across AI platforms
        </p>
      </div>

      {/* 3-column competitor cards */}
      <div className="px-[24px] pb-[12px] border-b border-[#eaeaea]">
        <div className="flex gap-[10px] items-start">
          {top3Names.map((name, i) => {
            const comp = rec.competitors.find(c => c.name === name)
            const initial  = name.charAt(0).toUpperCase()
            const avatarBg = AVATAR_COLORS[i % AVATAR_COLORS.length]
            const pageUrl  = comp?.pageUrl ?? ''
            const snippet  = comp?.llmSnippet || DUMMY_SNIPPETS[i % DUMMY_SNIPPETS.length]
            const urlLabel = pageUrl ? `${name} | ${themeLabel}` : name
            const score    = aeoScoreForName(name)

            return (
              <div
                key={name}
                className="bg-[#fafafa] rounded-[8px] flex-1 min-w-0 pt-[20px] pb-[12px] px-[20px] flex flex-col gap-[8px] items-start"
              >
                {/* Name + url + snippet group */}
                <div className="flex flex-col gap-[4px] w-full">
                  {/* Icon + name */}
                  <div className="flex items-center gap-[4px]">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-normal flex-shrink-0"
                      style={{ background: avatarBg }}
                    >
                      {initial}
                    </div>
                    <p className="text-[12px] text-[#212121] leading-[18px] font-normal whitespace-nowrap truncate">
                      {name}
                    </p>
                  </div>

                  {/* Page URL */}
                  {pageUrl ? (
                    <a
                      href={pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#1976d2] leading-[20px] tracking-[-0.28px] font-normal truncate block w-full"
                    >
                      {urlLabel}
                    </a>
                  ) : (
                    <p className="text-[14px] text-[#1976d2] leading-[20px] tracking-[-0.28px] font-normal truncate w-full">
                      {urlLabel}
                    </p>
                  )}

                  {/* Snippet — 2-line clamp */}
                  <p
                    className="text-[14px] text-[#555] leading-[20px] tracking-[-0.28px] font-normal overflow-hidden w-full"
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                  >
                    {snippet}
                  </p>
                </div>

                {/* AEO score — no ring chart */}
                <AeoScoreInline score={score} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
