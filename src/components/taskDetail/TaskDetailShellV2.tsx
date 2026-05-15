import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import AppShell from '../shell/AppShell'

import RejectModal from '../recommendations/RejectModal'
import ContentDetailPageV2 from './ContentDetailPageV2'
import GenericDetailPageV2 from './GenericDetailPageV2'

const BASE = import.meta.env.BASE_URL

export default function TaskDetailShellV2() {
  const navigate = useNavigate()
  const { id }   = useParams<{ id: string }>()
  const { recommendations, acceptRec, rejectRec, completeRec } = useAppStore()
  const [isAccepting, setIsAccepting]   = useState(false)
  const [dotCount, setDotCount]         = useState(0)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)

  const rec = id ? recommendations.find(r => r.id === id) : undefined

  useEffect(() => {
    if (!isAccepting) return
    const interval = setInterval(() => setDotCount(d => (d + 1) % 4), 400)
    return () => clearInterval(interval)
  }, [isAccepting])

  const handleReject = () => {
    if (!id) return
    setShowRejectModal(false)
    rejectRec(id)
    navigate('/recommendations-v2')
  }

  const handleAccept = () => {
    if (!id) return
    acceptRec(id, 'self')
    setIsAccepting(true)
    setTimeout(() => setIsAccepting(false), 1600)
  }

  const handleComplete = () => {
    if (!id) return
    completeRec(id)
  }

  const headerRight = rec ? (
    <div className="flex items-center gap-2">
      {rec.status === 'pending' && (
        <button
          onClick={() => setShowRejectModal(true)}
          style={{ height: 36, padding: '8px 12px', border: '1px solid #e5e9f0', borderRadius: 4, background: 'white', fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', color: '#212121', cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
          className="hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
        >
          Reject
        </button>
      )}
      {rec.status === 'pending' && (
        <button
          onClick={handleAccept}
          style={{ height: 36, padding: '8px 12px', border: 'none', borderRadius: 4, background: '#1976d2', fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', color: 'white', cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
          className="whitespace-nowrap transition-colors hover:opacity-90"
        >
          Accept
        </button>
      )}
      {(rec.status === 'accepted' || rec.status === 'in_progress') && (
        <>
          <button
            style={{ height: 36, padding: '8px 12px', border: '1px solid #e5e9f0', borderRadius: 4, background: 'white', fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', color: '#212121', cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
            className="hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
          >
            Assign
          </button>
          <button
            onClick={handleComplete}
            style={{ height: 36, padding: '8px 12px', border: 'none', borderRadius: 4, background: '#1976d2', fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', color: 'white', cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
            className="whitespace-nowrap transition-colors hover:opacity-90"
          >
            Complete
          </button>
        </>
      )}
      <div className="relative">
        <button
          title="More options"
          onClick={() => setShowMoreMenu(v => !v)}
          style={{ width: 36, height: 36, border: '1px solid #e5e9f0', borderRadius: 4, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          className="hover:bg-[#f5f5f5] transition-colors"
        >
          <img src={`${BASE}assets/more_vert.svg`} alt="More" className="w-5 h-5" />
        </button>
        {showMoreMenu && (
          <div
            className="absolute right-0 top-full mt-1.5 z-50 bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#eaeaea] w-52 py-2"
            onMouseLeave={() => setShowMoreMenu(false)}
          >
            {['Download', 'Email recommendation', 'Revert to pending'].map(item => (
              <button
                key={item}
                className="w-full text-left px-3 py-2 text-[13px] text-[#212121] leading-[20px] hover:bg-[#f5f5f5] transition-colors"
                onClick={() => setShowMoreMenu(false)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : null

  return (
    <AppShell
      title={rec?.title ?? 'Recommendation details'}
      onBack={() => navigate('/recommendations-v2')}
      headerRight={headerRight}
    >
      {isAccepting ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-white">
          <div className="relative w-14 h-14">
            <svg className="animate-spin" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="24" stroke="#eaeaea" strokeWidth="4" />
              <path d="M28 4 a24 24 0 0 1 24 24" stroke="#1976d2" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[15px] text-[#212121] font-normal leading-[24px] tracking-[-0.3px]">
              Planning your next steps{''.padEnd(dotCount, '.')}
            </p>
            <p className="text-[13px] text-[#888] leading-[20px]">
              Figuring out the best way to get this done
            </p>
          </div>
        </div>
      ) : rec?.category === 'Content' || rec?.category === 'FAQ' ? (
        <ContentDetailPageV2 />
      ) : (
        <GenericDetailPageV2 />
      )}
      <RejectModal
        open={showRejectModal}
        onOpenChange={setShowRejectModal}
        onReject={handleReject}
      />
    </AppShell>
  )
}
