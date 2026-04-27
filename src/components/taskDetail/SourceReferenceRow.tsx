import { ExternalLink } from 'lucide-react'
import type { SourceReference } from '../../types'

const platformIcons: Record<string, string> = {
  Google: '🔍',
  Zocdoc: '📅',
  Healthgrades: '🏥',
  Bing: '🔎',
  Facebook: '👥',
}

export default function SourceReferenceRow({ source }: { source: SourceReference }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border-primary last:border-0">
      <div className="w-8 h-8 rounded-sm bg-selected flex items-center justify-center text-[16px] flex-shrink-0">
        {platformIcons[source.platform] || '🌐'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[13px] font-medium text-text-primary">{source.platform}</span>
          <span className="text-[12px] text-text-secondary">· {source.competitorName}</span>
        </div>
        <p className="text-[12px] text-text-secondary truncate">{source.snippet}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[12px] text-text-secondary whitespace-nowrap">Referenced in {source.referencedInAnswers} answers</span>
        <a href="#" className="text-primary hover:text-primary-hover">
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
