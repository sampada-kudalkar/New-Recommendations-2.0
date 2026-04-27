import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import type { Recommendation, RecCategory } from '../../types'
import type { BusinessMetrics } from '../../types'
import { getLocationsForRec } from '../../data/locationsData'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { CircleX, CircleCheck } from 'lucide-react'

const BASE = import.meta.env.BASE_URL

// ── Category → metric label map ───────────────────────────────────────────────
const CATEGORY_METRIC: Partial<Record<RecCategory, { label: string; key: keyof BusinessMetrics }>> = {
  'Content':             { label: 'Citation share',   key: 'citationShare' },
  'Website content':     { label: 'Citation share',   key: 'citationShare' },
  'FAQ':                 { label: 'Citation share',   key: 'citationShare' },
  'Social':              { label: 'Citation share',   key: 'citationShare' },
  'Local SEO':           { label: 'Visibility score', key: 'visibility' },
  'Technical SEO':       { label: 'Visibility score', key: 'visibility' },
  'Website improvement': { label: 'Visibility score', key: 'visibility' },
  'Conversion':          { label: 'Visibility score', key: 'visibility' },
  'Trust & Reputation':  { label: 'Sentiment score',  key: 'sentiment' },
  'Reviews':             { label: 'Sentiment score',  key: 'sentiment' },
}

// Categories that should float to top by default (content creation types)
const TOP_CATEGORIES: RecCategory[] = ['Content', 'Website content', 'FAQ', 'Website improvement']

