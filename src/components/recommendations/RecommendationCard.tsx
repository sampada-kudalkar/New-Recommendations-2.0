import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Recommendation } from '../../types'
import AssignModal from './AssignModal'
import { getLocationsForRec } from '../../data/locationsData'
import { useAppStore } from '../../store/useAppStore'

const BASE = import.meta.env.BASE_URL

// ── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[12px] leading-[18px] tracking-[-0.24px] whitespace-nowrap font-normal ${className}`}
    >
      {children}
    </span>
  )
}

// ── Quick wins chip (bolt icon + text) ───────────────────────────────────────
function QuickWinChip() {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] leading-[18px] tracking-[-0.24px] whitespace-nowrap font-normal text-[#555]">
      <img src={`${BASE}assets/electric_bolt.svg`} alt="" className="w-3.5 h-3.5 flex-shrink-0" />
      Quick wins
    </span>
  )
}

// ── Bigger lift chip (bulb icon + text) ──────────────────────────────────────
function BiggerLiftChip() {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] leading-[18px] tracking-[-0.24px] whitespace-nowrap font-normal text-[#c65c04]">
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        className="flex-shrink-0"
      >
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.74V17H8v-2.26A7 7 0 0 1 12 2z"/>
      </svg>
      Bigger lift
    </span>
  )
}

// ── Effort chip ───────────────────────────────────────────────────────────────
function EffortChip({ effort }: { effort: Recommendation['effort'] }) {
  if (effort === 'Quick win')   return <QuickWinChip />
  if (effort === 'Bigger lift') return <BiggerLiftChip />
  return null // Medium — hidden
}

// ── Pin / location icon (inline SVG — no asset available) ────────────────────
function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

// ── Trend-up arrow icon ───────────────────────────────────────────────────────
function TrendUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#303030" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  )
}


// ══════════════════════════════════════════════════════════════════════════════
//  KANBAN compact card (unchanged from before)
// ══════════════════════════════════════════════════════════════════════════════
function KanbanCard({ rec }: { rec: Recommendation }) {
  const [showAssign, setShowAssign] = useState(false)
  const doneSt = rec.checklist.filter(s => s.completed).length
  const totalSt = rec.checklist.length
  const isActive = rec.status === 'accepted' || rec.status === 'in_progress'

  return (
    <>
      <div className="bg-white border border-[#eaeaea] p-3 hover:border-[#c0c0c0] transition-all rounded-sm">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Chip className="bg-[#eaeaea] text-[#555]">{rec.category}</Chip>
          <EffortChip effort={rec.effort} />
        </div>
        <p className="text-[13px] text-[#212121] leading-[18px] tracking-[-0.26px] line-clamp-2 mb-2 font-normal">
          {rec.title}
        </p>
        <p className="text-[12px] text-[#377e2c] mb-2">{rec.impactLabel}</p>
        {isActive && totalSt > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1 bg-[#eaeaea] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6834b7] rounded-full"
                style={{ width: `${(doneSt / totalSt) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-[#888]">{doneSt}/{totalSt}</span>
          </div>
        )}
        <button
          onClick={() => rec.status === 'pending' && setShowAssign(true)}
          className="w-full text-[13px] py-1.5 rounded-sm text-center border border-[#e5e9f0] text-[#212121] hover:bg-[#f5f5f5] transition-colors"
        >
          {rec.status === 'pending'
            ? 'Start →'
            : isActive
            ? 'Continue →'
            : '✅ Done'}
        </button>
      </div>
      {showAssign && <AssignModal recId={rec.id} onClose={() => setShowAssign(false)} />}
    </>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  LIST card — matches Figma overview design exactly
//
//  Structure:
//    [category chip] [effort chip]           [📍 N locations]
//    Title (14px #212121)
//    Description (14px #555, 2-line clamp)
//    ↗ impactLabel
// ══════════════════════════════════════════════════════════════════════════════
function ListCard({ rec }: { rec: Recommendation }) {
  const navigate = useNavigate()
  const rejectRec = useAppStore(s => s.rejectRec)
  const locationCount = rec.locations ?? 1
  const [showLocations, setShowLocations] = useState(false)

  return (
    <div
      onClick={() => navigate(`/recommendations/${rec.id}`)}
      className="border-b border-[#eaeaea] px-8 py-5 cursor-pointer hover:bg-[#fafafa] transition-colors"
    >
      {/* Row 1: chips (left) + locations (right) */}
      <div className="flex items-center justify-between gap-4 mb-3">
        {/* Left: category + effort chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <Chip className="bg-[#eaeaea] text-[#555]">{rec.category}</Chip>
          <EffortChip effort={rec.effort} />
        </div>

        {/* Right: location count with hover popover */}
        <div
          className="relative flex items-center gap-1 flex-shrink-0"
          onMouseEnter={() => setShowLocations(true)}
          onMouseLeave={() => setShowLocations(false)}
          onClick={e => e.stopPropagation()}
        >
          <PinIcon />
          <span className="text-[12px] text-[#555] leading-[18px] tracking-[-0.24px] whitespace-nowrap">
            {locationCount} location{locationCount !== 1 ? 's' : ''}
          </span>

          {showLocations && (
            <div className="absolute right-0 top-full mt-1.5 z-50 bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#eaeaea] w-56 py-2">
              <p className="px-3 pt-1 pb-2 text-[11px] text-[#888] font-medium tracking-[0.4px] uppercase">
                Locations covered
              </p>
              <ul className="max-h-52 overflow-y-auto">
                {getLocationsForRec(rec.id, locationCount).map(loc => (
                  <li key={loc} className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#f5f5f5]">
                    <PinIcon />
                    <span className="text-[13px] text-[#212121] leading-[18px]">{loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: title */}
      <p className="text-[14px] text-[#212121] leading-[22px] tracking-[-0.28px] font-normal mb-1">
        {rec.title}
      </p>

      {/* Row 4: description in score nudge box */}
      <div className="flex items-center gap-2 bg-[#f9f7fd] px-2 pt-2 pb-2 rounded mt-5 mb-5">
        <TrendUpIcon />
        <span className="text-[13px] text-[#555] leading-[18px] tracking-[-0.26px]">
          {rec.description}
        </span>
      </div>

      {/* Row 5: CTAs */}
      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => navigate(`/recommendations/${rec.id}`)}
          style={{
            height: 36,
            padding: '8px 12px',
            border: '1px solid #e5e9f0',
            borderRadius: 4,
            background: 'white',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '-0.28px',
            color: '#212121',
            cursor: 'pointer',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
          }}
          className="hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
        >
          View details
        </button>
        <button
          onClick={() => rejectRec(rec.id)}
          style={{
            height: 36,
            padding: '8px 12px',
            border: '1px solid #e5e9f0',
            borderRadius: 4,
            background: 'white',
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '-0.28px',
            color: '#212121',
            cursor: 'pointer',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
          }}
          className="hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
        >
          Reject
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  PUBLIC EXPORT — routes to the right variant
// ══════════════════════════════════════════════════════════════════════════════
interface Props {
  rec: Recommendation
  isKanban?: boolean
}

export default function RecommendationCard({ rec, isKanban = false }: Props) {
  if (isKanban) return <KanbanCard rec={rec} />
  return <ListCard rec={rec} />
}
