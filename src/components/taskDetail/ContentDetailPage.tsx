import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { Recommendation, AeoSubScore } from '../../types'
import type { BusinessMetrics } from '../../types'
import { nsaThemesConfig } from '../../data/nsaThemesConfig'
import { getLocationsForRec } from '../../data/locationsData'
import { useAppStore } from '../../store/useAppStore'

const BASE = import.meta.env.BASE_URL

// ── Helpers ───────────────────────────────────────────────────────────────────
function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ChevronDown({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── AEO score box — bordered card with donut + number outside ring (Figma 430-3838) ──
function AeoScoreBox({ score }: { score: number }) {
  const r    = 8
  const circ = 2 * Math.PI * r
  const pct  = Math.min(score, 100) / 100
  return (
    <div className="bg-white border border-[#eaeaea] rounded p-3 flex flex-col gap-[6px] items-start flex-shrink-0">
      {/* Score row first (donut + number) */}
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 20 20" style={{ transform: 'rotate(270deg)' }} className="flex-shrink-0">
          <circle cx="10" cy="10" r={r} fill="none" stroke="#eaeaea" strokeWidth="2.5" />
          <circle
            cx="10" cy="10" r={r} fill="none"
            stroke="#4CAE3D" strokeWidth="2.5"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct)}
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[16px] text-[#377e2c] leading-[24px] tracking-[-0.32px] font-normal">{score}</span>
        <span className="text-[14px] text-[#8f8f8f] leading-[20px] font-normal">/100</span>
      </div>
      {/* Label below the score with 6px gap */}
      <p className="text-[12px] text-[#212121] leading-[normal] whitespace-nowrap font-normal">
        AEO content score
      </p>
    </div>
  )
}

// ── Blog preview modal (Figma 377-38069) ─────────────────────────────────────
interface BlogPreviewModalProps {
  open: boolean
  onClose: () => void
  aeoScore: number
  subScores?: AeoSubScore[]
  title: string
  intro: string
  blogUrl?: string
  onAccept?: () => void
}

const HERO_IMG   = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&auto=format&fit=crop&q=80'
const SECTION_IMG = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80'

function BlogPreviewModal({ open, onClose, aeoScore, subScores, title, intro, onAccept }: BlogPreviewModalProps) {
  if (!open) return null
  const fillPct = Math.min(aeoScore, 100)

  const metaRows = [
    {
      label: 'Meta Title',
      value: 'Selling Property in Australia: A Comprehensive Guide | Rain & Horn Dubbo',
    },
    {
      label: 'Meta Description',
      value: "Expert guide to selling property in Australia. From pricing strategy to settlement — Rain & Horn Dubbo's 40+ years of local expertise helps you achieve the best outcome.",
    },
    {
      label: 'Slug',
      value: 'selling-property-australia-comprehensive-guide',
    },
  ]

  function CopyIcon() {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
    )
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto">
      {/* Dark blanket */}
      <div className="fixed inset-0 bg-[rgba(33,33,33,0.64)]" onClick={onClose} />

      {/* Modal panel — 2-column layout */}
      <div
        className="relative bg-white rounded shadow-[0px_4px_8px_0px_rgba(33,33,33,0.18)] w-[1200px] max-w-[calc(100vw-48px)] flex flex-col mt-12 mb-12"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaeaea] flex-shrink-0 bg-white rounded-t-lg">
          <p className="text-[16px] text-[#1f2328] leading-[24px] font-normal">Preview blog</p>
          <div className="flex items-center gap-3">
            <button 
              onClick={onAccept}
              className="h-9 px-4 bg-[#1976d2] text-white text-[14px] leading-[20px] rounded hover:bg-[#1565c0] transition-colors whitespace-nowrap"
            >
              Accept and edit blog
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f5f5f5] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Body: left panel + right panel ── */}
        <div className="flex gap-5 px-5 pb-5 pt-5 min-h-0" style={{ maxHeight: 'calc(90vh - 64px)' }}>

          {/* ── Left panel: AEO score breakdown ── */}
          <div className="w-[360px] flex-shrink-0 border border-[#eaeaea] rounded-lg p-5 overflow-y-auto flex flex-col gap-6">
            {/* Big score + label */}
            <div>
              <div className="flex items-end gap-1">
                <span className="text-[32px] text-[#4cae3d] leading-[44px] font-normal">{aeoScore}</span>
                <span className="text-[15px] font-medium text-[#8f8f8f] leading-[32px]">/ 100</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[16px] text-[#555] leading-[24px] tracking-[-0.32px] font-normal">AEO Content score</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 flex-shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              {/* Progress bar with "You" pill */}
              <div className="relative mt-8 mb-2">
                {/* "You" pill above bar */}
                <div
                  className="absolute bottom-[14px] flex flex-col items-center"
                  style={{ left: `calc(${fillPct}% - 24px)` }}
                >
                  <span className="text-white text-[12px] leading-[16px] px-2 py-0.5 rounded-full border-2 border-white font-normal whitespace-nowrap"
                    style={{ background: 'linear-gradient(180deg, #0f7195 0%, #094459 60%)' }}>
                    You
                  </span>
                  <div className="w-px h-3 bg-[#0f7195]" />
                </div>
                {/* Track */}
                <div className="relative h-[6px] bg-[#e5e5e5] rounded-full w-full">
                  <div className="absolute left-0 top-0 h-full bg-[#0f7195] rounded-full" style={{ width: `${fillPct}%` }} />
                  {/* Dot */}
                  <div
                    className="absolute top-1/2 w-3 h-3 bg-[#0f7195] rounded-full border-2 border-white"
                    style={{ left: `calc(${fillPct}% - 6px)`, transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>
            </div>

            {/* Sub-scores */}
            {subScores && subScores.length > 0 && (
              <div className="flex flex-col gap-6">
                {subScores.map((row, i) => (
                  <div key={i} className="flex items-start justify-between">
                    <div>
                      <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">{row.name}</p>
                      <p className="text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">Weights: {row.weight}</p>
                    </div>
                    <p className="text-[14px] text-[#212121] leading-[20px] whitespace-nowrap">
                      {row.you}<span className="text-[12px] text-[#555]">/100</span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right panel: blog article + meta ── */}
          <div className="flex-1 min-w-0 border border-[#eaeaea] rounded-lg overflow-y-auto flex flex-col">

            {/* Blog article */}
            <div className="pl-[50px] pr-[37px] pt-[38px] pb-[24px] flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-[24px] font-medium text-[#212121] leading-[36px] tracking-[-0.48px]">
                  Dubbo Suburb Service Pages for Sales & Rentals
                </p>
                <div className="flex flex-col gap-[25px] text-[14px] text-[#212121] leading-[20px]">
                  <p>Finding the right real estate support starts with choosing a team that understands your suburb.</p>
                  <p>If you’re thinking of selling, leasing, buying, or renting in Dubbo, working with a local team who understands each suburb can make all the difference. Every part of Dubbo has its own buyer demand, rental trends, property styles, and community appeal.</p>
                  <p>At Raine & Horne Dubbo, we know that property decisions are local. That’s why we proudly help homeowners, investors, landlords, tenants, and buyers across Dubbo’s most sought-after suburbs with trusted real estate advice and personalised service.</p>
                  <p>Whether you need help selling your family home, managing an investment property, or finding the right rental, our experienced team is here to guide you.</p>
                </div>
              </div>

              {/* Hero image */}
              <div className="w-full rounded-lg overflow-hidden">
                <img
                  src={`${BASE}assets/image-1.png`}
                  alt="Dubbo Property"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Section 1 */}
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-medium text-[#212121] leading-[26px] tracking-[-0.36px]">
                  Why Suburb Knowledge Matters
                </p>
                <div className="flex flex-col gap-[25px] text-[14px] text-[#212121] leading-[20px]">
                  <p>The Dubbo market is not one-size-fits-all. A strategy that works in one suburb may not be the best fit for another.</p>
                  <p>For example:</p>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    <li>Family homes in South Dubbo may attract owner-occupiers looking for schools and parks</li>
                    <li>Investment properties near the CBD may appeal to professionals seeking convenience</li>
                    <li>Larger homes in newer estates may suit growing families</li>
                    <li>Rental demand can vary significantly by location and property type</li>
                  </ul>
                  <p>That’s why local suburb expertise matters when pricing, marketing, leasing, or negotiating.</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-medium text-[#212121] leading-[26px] tracking-[-0.36px]">
                  Areas We Service in Dubbo
                </p>
                <div className="flex flex-col gap-[25px] text-[14px] text-[#212121] leading-[20px]">
                  <p>We assist clients across Dubbo and surrounding areas, including:</p>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">South Dubbo</p>
                    <p>Popular with families and owner-occupiers, South Dubbo offers established homes, schools, and convenient amenities.</p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Central Dubbo / CBD</p>
                    <p>Ideal for buyers seeking lifestyle and convenience, with easy access to shopping, dining, and workplaces.</p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">West Dubbo</p>
                    <p>A mix of residential living and strong rental appeal, with growing demand from both families and investors.</p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">East Dubbo</p>
                    <p>Known for quality homes, open space, and a strong community feel.</p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">North Dubbo</p>
                    <p>Affordable options with excellent access to major roads and facilities.</p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Delroy Park</p>
                    <p>A well-regarded area with golf course surroundings, modern homes, and family appeal.</p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Keswick Estate & Newer Developments</p>
                    <p>Popular with buyers seeking modern builds, larger blocks, and contemporary layouts.</p>
                  </div>
                </div>
              </div>

              {/* Section image 2 */}
              <div className="w-full rounded-lg overflow-hidden mt-2">
                <img
                  src={`${BASE}assets/image-2.png`}
                  alt="Areas We Service"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Section 3 */}
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-medium text-[#212121] leading-[26px] tracking-[-0.36px]">
                  Property Sales in Dubbo Suburbs
                </p>
                <div className="flex flex-col gap-[25px] text-[14px] text-[#212121] leading-[20px]">
                  <p>If you’re selling, we provide:</p>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    <li>Accurate suburb-based pricing advice</li>
                    <li>Targeted marketing to active buyers</li>
                    <li>Professional presentation guidance</li>
                    <li>Skilled negotiation to maximise results</li>
                    <li>Ongoing support from appraisal to settlement</li>
                  </ul>
                  <p>We understand what buyers are looking for in each part of Dubbo and tailor every campaign accordingly.</p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-medium text-[#212121] leading-[26px] tracking-[-0.36px]">
                  Rental & Property Management Services
                </p>
                <div className="flex flex-col gap-[25px] text-[14px] text-[#212121] leading-[20px]">
                  <p>For landlords and investors, we offer:</p>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    <li>Rental appraisals based on local demand</li>
                    <li>Quality tenant screening</li>
                    <li>Routine inspections and maintenance coordination</li>
                    <li>Lease management and communication</li>
                    <li>Strategies to maximise rental returns</li>
                  </ul>
                </div>
              </div>

              {/* Section 5 */}
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-medium text-[#212121] leading-[26px] tracking-[-0.36px]">
                  Why Choose Raine & Horne Dubbo?
                </p>
                <div className="flex flex-col gap-[25px] text-[14px] text-[#212121] leading-[20px]">
                  <p>Our strong reputation, trusted local presence, and commitment to personalised service help property owners achieve better outcomes with less stress.</p>
                  <p>We combine recognised brand strength with real local knowledge of the Dubbo market.</p>
                </div>
              </div>

              {/* Section image 3 */}
              <div className="w-full rounded-lg overflow-hidden mt-2">
                <img
                  src={`${BASE}assets/image-3.png`}
                  alt="Contact Raine & Horne Dubbo"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Section 6 */}
              <div className="flex flex-col gap-2">
                <p className="text-[18px] font-medium text-[#212121] leading-[26px] tracking-[-0.36px]">
                  Looking to Buy, Sell or Rent in Dubbo?
                </p>
                <div className="flex flex-col gap-[25px] text-[14px] text-[#212121] leading-[20px]">
                  <p>No matter which suburb you’re focused on, our team can help you make the right move.</p>
                  <p>Contact Raine & Horne Dubbo today for expert advice, a free appraisal, or support with your next property decision.</p>
                </div>
              </div>
            </div>

            {/* Meta section */}
            <div className="border-t border-[#eaeaea] pl-[50px] pr-[37px] pt-[36px] pb-[26px] flex flex-col gap-6">
              {metaRows.map((row, i) => (
                <div key={i} className="flex items-start gap-9">
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] text-black leading-[24px] tracking-[-0.32px] font-normal">{row.label}</p>
                    <p className="text-[18px] text-black leading-[26px] tracking-[-0.36px] font-normal mt-0.5">{row.value}</p>
                  </div>
                  <button className="mt-1 hover:opacity-80 transition-opacity">
                    <CopyIcon />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ── Blog preview inner box (Figma 430-3838) ───────────────────────────────────
interface BlogPreviewBoxProps {
  rec: Recommendation
  aeoScore: number
  /** Override blog title shown inside the preview */
  title?: string
  /** Override description text shown inside the preview */
  body?: string
  /** Override thumbnail image src */
  imageUrl?: string
  /** Override "View blog" href */
  blogUrl?: string
  onOpenClick?: () => void
}
function BlogPreviewBox({ rec, aeoScore, title, body, imageUrl, blogUrl, onOpenClick }: BlogPreviewBoxProps) {
  const displayTitle = title ?? rec.title
  const rawBody      = body ?? rec.description
  const displayBody  = rawBody.length > 120 ? rawBody.slice(0, 120) + '...' : rawBody
  const displayImg   = imageUrl ?? `${BASE}assets/Frame 2147224172.png`

  return (
    <div className="flex items-start gap-3 bg-[#f9f7fd] rounded-lg p-3">
      {/* Left: image + text content — click opens modal */}
      <button
        className="flex flex-1 gap-3 items-start min-w-0 text-left cursor-pointer"
        onClick={onOpenClick}
      >
        <img
          src={displayImg}
          alt="Blog thumbnail"
          className="w-[60px] h-[60px] object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0 flex flex-col gap-0.5 justify-center">
          <div className="flex items-center gap-1">
            <img src={`${BASE}assets/ai-agent.svg`} alt="" className="w-3 h-3 flex-shrink-0" />
            <span className="text-[12px] leading-[18px] tracking-[-0.24px]" style={{ color: '#6834B7' }}>
              Blog generated for you
            </span>
          </div>
          <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px] font-normal">
            {displayTitle}
          </p>
          <p className="text-[14px] text-[#555] leading-[20px] tracking-[-0.28px]">
            {displayBody}{' '}
            <span
              className="font-normal text-[#1976d2] hover:underline"
            >
              View blog
            </span>
          </p>
        </div>
      </button>
      {/* Right: AEO score box */}
      <AeoScoreBox score={aeoScore} />
    </div>
  )
}

// ── Category → metric mapping ─────────────────────────────────────────────────
type MetricsKey = 'citationShare' | 'visibility' | 'sentiment'

function getMetricForCategory(category: string): { label: string; key: MetricsKey } {
  if (['Content', 'Website content', 'FAQ', 'Social'].includes(category)) {
    return { label: 'Citation share', key: 'citationShare' }
  }
  if (['Local SEO', 'Technical SEO', 'Website improvement', 'Conversion'].includes(category)) {
    return { label: 'Visibility score', key: 'visibility' }
  }
  // Trust & Reputation, Reviews — default
  return { label: 'Sentiment score', key: 'sentiment' }
}

// ── Score progress bar card (right column) ────────────────────────────────────
function ScoreCard({ rec, metrics }: { rec: Recommendation; metrics: BusinessMetrics }) {
  const themeConfig  = nsaThemesConfig[rec.themeId]
  const label        = themeConfig?.label ?? rec.category
  const { label: metricLabel, key: metricsKey } = getMetricForCategory(rec.category)
  // Use rec-specific scores when available (accurate per-theme data), fall back to global metrics
  const current = rec.youScore !== undefined ? rec.youScore : metrics[metricsKey]
  const compPct = rec.compScore !== undefined
    ? rec.compScore
    : (() => {
        const compTotal    = rec.competitors.reduce((s, c) => s + c.totalCitations, 0)
        const avgCitations = rec.competitors.length > 0 ? compTotal / rec.competitors.length : 0
        const maxCitations = rec.competitors[0]?.totalCitations ?? 1
        return Math.min((avgCitations / maxCitations) * (current * 1.1), 100)
      })()

  // bar widths — your score vs competitor
  const yourW = Math.min(current, 100)
  const compW = Math.min(compPct, 100)

  return (
    <div className="bg-white border border-[#eaeaea] rounded-lg p-5 flex flex-col gap-3 h-full">
      <p className="text-[16px] text-[#212121] leading-[24px] font-normal">
        What is your {metricLabel} for {label}?
      </p>
      <p className="text-[12px] text-[#555] leading-[18px] font-normal" style={{ marginTop: 4 }}>You vs competitor average</p>

      {/* Big numbers — your score left-aligned, competitor left-aligned to red dot */}
      <div className="relative mt-1" style={{ height: 36 }}>
        <p className="absolute text-[28px] font-normal text-[#212121] leading-none" style={{ left: 0 }}>
          {current.toFixed(0)}%
        </p>
        <p
          className="absolute text-[28px] font-normal text-[#212121] leading-none"
          style={{ left: `${compW}%` }}
        >
          {compPct.toFixed(0)}%
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[11px] text-[#555]">
          <span className="w-2 h-2 rounded-full bg-[#1976d2] flex-shrink-0" />
          Current score
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-[#555]">
          <span className="w-2 h-2 rounded-full bg-[#e53935] flex-shrink-0" />
          Competitor average
        </span>
      </div>

      {/* Single track with 2 marker dots */}
      <div className="relative h-2 bg-[#eaeaea] rounded-full mt-2">
        {/* blue fill up to your score */}
        <div
          className="absolute left-0 top-0 h-full bg-[#1976d2] rounded-full"
          style={{ width: `${yourW}%` }}
        />
        {/* red fill from your score to competitor */}
        {compW > yourW && (
          <div
            className="absolute top-0 h-full bg-[#e53935] rounded-full"
            style={{ left: `${yourW}%`, width: `${compW - yourW}%` }}
          />
        )}
        {/* blue dot — current score */}
        <div
          className="absolute top-1/2 w-2 h-2 bg-[#1976d2] rounded-full border-2 border-white shadow-sm"
          style={{ left: `${yourW}%`, transform: 'translate(-50%, -50%)', boxSizing: 'content-box' }}
        />
        {/* red dot — competitor average */}
        <div
          className="absolute top-1/2 w-2 h-2 bg-[#e53935] rounded-full border-2 border-white shadow-sm"
          style={{ left: `${compW}%`, transform: 'translate(-50%, -50%)', boxSizing: 'content-box' }}
        />
      </div>
    </div>
  )
}

// ── AEO comparison table (Figma 374-35219) ───────────────────────────────────
function AeoComparisonTable({ rec }: { rec: Recommendation }) {
  const [open, setOpen] = useState(false)
  const [subOpen, setSubOpen] = useState(true)
  const aeo  = rec.aeoScore ? { ...rec.aeoScore, you: 98 } : undefined
  const comp = rec.competitors[0]
  if (!aeo || !comp) return null

  return (
    <div className="bg-[#fafafa] rounded-lg overflow-hidden">
      {/* Collapsible header — title + subtitle on left, chevron on right */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f0f0f0] transition-colors"
      >
        <div className="flex flex-col gap-0.5">
          <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px] font-normal">
            Compare AEO content score for Search AI generated blog vs competitor's blog
          </p>
          <p className="text-[12px] text-[#555] leading-[18px] mt-[2px] tracking-[-0.24px] font-normal">
            AEO content score predicts how well your page is likely to perform in answers generated by AI
          </p>
        </div>
        <ChevronDown className={`text-[#555] flex-shrink-0 ml-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="overflow-x-auto px-6">
          <table className="w-full border-collapse">
            <colgroup>
              <col style={{ width: '52%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: '24%' }} />
            </colgroup>
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e9e9eb]">
                <th className="text-left px-1 py-[16px] text-[12px] text-[#212121] font-normal leading-[18px] tracking-[-0.24px]">
                  Score
                </th>
                <th className="text-left p-[16px] text-[12px] font-normal leading-[18px]">
                  <span className="inline-flex items-center justify-center px-[7px] py-[2px] bg-[#0f7195] text-white text-[9px] leading-[14px] rounded-full font-normal border border-white">
                    You
                  </span>
                </th>
                <th className="text-left p-[16px] text-[12px] text-[#555] font-normal leading-[18px]">
                  <span className="truncate max-w-[100px]">{comp.name}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Total row */}
              <tr className="bg-[#fafafa] border-b border-[#eaeaea]">
                <td className="px-1 py-2">
                  <button
                    onClick={() => setSubOpen(o => !o)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronDown className={`w-4 h-4 text-[#555] flex-shrink-0 transition-transform ${subOpen ? '' : '-rotate-90'}`} />
                    <span className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">AEO content score</span>
                  </button>
                </td>
                <td className="px-[20px] py-2 text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">{aeo.you}%</td>
                <td className="px-[20px] py-2 text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">{aeo.competitor}%</td>
              </tr>
              {/* Sub-score rows */}
              {subOpen && aeo.subScores.map((row, i) => (
                <tr key={i} className="bg-[#fafafa] border-b border-[#eaeaea] last:border-b-0">
                  <td className="px-[24px] py-2">
                    <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">{row.name}</p>
                    <p className="text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">Weights: {row.weight}</p>
                  </td>
                  <td className="px-[20px] py-2 text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">{row.you}%</td>
                  <td className="px-[20px] py-2 text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">{row.competitor}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ── Main Content detail layout ────────────────────────────────────────────────
export default function ContentDetailPage() {
  const { recommendations, metrics, acceptRec } = useAppStore()
  // rec is guaranteed to be Content type — passed via TaskDetailPage routing
  // We get it from window location
  const id = window.location.pathname.split('/').pop()
  const rec = recommendations.find(r => r.id === id)

  // Location hover popover state (portal kept for future use)
  const [showLocHover, setShowLocHover] = useState(false)
  const [locPopoverPos, setLocPopoverPos] = useState({ top: 0, left: 0 })
  const [showBlogModal, setShowBlogModal] = useState(false)

  if (!rec) return null

  const themeConfig    = nsaThemesConfig[rec.themeId]
  const locationCount  = rec.locations ?? 1
  const locations      = getLocationsForRec(rec.id, locationCount)
  const firstLocation  = locations[0] ?? ''
  const topComp        = rec.competitors[0]
  const themePrompt    = themeConfig?.prompts?.[0] ?? rec.category

  const handleLocMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setLocPopoverPos({ top: rect.bottom + 8, left: rect.left })
    setShowLocHover(true)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="px-6 py-5 flex flex-col gap-4">

        {/* ═══ ROW 1: Score card (left) + Why it matters (right) ═══════════ */}
        <div className="flex gap-4 items-stretch">

          {/* Left: Score card */}
          <div className="w-[30%] flex-shrink-0">
            <ScoreCard rec={rec} metrics={metrics} />
          </div>

          {/* Right: Why does this matter */}
          {rec.whyItWorks.length > 0 && (
            <div className="flex-1 bg-white border border-[#eaeaea] rounded-lg p-5 min-w-0">
              <p className="text-[16px] text-[#212121] leading-[24px] font-normal mb-0.5">
                Why does this recommendation matter to you
              </p>
              <p className="text-[12px] text-[#555] leading-[18px] mb-3">
                We analyzed your reports and found these gaps
              </p>
              <ul className="flex flex-col gap-2.5">
                {rec.whyItWorks.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#212121] leading-[21px]">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#555] flex-shrink-0" />
                    {pt}
                  </li>
                ))}
                {topComp && (
                  <li className="flex items-start gap-2.5 text-[13px] text-[#212121] leading-[21px]">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[#555] flex-shrink-0" />
                    {topComp.name} is the top cited competitor for {themeConfig?.label ?? rec.category}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* ═══ CARD 2: Generated blog preview (Figma 368-27177) ════════════ */}
        <div className="bg-white border border-[#eaeaea] rounded-lg">
          {/* Header */}
          <div className="px-5 pt-4 pb-2">
            <div className="flex items-start justify-between gap-4">
              <p className="text-[16px] text-[#212121] leading-[24px] font-normal">
                How to fix this
              </p>
              {locationCount > 0 && (
                <div 
                  className="flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  onMouseEnter={handleLocMouseEnter}
                  onMouseLeave={() => setShowLocHover(false)}
                >
                  <PinIcon />
                  <span 
                    className={`text-[12px] text-[#555] leading-[normal] whitespace-nowrap ${locationCount > 1 ? 'border-b border-dashed border-[#888]' : ''}`}
                  >
                    {locationCount === 1 ? firstLocation : `${locationCount} locations`}
                  </span>
                </div>
              )}
            </div>
            <div className="mt-5">
              <p className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
                {rec.title}
              </p>
            </div>
          </div>

          {/* Body: impact + blog card */}
          <div className="px-5 pb-5 flex flex-col gap-3">
            <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">
              {rec.description}
            </p>
            <BlogPreviewBox
              rec={rec}
              aeoScore={98}
              title="Dubbo Suburb Service Pages for Sales & Rentals"
              body="Finding the right real estate support starts with choosing a team that understands your suburb."
              imageUrl={`${BASE}assets/image-1.png`}
              blogUrl={rec.targetPages?.[0]}
              onOpenClick={() => setShowBlogModal(true)}
            />
          </div>
        </div>


        {/* ═══ CARD 4: What to do next (stepper) ══════════════════════════ */}
        <div className="bg-white border border-[#eaeaea] rounded-lg">
          <div className="px-5 pt-5 pb-3">
            <p className="text-[16px] text-[#212121] leading-[24px] font-normal">What to do next</p>
            <p className="text-[12px] text-[#555] leading-[18px] mt-2 font-normal">Step by step guide on what you need to do next</p>
          </div>

          {/* Steps */}
          <div className="pb-2">
            {[
              {
                id: 'step-1',
                label: 'Review your Search AI-generated blog.',
                description: `Birdeye wrote a full Invisalign blog for your practice, optimised for Austin searches. Read through the draft. Change any details, prices, or tone to match your voice. Make minor tweaks to the blog own as user-created content gets better results than the AI-generated content.`
              },
              {
                id: 'step-2',
                label: 'Publish to your website.',
                description: 'Publish to your website to boost Search AI score and assign it to a team member.'
              },
              {
                id: 'step-3',
                label: 'Mark it as complete after publishing.',
                description: 'Mark this task as complete to observe your progress in Search AI score.'
              }
            ].map((step, idx, arr) => {
              const isLast  = idx === arr.length - 1
              const isFirst = idx === 0
              return (
                <div key={step.id} className="flex gap-3 items-stretch px-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-5 h-5 border border-[#eaeaea] rounded-full flex items-center justify-center text-[11px] text-[#555] leading-none flex-shrink-0 bg-white mt-0.5">
                      {idx + 1}
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-[#eaeaea] mt-1" />}
                  </div>
                  <div className={`flex flex-col flex-1 min-w-0 pt-0.5 ${!isLast ? 'pb-5' : 'pb-1'}`}>
                    <p className="text-[14px] text-[#212121] leading-[22px]">{step.label}</p>
                    <p className="text-[13px] text-[#555] leading-[20px] mt-0.5">{step.description}</p>
                    {isFirst && (
                      <div className="mt-3">
                        <button
                          onClick={() => setShowBlogModal(true)}
                          style={{ height: 36, padding: '8px 12px', border: '1px solid #e5e9f0', borderRadius: 4, background: 'white', fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', color: '#212121', cursor: 'pointer', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                          className="hover:bg-[#f5f5f5] transition-colors whitespace-nowrap"
                        >
                          Review Blog
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Need help banner */}
          <div className="flex items-center justify-between gap-3 mx-5 mb-5 mt-2 px-4 py-3 bg-[#ECF5FD] rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="flex-shrink-0" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="text-[12px] text-[#555] leading-[18px]">
                Need help with implementation? Opt in for managed services and our team will make the updates for you on your website
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button style={{ color: '#1976d2', fontSize: 14, fontWeight: 400, background: 'none', border: 'none', cursor: 'pointer', padding: 0, whiteSpace: 'nowrap' }}>
                Implement for me
              </button>
              <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#ddeefa] transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ═══ CARD 5: Competitor blog cited by AI (Figma 374-35219) ══════ */}
        {topComp && (
          <div className="bg-white border border-[#eaeaea] rounded-lg overflow-hidden">
            {/* Card header */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-[16px] text-[#555] leading-[24px] tracking-[-0.32px] font-normal">
                {`What top competitor blog is cited by AI for "${themePrompt}"`}
              </p>
              <p className="text-[12px] text-[#555] leading-[18px] mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
                Analyze why competitors blog is getting cited instead of you
              </p>
            </div>

            {/* Competitor preview row */}
            <div className="px-6 py-3">
              <div className="bg-[#fafafa] rounded-lg p-5 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  {/* Competitor name + logo */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#d32323] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                      Z
                    </span>
                    <span className="text-[12px] text-[#212121] leading-[18px]">{topComp.name}</span>
                  </div>
                  {/* URL link */}
                  <a
                    href={topComp.pageUrl ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-[#1976d2] hover:underline leading-[20px] tracking-[-0.28px]"
                  >
                    {topComp.pageUrl
                      ? `${topComp.name} | Best result`
                      : `${topComp.name} | Top result`}
                  </a>
                  {/* Snippet */}
                  <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px] truncate">
                    {topComp.llmSnippet}
                  </p>
                </div>
                {/* AEO score box — score row first, label below */}
                <AeoScoreBox score={rec.aeoScore?.competitor ?? 85} />
              </div>
            </div>

            {/* AEO comparison table */}
            <div className="px-6 pb-5">
              <AeoComparisonTable rec={rec} />
            </div>
          </div>
        )}

        {/* bottom padding */}
        <div className="h-4 flex-shrink-0" />
      </div>

      {/* Location hover popover — portal */}
      {showLocHover && locationCount > 1 && createPortal(
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
            {locations.map(loc => (
              <li key={loc} className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#f5f5f5]">
                <span className="text-[13px] text-[#212121] leading-[18px]">{loc}</span>
              </li>
            ))}
          </ul>
        </div>,
        document.body,
      )}

      {/* Blog preview modal */}
      <BlogPreviewModal
        open={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        aeoScore={98}
        subScores={rec.aeoScore?.subScores}
        title="Dubbo Suburb Service Pages for Sales & Rentals"
        intro="Finding the right real estate support starts with choosing a team that understands your suburb."
        blogUrl={rec.targetPages?.[0]}
        onAccept={() => {
          acceptRec(rec.id, 'self')
          setShowBlogModal(false)
        }}
      />
    </div>
  )
}