// ── Sort chevron SVG ──────────────────────────────────────────────────────────
function ChevronIcon({ direction }: { direction: 'up' | 'down' | 'none' }) {
  if (direction === 'none') {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    )
  }
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`flex-shrink-0 ${direction === 'up' ? 'rotate-180' : ''}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── Down chevron for location hover ──────────────────────────────────────────
function DownChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── Pin icon for location popover ─────────────────────────────────────────────
function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
      <path d="M10 1.667A5.833 5.833 0 0 0 4.167 7.5c0 4.375 5.833 10.833 5.833 10.833S15.833 11.875 15.833 7.5A5.833 5.833 0 0 0 10 1.667zm0 7.916a2.083 2.083 0 1 1 0-4.166 2.083 2.083 0 0 1 0 4.166z" fill="#888"/>
    </svg>
  )
}

// ── Performance bar ───────────────────────────────────────────────────────────
function PerformanceBar({ rec, metrics }: { rec: Recommendation; metrics: BusinessMetrics }) {
  const meta  = CATEGORY_METRIC[rec.category]
  // Use rec-specific accurate score when available, fall back to global metrics
  const current = rec.youScore !== undefined ? rec.youScore : (meta ? (metrics[meta.key] as number) : 0)
  const compPct = rec.compScore !== undefined
    ? rec.compScore
    : (() => {
        const compTotal    = rec.competitors.reduce((s, c) => s + c.totalCitations, 0)
        const avgCitations = rec.competitors.length > 0 ? compTotal / rec.competitors.length : 0
        const maxCitations = rec.competitors[0]?.totalCitations ?? 1
        return Math.min((avgCitations / maxCitations) * (current * 1.1), 100)
      })()

  const label = meta?.label ?? 'Score'
  const isNone = current === 0

  // bar widths — your score vs competitor
  const yourW = Math.min(current, 100)
  const compW = Math.min(compPct, 100)

  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      {/* Single track with 2 marker dots */}
      <div className="relative h-3 bg-[#eaeaea] rounded-[4px] mt-2 overflow-hidden flex">
        {/* blue fill up to your score */}
        <div
          className="h-full bg-[#1976d2]"
          style={{ width: `${yourW}%` }}
        />
        {/* red fill from your score to competitor */}
        {compW > yourW && (
          <div
            className="h-full bg-[#ff9e80]"
            style={{ width: `${compW - yourW}%` }}
          />
        )}
      </div>
      {/* Labels */}
      <div className="flex flex-col mt-1">
        <span className="text-[12px] text-[#212121] leading-[20px] whitespace-nowrap font-normal">
          Your {label} : {isNone ? '0%' : `${current.toFixed(1)}%`}
        </span>
        <span className="text-[12px] text-[#555555] leading-[18px] whitespace-nowrap font-normal">
          Industry average : {compPct.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}

// ── Sort types ────────────────────────────────────────────────────────────────
type SortKey = 'recommendation' | 'type' | 'impact' | 'performance' | 'locations'
type SortDir = 'asc' | 'desc'

interface Props {
  recommendations: Recommendation[]
  metrics: BusinessMetrics
}

export default function TableView({ recommendations, metrics }: Props) {
  const navigate  = useNavigate()
  const [sortKey, setSortKey] = useState<SortKey>('impact')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  // Location hover state — one popover for the whole table
  const [hoveredRow, setHoveredRow]       = useState<string | null>(null)
  const [showLocHover, setShowLocHover]   = useState(false)
  const [locPopoverPos, setLocPopoverPos] = useState({ top: 0, left: 0 })
  const [popoverLocations, setPopoverLocations] = useState<string[]>([])
  const chevronRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const handleChevronEnter = (rec: Recommendation) => {
    const el = chevronRefs.current[rec.id]
    if (el) {
      const rect = el.getBoundingClientRect()
      setLocPopoverPos({ top: rect.bottom + 6, left: rect.left - 80 })
    }
    const locs = getLocationsForRec(rec.id, rec.locations ?? 1)
    setPopoverLocations(locs)
    setShowLocHover(true)
  }

  // ── Sort logic ──────────────────────────────────────────────────────────────
  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = [...recommendations].sort((a, b) => {
    // Always push these specific recommendations to the bottom
    const BOTTOM_IDS = ['69de016e9c10756b6b61329f', '69de02549c10756b6b6132b4']
    const aIsBottom = BOTTOM_IDS.includes(a.id) ? 1 : 0
    const bIsBottom = BOTTOM_IDS.includes(b.id) ? 1 : 0
    if (aIsBottom !== bIsBottom) return aIsBottom - bIsBottom

    // Always float top-category recs first (content creation types)
    const aIsTop = TOP_CATEGORIES.includes(a.category) ? 0 : 1
    const bIsTop = TOP_CATEGORIES.includes(b.category) ? 0 : 1
    if (aIsTop !== bIsTop) return aIsTop - bIsTop

    let cmp = 0
    if (sortKey === 'recommendation') {
      cmp = a.title.localeCompare(b.title)
    } else if (sortKey === 'type') {
      cmp = a.category.localeCompare(b.category)
    } else if (sortKey === 'impact') {
      const order: Record<string, number> = { 'Quick win': 0, 'Medium': 1, 'Bigger lift': 2 }
      cmp = (order[a.effort] ?? 1) - (order[b.effort] ?? 1)
    } else if (sortKey === 'performance') {
      const getVal = (r: Recommendation) => {
        if (r.youScore !== undefined) return r.youScore
        const meta = CATEGORY_METRIC[r.category]
        return meta ? (metrics[meta.key] as number) : 0
      }
      cmp = getVal(a) - getVal(b)
    } else if (sortKey === 'locations') {
      cmp = (a.locations ?? 0) - (b.locations ?? 0)
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  // ── Header cell helper ──────────────────────────────────────────────────────
  function SortableHeader({
    label, colKey, className = '',
  }: { label: string; colKey: SortKey; className?: string }) {
    const active = sortKey === colKey
    const dir    = active ? sortDir === 'asc' ? 'up' : 'down' : 'none'
    return (
      <TableHead
        className={`cursor-pointer select-none ${className} relative group/th`}
        onClick={() => handleSort(colKey)}
      >
        <span className="inline-flex items-center gap-1">
          <span className={`text-[14px] font-normal leading-[20px] ${active ? 'text-[#212121]' : 'text-[#555]'}`}>
            {label}
          </span>
          <ChevronIcon direction={dir} />
        </span>
      </TableHead>
    )
  }

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#555]">
        <div className="w-12 h-12 rounded-full bg-[#e5e9f0] flex items-center justify-center mb-3">
          <span className="text-[24px]">✓</span>
        </div>
        <p className="text-[16px] font-normal">No tasks in this category</p>
        <p className="text-[14px] mt-1 font-light">Click a status tile above to switch views</p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      {/* 24px left/right padding wrapping the full table */}
      <div className="w-full overflow-x-auto px-6 pb-20">
        <Table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
          {/* ── Column widths ─────────────────────────────────────── */}
          <colgroup>
            <col style={{ width: '24%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '32%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>

          {/* ── Header ───────────────────────────────────────────── */}
          <TableHeader>
            <TableRow className="border-b border-[#eaeaea] hover:bg-transparent">
              <SortableHeader label="Recommendations"    colKey="recommendation" className="py-3" />
              <SortableHeader label="Type"               colKey="type" className="py-3" />
              <SortableHeader label="Impact"             colKey="impact" className="py-3" />
              <SortableHeader label="Current performance" colKey="performance" className="py-3" />
              {/* Locations header — left-aligned */}
              <TableHead
                className="text-left py-3 pr-6 cursor-pointer select-none"
                onClick={() => handleSort('locations')}
              >
                <span className="inline-flex items-center justify-start gap-1">
                  <span className={`text-[14px] font-normal leading-[20px] ${sortKey === 'locations' ? 'text-[#212121]' : 'text-[#555]'}`}>
                    Locations
                  </span>
                  <ChevronIcon direction={sortKey === 'locations' ? (sortDir === 'asc' ? 'up' : 'down') : 'none'} />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* ── Rows ─────────────────────────────────────────────── */}
          <TableBody>
            {sorted.map(rec => {
              const isHovered = hoveredRow === rec.id
              const locationCount = rec.locations ?? 1
              return (
                <TableRow
                  key={rec.id}
                  className="border-b border-[#eaeaea] hover:bg-[#fafafa] cursor-pointer transition-colors align-top group h-[88px]"
                  onClick={() => navigate(`/recommendations/${rec.id}`)}
                  onMouseEnter={() => setHoveredRow(rec.id)}
                  onMouseLeave={() => { setHoveredRow(null) }}
                >

                  {/* Col 1 — Recommendations */}
                  <TableCell className="py-4 align-top">
                    <p className="text-[14px] text-[#212121] leading-[22px] font-normal group-hover:text-primary transition-colors pr-4 whitespace-normal">
                      {rec.title}
                    </p>
                  </TableCell>

                  {/* Col 2 — Type */}
                  <TableCell className="py-4 align-top">
                    <Badge variant="outline" className="font-normal text-[#555] whitespace-nowrap">
                      {rec.category}
                    </Badge>
                  </TableCell>

                  {/* Col 3 — Impact */}
                  <TableCell className="py-4 align-top">
                    <div className="flex items-start gap-2 pr-4">
                      {/* Fixed-width icon placeholder so text always aligns */}
                      <span className="flex-shrink-0 w-4 h-4 mt-0.5 flex items-center justify-center">
                        {rec.effort === 'Quick win' && (
                          <img
                            src={`${BASE}assets/electric_bolt.svg`}
                            alt="Quick win"
                            className="w-4 h-4"
                          />
                        )}
                        {rec.effort === 'Bigger lift' && (
                          <img
                            src={`${BASE}assets/lead.svg`}
                            alt="High impact"
                            className="w-4 h-4"
                          />
                        )}
                      </span>
                      <p className="text-[14px] text-[#212121] leading-[22px] line-clamp-3 whitespace-normal">
                        {rec.description}
                      </p>
                    </div>
                  </TableCell>

                  {/* Col 4 — Current performance */}
                  <TableCell className="py-4 align-top">
                    <div className="pr-4">
                      <PerformanceBar rec={rec} metrics={metrics} />
                    </div>
                  </TableCell>

                  {/* Col 5 — Locations & Actions */}
                  <TableCell className="py-4 pr-6 align-top relative">
                    <div className="flex items-center gap-1.5 h-[32px]">
                      {/* Always show location count */}
                      <div className="w-8 flex-shrink-0 text-left">
                        <span className="text-[14px] text-[#212121] leading-[22px]">
                          {locationCount}
                        </span>
                      </div>

                      {/* Hover actions */}
                      <div 
                        className={`flex-1 flex items-center justify-center gap-1.5 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          ref={el => { chevronRefs.current[rec.id] = el }}
                          className="flex items-center justify-center w-[36px] h-[36px] hover:bg-[#eaeaea] rounded-none transition-colors"
                          onClick={e => {
                            e.stopPropagation()
                            handleChevronEnter(rec)
                          }}
                          onMouseEnter={e => {
                            e.stopPropagation()
                            handleChevronEnter(rec)
                          }}
                          onMouseLeave={() => {
                            setTimeout(() => {
                              if (!showLocHover) return
                            }, 80)
                          }}
                        >
                          <DownChevronIcon />
                        </button>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="w-[36px] h-[36px] rounded-none border-[#eaeaea] text-[#555] hover:text-[#212121] hover:bg-[#f5f5f5]">
                              <CircleX className="w-[20px] h-[20px]" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Reject</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="w-[36px] h-[36px] rounded-none border-[#eaeaea] text-[#555] hover:text-[#212121] hover:bg-[#f5f5f5]">
                              <CircleCheck className="w-[20px] h-[20px]" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Accept</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </TableCell>

                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Location hover popover — portal */}
      {showLocHover && createPortal(
        <div
          className="fixed z-[9999] bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#eaeaea] w-56 py-2"
          style={{ top: locPopoverPos.top, left: locPopoverPos.left }}
          onMouseEnter={() => setShowLocHover(true)}
          onMouseLeave={() => setShowLocHover(false)}
        >
          <p className="px-3 pt-1 pb-2 text-[11px] text-[#888] font-medium tracking-[0.4px] uppercase">
            Locations covered
          </p>
          <ul className="max-h-52 overflow-y-auto">
            {popoverLocations.map(loc => (
              <li key={loc} className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#f5f5f5]">
                <PinIcon />
                <span className="text-[13px] text-[#212121] leading-[18px]">{loc}</span>
              </li>
            ))}
          </ul>
        </div>,
        document.body,
      )}
    </TooltipProvider>
  )
}
