import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'

export default function CoachCallout() {
  const navigate = useNavigate()
  const { recommendations, metrics } = useAppStore()

  const pending = recommendations.filter(r => r.status === 'pending')
  const topRec = pending[0]
  const pendingCount = pending.length

  if (!topRec) return null

  return (
    <div className="bg-ai-purple-bg border border-ai-purple-border rounded-md p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.5 6H16L10.5 9.5L12.5 16L8 12L3.5 16L5.5 9.5L0 6H6.5L8 0Z" fill="#6834b7"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-ai-purple mb-0.5">
            AI Coach — {pendingCount} action{pendingCount !== 1 ? 's' : ''} waiting
          </p>
          <p className="text-[13px] text-text-secondary mb-3 leading-[19px]">
            Your top priority: <strong className="text-text-primary">{topRec.title}</strong>.
            {' '}Completing it could move your score from {metrics.searchAiScore} → {Math.min(100, metrics.searchAiScore + 8)}.
          </p>
          <button
            onClick={() => navigate(`/recommendations/${topRec.id}`)}
            className="flex items-center gap-1 text-[13px] text-ai-purple font-medium hover:underline"
          >
            Start now <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
