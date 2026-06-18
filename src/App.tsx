import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import L1 from './components/shell/L1'
import L2 from './components/shell/L2'
import Header from './components/shell/Header'
import DashboardPage from './pages/DashboardPage'
import RecommendationsV2Page from './pages/RecommendationsV2Page'
import TaskDetailShellV2 from './components/taskDetail/TaskDetailShellV2'
import FilterPanel from './components/recommendations/FilterPanel'
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
              <RecommendationsV2Page />
            </AppShell>
          }
        />
        <Route path="/recommendations/:id" element={<TaskDetailShellV2 />} />
        <Route path="*" element={<Navigate to="/recommendations" replace />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  )
}
