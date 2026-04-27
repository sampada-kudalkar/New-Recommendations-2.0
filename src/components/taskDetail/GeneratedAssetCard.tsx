import { useState } from 'react'
import { CheckCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import type { GeneratedAsset } from '../../types'
import { useAppStore } from '../../store/useAppStore'

interface Props {
  asset: GeneratedAsset
  recId: string
  disabled?: boolean
}

export default function GeneratedAssetCard({ asset, recId, disabled }: Props) {
  const { approveAsset } = useAppStore()
  const [expanded, setExpanded] = useState(false)

  const typeIcons: Record<string, string> = { blog: '📝', faq: '❓', schema: '🔗', social: '📱', content_suggestions: '✏️', citations: '📊' }

  return (
    <div className={`border rounded-md overflow-hidden ${asset.approved ? 'border-green-value/30 bg-green-bg/30' : 'border-ai-purple-border bg-ai-purple-bg'}`}>
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <div className="w-12 h-12 rounded-sm bg-ai-purple/10 flex items-center justify-center text-[22px] flex-shrink-0">
          {typeIcons[asset.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M8 0L9.5 6H16L10.5 9.5L12.5 16L8 12L3.5 16L5.5 9.5L0 6H6.5L8 0Z" fill="#6834b7"/>
            </svg>
            <span className="text-[12px] text-ai-purple">Created by Content hub</span>
          </div>
          <p className="text-[15px] font-medium text-text-primary leading-[20px]">{asset.title}</p>
          <p className="text-[13px] text-text-secondary mt-1 leading-[18px] line-clamp-2">{asset.previewText}</p>
        </div>
      </div>

      {/* Expanded full content */}
      {expanded && (
        <div className="px-4 pb-3 fade-in">
          <div className="bg-white border border-border-primary rounded-sm p-3 text-[13px] text-text-secondary leading-[20px] whitespace-pre-wrap max-h-48 overflow-y-auto font-mono">
            {asset.fullContent}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between px-4 pb-3 gap-2">
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1 text-[13px] text-primary hover:text-primary-hover"
        >
          {expanded ? <><ChevronUp size={14} /> Hide content</> : <><ChevronDown size={14} /> View {asset.type}</>}
        </button>

        <div className="flex items-center gap-2">
          {asset.approved ? (
            <span className="flex items-center gap-1.5 text-[13px] text-green-text">
              <CheckCircle size={15} /> Approved
            </span>
          ) : (
            !disabled && (
              <button
                onClick={() => approveAsset(recId)}
                className="flex items-center gap-1.5 text-[13px] px-3 py-1.5 bg-ai-purple text-white rounded-sm hover:bg-ai-purple/90 transition-all"
              >
                <CheckCircle size={14} /> Approve {asset.type}
              </button>
            )
          )}
          <a href="#" className="flex items-center gap-1 text-[13px] text-text-secondary hover:text-primary border border-border-primary rounded-sm px-2.5 py-1.5">
            <ExternalLink size={13} /> View {asset.type}
          </a>
        </div>
      </div>
    </div>
  )
}
