import { useParams, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import ContentDetailPage from './ContentDetailPage'
import GenericDetailPage from './GenericDetailPage'

export default function TaskDetailPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { recommendations } = useAppStore()

  const rec = recommendations.find(r => r.id === id)

  if (!rec) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-3 text-[#555]">
        <p className="text-[16px]">Recommendation not found</p>
        <button
          onClick={() => navigate('/recommendations')}
          className="text-[#1976d2] text-[14px] hover:underline"
        >
          ← Back to recommendations
        </button>
      </div>
    )
  }

  if (rec.category === 'Content' || rec.category === 'FAQ') {
    return <ContentDetailPage />
  }
  return <GenericDetailPage />
}
