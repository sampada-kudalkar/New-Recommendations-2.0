import type { Competitor } from '../../types'

const platformColors: Record<string, string> = {
  ChatGPT: 'bg-[#10a37f] text-white',
  Gemini: 'bg-[#4285F4] text-white',
  Perplexity: 'bg-[#6B21A8] text-white',
  Claude: 'bg-[#C77B3A] text-white',
}

export default function CompetitorCard({ competitor }: { competitor: Competitor }) {
  return (
    <div className="bg-white border border-border-primary rounded-md p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-[14px] flex-shrink-0">
            {competitor.name[0]}
          </div>
          <div>
            <p className="text-[14px] font-medium text-text-primary">{competitor.name}</p>
            <p className="text-[12px] text-text-secondary">Cited {competitor.totalCitations} times</p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-wrap justify-end">
          {competitor.citedBy.map(p => (
            <span key={p} className={`text-[11px] px-1.5 py-0.5 rounded-sm font-medium ${platformColors[p] || 'bg-selected text-text-secondary'}`}>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* LLM Snippet */}
      <blockquote className="bg-ai-purple-bg border-l-2 border-ai-purple rounded-sm px-3 py-2 mb-3">
        <p className="text-[13px] text-text-primary italic leading-[20px]">"{competitor.llmSnippet}"</p>
        <p className="text-[11px] text-ai-purple mt-1 font-medium">Exact text AI uses to describe them</p>
      </blockquote>

      <p className="text-[12px] text-text-secondary">{competitor.whyTheyWin}</p>
    </div>
  )
}
