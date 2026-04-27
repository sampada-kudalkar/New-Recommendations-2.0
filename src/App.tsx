import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import L1 from './components/shell/L1'
import L2 from './components/shell/L2'
import Header from './components/shell/Header'
import DashboardPage from './pages/DashboardPage'
import RecommendationsPage from './pages/RecommendationsPage'
import TaskDetailPage from './components/taskDetail/TaskDetailPage'
import FilterPanel from './components/recommendations/FilterPanel'
import RejectModal from './components/recommendations/RejectModal'
import Toast from './components/common/Toast'
import { useAppStore } from './store/useAppStore'

const BASE = import.meta.env.BASE_URL

// ── Icon button matching GitHub header.html .icon-btn spec ───────────────────
// 36×36, border 1px #e5e9f0, radius 4px, hover #f5f5f5
function IconBtn({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <button
      title={title}
      style={{ width: 36, height: 36, border: '1px solid #e5e9f0', borderRadius: 4, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
      className="hover:bg-[#f5f5f5] transition-colors"
    >
      {children}
    </button>
  )
}

// ── Recommendations page header right: Search + More + Filter ────────────────
function RecsHeaderRight() {
  const { toggleFilterPanel, showFilterPanel } = useAppStore()
  return (
    <div className="flex items-center gap-2">
      {/* Search */}
      <IconBtn title="Search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </IconBtn>
      {/* More options */}
      <IconBtn title="More options">
        <img src={`${BASE}assets/more_vert.svg`} alt="More" className="w-5 h-5" />
      </IconBtn>
      {/* Filter — active state when panel is open */}
      <button
        title="Filter"
        onClick={toggleFilterPanel}
        style={{
          width: 36, height: 36,
          border: `1px solid ${showFilterPanel ? '#1976d2' : '#e5e9f0'}`,
          borderRadius: 4,
          background: showFilterPanel ? '#ecf5fd' : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0,
          transition: 'border-color 0.15s, background 0.15s',
        }}
        className="hover:bg-[#f5f5f5]"
      >
        <img src={`${BASE}assets/filter_list.svg`} alt="Filter" className="w-5 h-5" />
      </button>
    </div>
  )
}

// ── Shared app shell ──────────────────────────────────────────────────────────
function AppShell({
  children,
  title,
  showInfoIcon = false,
  headerRight,
  onBack,
  showL2 = true,
  rightPanel,
}: {
  children: React.ReactNode
  title: string
  showInfoIcon?: boolean
  headerRight?: React.ReactNode
  onBack?: () => void
  showL2?: boolean
  rightPanel?: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-white font-roboto">
      <L1 />
      {showL2 && <L2 />}
      {/* L3 main column — shrinks when rightPanel is present */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          title={title}
          showInfoIcon={showInfoIcon}
          headerRight={headerRight}
          onBack={onBack}
        />
        <main className="flex flex-col flex-1 min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
      {/* Right panel sits outside L3 so the entire column (header + content) shrinks */}
      {rightPanel}
    </div>
  )
}

// ── Detail page shell — wires Reject / Accept into the header ─────────────────
function TaskDetailShell() {
  const navigate = useNavigate()
  const { id }   = useParams<{ id: string }>()
  const { recommendations, acceptRec, rejectRec, completeRec } = useAppStore()
  const [isAccepting, setIsAccepting]   = useState(false)
  const [dotCount, setDotCount]         = useState(0)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)

  const rec = id ? recommendations.find(r => r.id === id) : undefined

  // Animate dots in the loading overlay
  useEffect(() => {
    if (!isAccepting) return
    const interval = setInterval(() => setDotCount(d => (d + 1) % 4), 400)
    return () => clearInterval(interval)
  }, [isAccepting])

  const handleReject = () => {
    if (!id) return
    setShowRejectModal(false)
    rejectRec(id)
    navigate('/recommendations')
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
      {/* More options — always visible, dropdown on click */}
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
      title={rec?.title ?? "Recommendation details"}
      onBack={() => navigate('/recommendations')}
      headerRight={headerRight}
    >
      {isAccepting ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-white">
          {/* Spinner */}
          <div className="relative w-14 h-14">
            <svg className="animate-spin" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="24" stroke="#eaeaea" strokeWidth="4" />
              <path
                d="M28 4 a24 24 0 0 1 24 24"
                stroke="#1976d2"
                strokeWidth="4"
                strokeLinecap="round"
              />
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
      ) : (
        <TaskDetailPage />
      )}
      <RejectModal 
        open={showRejectModal} 
        onOpenChange={setShowRejectModal} 
        onReject={handleReject} 
      />
    </AppShell>
  )
}

// ── Router ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter basename={BASE}>
      <Routes>
        {/* Default landing → Recommendations (not Overview) */}
        <Route path="/"            element={<Navigate to="/recommendations" replace />} />
        <Route path="/overview"    element={<AppShell title="Overview"><DashboardPage /></AppShell>} />
        <Route
          path="/recommendations"
          element={
            <AppShell title="Recommendations" showInfoIcon headerRight={<RecsHeaderRight />} rightPanel={<FilterPanel />}>
              <RecommendationsPage />
            </AppShell>
          }
        />
        <Route path="/recommendations/:id" element={<TaskDetailShell />} />
        <Route path="*" element={<Navigate to="/recommendations" replace />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  )
}
