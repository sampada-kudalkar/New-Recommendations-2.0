import { useAppStore } from '../store/useAppStore'
import ListView from '../components/recommendations/ListView'
import type { RecStatus } from '../types'

const BASE = import.meta.env.BASE_URL

// ── Status tile icons ─────────────────────────────────────────────────────────
const TILE_CONFIG: {
  tab: RecStatus
  label: string
  icon: string
  selectedColor: string
  numberColor: string
}[] = [
  {
    tab: 'pending',
    label: 'Pending',
    icon: `${BASE}assets/pending-icon.svg`,
    selectedColor: '#ecf5fd',
    numberColor: '#1976d2',
  },
  {
    tab: 'accepted',
    label: 'Accepted',
    icon: `${BASE}assets/check_circle.svg`,
    selectedColor: '#ecf5fd',
    numberColor: '#1976d2',
  },
  {
    tab: 'completed',
    label: 'Completed',
    icon: `${BASE}assets/Component 75-1.svg`,
    selectedColor: '#ecf5fd',
    numberColor: '#1976d2',
  },
  {
    tab: 'rejected',
    label: 'Rejected',
    icon: `${BASE}assets/Component 75-2.svg`,
    selectedColor: '#ecf5fd',
    numberColor: '#1976d2',
  },
]

// ── Count helper ──────────────────────────────────────────────────────────────
function count(recs: ReturnType<typeof useAppStore.getState>['recommendations'], status: RecStatus) {
  return recs.filter(r => r.status === status).length
}

export default function RecommendationsPage() {
  const { recommendations, activeTab, setActiveTab } = useAppStore()

  const counts: Record<RecStatus, number> = {
    pending:     count(recommendations, 'pending'),
    accepted:    count(recommendations, 'accepted'),
    in_progress: count(recommendations, 'in_progress'),
    completed:   count(recommendations, 'completed'),
    rejected:    count(recommendations, 'rejected'),
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">

      {/* ── 4 Status tiles ────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-6">
        <div className="flex">
        {TILE_CONFIG.map(tile => {
          const isSelected = activeTab === tile.tab
          const n = counts[tile.tab]
          return (
            <button
              key={tile.tab}
              onClick={() => setActiveTab(tile.tab)}
              className="flex-1 flex flex-col items-start px-4 pt-4 pb-4 text-left transition-colors"
              style={{
                background: isSelected ? tile.selectedColor : 'white',
              }}
            >
              {/* Count number */}
              <span
                className="text-[32px] leading-[48px] font-normal tracking-[-0.64px] block"
                style={{ color: isSelected ? tile.numberColor : '#212121' }}
              >
                {n}
              </span>

              {/* Icon + label row */}
              <div className="flex items-center gap-2 mt-0.5">
                <img src={tile.icon} alt="" className="w-4 h-4 flex-shrink-0" />
                <span className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px] font-normal">
                  {tile.label}
                </span>
              </div>
            </button>
          )
        })}
        </div>
      </div>

      {/* ── Table view ───────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ListView />
      </div>

    </div>
  )
}
