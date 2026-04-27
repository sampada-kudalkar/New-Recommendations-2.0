import type { ContentGap } from '../../types'

export default function ContentGapTag({ gap }: { gap: ContentGap }) {
  return (
    <div className="bg-white border border-border-primary rounded-md p-4 mb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[14px] font-medium text-text-primary">"{gap.phrase}"</span>
        <span className="text-[12px] px-2 py-0.5 rounded-full bg-red-bg text-red-text">{gap.frequency}×</span>
      </div>
      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
        <span className="text-[12px] text-text-secondary">Used by:</span>
        {gap.competitors.map(c => (
          <span key={c} className="text-[12px] px-1.5 py-0.5 rounded-sm bg-selected text-text-secondary">{c}</span>
        ))}
      </div>
      <p className="text-[13px] text-text-secondary">💡 {gap.recommendation}</p>
    </div>
  )
}
