import { useState } from 'react'
import { createPortal } from 'react-dom'
import type { Recommendation, AeoSubScore } from '../../types'
import type { BusinessMetrics } from '../../types'
import { nsaThemesConfig } from '../../data/nsaThemesConfig'
import { getLocationsForRec } from '../../data/locationsData'
import { useAppStore } from '../../store/useAppStore'
import { getDisplayScore } from '../../data/zeroScoreReplacements'


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
  onAccept?: () => void
}

function BlogPreviewModal({ open, onClose, aeoScore, subScores, onAccept }: BlogPreviewModalProps) {
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
  onOpenClick?: () => void
}
function BlogPreviewBox({ rec, aeoScore, title, body, imageUrl, onOpenClick }: BlogPreviewBoxProps) {
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

// ── Table icons (check_circle / cancel from Figma design) ────────────────────
function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.15001 8.7001L6.15001 7.71676C6.02778 7.59454 5.8889 7.53343 5.73334 7.53343C5.57778 7.53343 5.4389 7.59454 5.31667 7.71676C5.19445 7.83899 5.13334 7.98065 5.13334 8.14177C5.13334 8.30288 5.19445 8.44454 5.31667 8.56676L6.73334 9.98343C6.85556 10.1057 6.99445 10.1668 7.15001 10.1668C7.30556 10.1668 7.44445 10.1057 7.56667 9.98343L10.6833 6.86676C10.8056 6.74454 10.8667 6.60288 10.8667 6.44176C10.8667 6.28065 10.8056 6.13899 10.6833 6.01676C10.5611 5.89454 10.4222 5.83343 10.2667 5.83343C10.1111 5.83343 9.97223 5.89454 9.85001 6.01676L7.15001 8.7001ZM8.00001 14.4001C7.12223 14.4001 6.29445 14.2334 5.51667 13.9001C4.7389 13.5668 4.05834 13.1084 3.47501 12.5251C2.89167 11.9418 2.43334 11.2612 2.10001 10.4834C1.76667 9.70565 1.60001 8.87788 1.60001 8.0001C1.60001 7.11121 1.76667 6.28065 2.10001 5.50843C2.43334 4.73621 2.89167 4.05843 3.47501 3.4751C4.05834 2.89176 4.7389 2.43343 5.51667 2.1001C6.29445 1.76676 7.12223 1.6001 8.00001 1.6001C8.8889 1.6001 9.71945 1.76676 10.4917 2.1001C11.2639 2.43343 11.9417 2.89176 12.525 3.4751C13.1083 4.05843 13.5667 4.73621 13.9 5.50843C14.2333 6.28065 14.4 7.11121 14.4 8.0001C14.4 8.87788 14.2333 9.70565 13.9 10.4834C13.5667 11.2612 13.1083 11.9418 12.525 12.5251C11.9417 13.1084 11.2639 13.5668 10.4917 13.9001C9.71945 14.2334 8.8889 14.4001 8.00001 14.4001Z" fill="#4CAE3D"/>
    </svg>
  )
}

function CancelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99999 8.9335L9.93333 10.8668C10.0556 10.9891 10.2111 11.0502 10.4 11.0502C10.5889 11.0502 10.7444 10.9891 10.8667 10.8668C10.9889 10.7446 11.05 10.5891 11.05 10.4002C11.05 10.2113 10.9889 10.0557 10.8667 9.9335L8.93333 8.00016L10.8667 6.06683C10.9889 5.94461 11.05 5.78905 11.05 5.60016C11.05 5.41127 10.9889 5.25572 10.8667 5.1335C10.7444 5.01127 10.5889 4.95016 10.4 4.95016C10.2111 4.95016 10.0556 5.01127 9.93333 5.1335L7.99999 7.06683L6.06666 5.1335C5.94444 5.01127 5.78888 4.95016 5.59999 4.95016C5.41111 4.95016 5.25555 5.01127 5.13333 5.1335C5.01111 5.25572 4.94999 5.41127 4.94999 5.60016C4.94999 5.78905 5.01111 5.94461 5.13333 6.06683L7.06666 8.00016L5.13333 9.9335C5.01111 10.0557 4.94999 10.2113 4.94999 10.4002C4.94999 10.5891 5.01111 10.7446 5.13333 10.8668C5.25555 10.9891 5.41111 11.0502 5.59999 11.0502C5.78888 11.0502 5.94444 10.9891 6.06666 10.8668L7.99999 8.9335ZM7.99999 14.6668C7.07777 14.6668 6.21111 14.4918 5.39999 14.1418C4.58888 13.7918 3.88333 13.3168 3.28333 12.7168C2.68333 12.1168 2.20833 11.4113 1.85833 10.6002C1.50833 9.78905 1.33333 8.92238 1.33333 8.00016C1.33333 7.07794 1.50833 6.21127 1.85833 5.40016C2.20833 4.58905 2.68333 3.8835 3.28333 3.2835C3.88333 2.6835 4.58888 2.2085 5.39999 1.8585C6.21111 1.5085 7.07777 1.3335 7.99999 1.3335C8.92222 1.3335 9.78888 1.5085 10.6 1.8585C11.4111 2.2085 12.1167 2.6835 12.7167 3.2835C13.3167 3.8835 13.7917 4.58905 14.1417 5.40016C14.4917 6.21127 14.6667 7.07794 14.6667 8.00016C14.6667 8.92238 14.4917 9.78905 14.1417 10.6002C13.7917 11.4113 13.3167 12.1168 12.7167 12.7168C12.1167 13.3168 11.4111 13.7918 10.6 14.1418C9.78888 14.4918 8.92222 14.6668 7.99999 14.6668Z" fill="#DE1B0C"/>
    </svg>
  )
}

// ── Property/construction site logo circles for mentions & citations ───────────
function ZillowLogo() {
  return <div className="w-5 h-5 rounded-full bg-[#006aff] flex items-center justify-center flex-shrink-0"><span className="text-white text-[9px] font-bold leading-none">Z</span></div>
}
function RealtorLogo() {
  return <div className="w-5 h-5 rounded-full bg-[#d92228] flex items-center justify-center flex-shrink-0"><span className="text-white text-[9px] font-bold leading-none">R</span></div>
}
function TruliaLogo() {
  return <div className="w-5 h-5 rounded-full bg-[#5a8f0a] flex items-center justify-center flex-shrink-0"><span className="text-white text-[9px] font-bold leading-none">T</span></div>
}
function HomesLogo() {
  return <div className="w-5 h-5 rounded-full bg-[#f47321] flex items-center justify-center flex-shrink-0"><span className="text-white text-[9px] font-bold leading-none">H</span></div>
}
function LoopNetLogo() {
  return <div className="w-5 h-5 rounded-full bg-[#333333] flex items-center justify-center flex-shrink-0"><span className="text-white text-[9px] font-bold leading-none">L</span></div>
}
function CoStarLogo() {
  return <div className="w-5 h-5 rounded-full bg-[#007b9e] flex items-center justify-center flex-shrink-0"><span className="text-white text-[9px] font-bold leading-none">C</span></div>
}

const SITE_LOGOS = [ZillowLogo, RealtorLogo, TruliaLogo, HomesLogo, LoopNetLogo, CoStarLogo]

function SiteLogos({ count, startIdx = 0 }: { count: number; startIdx?: number }) {
  const MAX_SHOWN = 3
  const shown = Math.min(count, MAX_SHOWN)
  const extra = count - shown
  return (
    <div className="flex items-center gap-[4px]">
      {Array.from({ length: shown }, (_, i) => {
        const Logo = SITE_LOGOS[(startIdx + i) % SITE_LOGOS.length]
        return <Logo key={i} />
      })}
      {extra > 0 && (
        <span className="text-[13px] text-[#212121] font-normal leading-normal">+ {extra}</span>
      )}
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
  const rawScore = rec.youScore !== undefined ? rec.youScore : metrics[metricsKey]
  const current = getDisplayScore(rec.id, rawScore)
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
      <div>
        <p className="text-[16px] text-[#212121] leading-[24px] font-normal mb-1">
          What is your {metricLabel} for '{label}'
        </p>
        <p className="text-[12px] text-[#555] leading-[18px] font-normal">You vs competitor average</p>
      </div>

      {/* Score and Legend Row */}
      <div className="flex items-start gap-8 mt-2 mb-2">
        {/* Your Score */}
        <div className="flex flex-col gap-1">
          <p className="text-[32px] font-normal text-[#212121] leading-none">
            {current.toFixed(1)}%
          </p>
          <span className="flex items-center gap-1.5 text-[11px] text-[#555]">
            <span className="w-2 h-2 rounded-full bg-[#1976d2] flex-shrink-0" />
            Current score
          </span>
        </div>

        {/* Competitor Score */}
        <div className="flex flex-col gap-1">
          <p className="text-[32px] font-normal text-[#212121] leading-none">
            {compPct.toFixed(1)}%
          </p>
          <span className="flex items-center gap-1.5 text-[11px] text-[#555]">
            <span className="w-2 h-2 rounded-full bg-[#e53935] flex-shrink-0" />
            Competitor average
          </span>
        </div>
      </div>

      {/* Single track with 2 marker dots */}
      <div className="relative h-2 bg-[#eaeaea] rounded-full mt-2 mb-1">
        {/* red fill from 0 to competitor (underneath) */}
        <div
          className="absolute left-0 top-0 h-full bg-[#F99E8F] rounded-full"
          style={{ width: `${compW}%` }}
        />
        {/* blue fill from 0 to your score (on top) */}
        <div
          className="absolute left-0 top-0 h-full bg-[#1976d2] rounded-full"
          style={{ width: `${yourW}%` }}
        />
        {/* blue dot — current score */}
        <div
          className="absolute top-1/2 w-3.5 h-3.5 bg-[#1976d2] rounded-full border-2 border-white shadow-sm z-20"
          style={{ left: `${yourW}%`, transform: 'translate(-50%, -50%)', boxSizing: 'border-box' }}
        />
        {/* red dot — competitor average */}
        <div
          className="absolute top-1/2 w-3.5 h-3.5 bg-[#e53935] rounded-full border-2 border-white shadow-sm z-10"
          style={{ left: `${compW}%`, transform: 'translate(-50%, -50%)', boxSizing: 'border-box' }}
        />
      </div>
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
  const [activeTab, setActiveTab] = useState<'recommendation' | 'evidence'>('recommendation')
  const [aeoTableOpen, setAeoTableOpen] = useState(false)
  const [showLocHover, setShowLocHover] = useState(false)
  const [locPopoverPos, setLocPopoverPos] = useState({ top: 0, right: 0 })
  const [showBlogModal, setShowBlogModal] = useState(false)
  const [llmTab, setLlmTab] = useState('ChatGPT')

  if (!rec) return null

  const themeConfig    = nsaThemesConfig[rec.themeId]
  const locationCount  = rec.locations ?? 1
  const locations      = getLocationsForRec(rec.id, locationCount)
  const firstLocation  = locations[0] ?? ''
  const topComp        = rec.competitors[0]
  const themePrompt    = themeConfig?.prompts?.[0] ?? rec.category

  const handleLocMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    // Right align the popover with the right edge of the trigger
    setLocPopoverPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
    setShowLocHover(true)
  }

  const PROMPT_ROWS = [
    { date: 'Jan 10, 2026', location: 'Atlanta, GA',  mentioned: true,  position: 1, positionDelta: 1,    mentionCount: 20, citationCount: 3, responseExcerpt: 'Here are some top-rated dental clinics and Invisalign providers in Atlanta that consistently appear in AI-generated recommendations across multiple platforms.' },
    { date: 'Jan 10, 2026', location: 'Dallas, TX',   mentioned: false, position: null, positionDelta: null, mentionCount: 0,  citationCount: 2, responseExcerpt: 'The best dental clinics in Dallas include several highly rated practices offering Invisalign treatment, cosmetic dentistry, and family dental care services.' },
    { date: 'Jan 9, 2026',  location: 'Chicago, IL',  mentioned: true,  position: 2, positionDelta: 3,    mentionCount: 18, citationCount: 3, responseExcerpt: 'Top Invisalign providers in Chicago are spread across multiple neighborhoods, with many offering free consultations and flexible payment plans for new patients.' },
    { date: 'Jan 8, 2026',  location: 'Austin, TX',   mentioned: true,  position: 1, positionDelta: 2,    mentionCount: 20, citationCount: 2, responseExcerpt: 'Looking for Invisalign in Austin? Several well-reviewed orthodontic practices and dental clinics offer clear aligner treatment with experienced specialists.' },
  ]
  const LLM_TABS = ['ChatGPT', 'Gemini', 'Perplexity', 'Google AI Mode', 'Google AI Overviews']

  return (
    <div className="flex-1 overflow-y-auto bg-white flex flex-col">
      {/* ── Tab bar ─────────────────────────────────────────────────────── */}
      <div className="border-b border-[#eaeaea] px-6 flex gap-6 bg-white flex-shrink-0 sticky top-0 z-10">
        {(['recommendation', 'evidence'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-[14px] font-normal border-b-2 -mb-px transition-colors capitalize ${
              activeTab === tab
                ? 'border-[#1976d2] text-[#212121]'
                : 'border-transparent text-[#555] hover:text-[#212121]'
            }`}
          >
            {tab === 'recommendation' ? 'Recommendation' : 'Evidence'}
          </button>
        ))}
      </div>

      {/* ── Recommendation tab ──────────────────────────────────────────── */}
      {activeTab === 'recommendation' && (
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
                We analyzed and found these gaps
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
                How can you fix this gap
              </p>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <p className="text-[16px] text-[#212121] leading-[24px] tracking-[-0.32px] font-normal">
                {rec.title}
              </p>
              {locationCount > 0 && (
                <div 
                  className="flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  onMouseEnter={handleLocMouseEnter}
                  onMouseLeave={() => setShowLocHover(false)}
                >
                  <PinIcon />
                  <span 
                    className="text-[12px] text-[#555] leading-[normal] whitespace-nowrap"
                  >
                    {locationCount === 1 ? firstLocation : `${locationCount} locations`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Body: impact + blog card */}
          <div className="px-5 pb-5 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#212121] leading-[20px] tracking-[-0.28px]">
                {rec.expectedImpact ?? rec.description}
                {rec.aeoScore && (
                  <> We created a page draft based on what’s working for competitors. Review and publish to start capturing leads.</>
                )}
              </p>
            </div>
            <BlogPreviewBox
              rec={rec}
              aeoScore={98}
              title="Dubbo Suburb Service Pages for Sales & Rentals"
              body="Finding the right real estate support starts with choosing a team that understands your suburb."
              imageUrl={`${BASE}assets/image-1.png`}
              onOpenClick={() => setShowBlogModal(true)}
            />
          </div>
        </div>


        {/* ═══ CARD 4: What to do next (stepper) ══════════════════════════ */}
        <div className="bg-white border border-[#eaeaea] rounded-lg">
          <div className="px-5 pt-5 pb-3">
            <p className="text-[16px] text-[#212121] leading-[24px] font-normal mb-1">What to do next</p>
            <p className="text-[12px] text-[#555] leading-[18px] font-normal">Step by step guide on what you need to do next</p>
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

        {/* bottom padding */}
        <div className="h-4 flex-shrink-0" />
      </div>
      )}

      {/* ── Evidence tab ────────────────────────────────────────────────── */}
      {activeTab === 'evidence' && (
      <div className="px-6 py-5 flex flex-col gap-4">

        {/* ═══ Competitor blogs cited by AI ════════════════════════════════ */}
        <div className="border border-[#eaeaea] rounded-lg overflow-hidden bg-white pb-3">
          {/* Header */}
          <div className="px-5 pt-4 pb-2">
            <p className="text-[16px] text-[#212121] leading-[24px] font-normal">
              {`Which top competitor blogs are cited by AI for '${themePrompt}'`}
            </p>
            <p className="text-[12px] text-[#555] leading-[18px] mt-0.5">
              Analyze why competitors blog is getting cited instead of you
            </p>
          </div>

          {/* 3 competitor rows — grey bg, no border */}
          {rec.competitors.slice(0, 3).map((comp, i) => {
            const initial      = (comp.name ?? '?')[0].toUpperCase()
            const avatarColors = ['#e6a817', '#555555', '#1565c0']
            const bgColors     = ['#fff8e1', '#f5f5f5', '#e3f2fd']
            const compAeo      = rec.aeoScore?.competitor ?? 85
            return (
              <div key={i} className="px-6 py-3">
                <div className="bg-[#fafafa] rounded-lg p-5 flex items-start justify-between gap-4">
                  <div className="flex flex-col flex-1 min-w-0 gap-1">
                    {/* Avatar + name */}
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
                        style={{ background: bgColors[i % bgColors.length], color: avatarColors[i % avatarColors.length] }}
                      >
                        {initial}
                      </div>
                      <span className="text-[12px] text-[#555555] font-normal leading-[18px]">{comp.name}</span>
                    </div>
                    {/* URL */}
                    <a
                      href={comp.pageUrl ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[#1976d2] hover:underline leading-[20px] tracking-[-0.28px] truncate block"
                    >
                      {comp.pageUrl ? `${comp.name} | Best dentist for Invisalign` : comp.name}
                    </a>
                    {/* Excerpt */}
                    <p className="text-[12px] text-[#555555] leading-[20px] line-clamp-1">
                      {comp.llmSnippet}
                    </p>
                  </div>
                  {/* AeoScoreBox — same component as recommendation tab blog card */}
                  <AeoScoreBox score={compAeo} />
                </div>
              </div>
            )
          })}

          {/* Inline collapsible AEO comparison table */}
          {rec.aeoScore && (
            <div className="px-6 py-3">
              <div className="bg-[#fafafa] rounded-lg overflow-hidden">
              <button
                onClick={() => setAeoTableOpen(v => !v)}
                className="w-full flex items-center justify-between gap-2 px-5 py-4 text-left"
              >
                <div className="flex flex-[1_0_0] flex-col gap-[2px] min-w-0 h-9 justify-center">
                  <p className="text-[14px] text-[#212121] font-normal leading-[20px] tracking-[-0.28px]">
                    Compare AEO content score for Search AI generated blog vs competitor's blog
                  </p>
                  <p className="text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">
                    AEO content score predicts how well your page is likely to perform in answers generated by AI
                  </p>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`flex-shrink-0 transition-transform duration-200 ${aeoTableOpen ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {aeoTableOpen && (() => {
                const compNames = rec.competitors.slice(0, 3).map(c => c.name)
                const infoIcon = (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                )
                const chevronDown = (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )
                return (
                  <div className="bg-[#fafafa] overflow-x-auto pb-5">
                    <div className="flex px-5">
                      {/* Score column */}
                      <div className="flex flex-col w-1/5 flex-shrink-0">
                        {/* Header */}
                        <div className="bg-[#fafafa] border-b border-[#e9e9eb] h-[52px] flex items-center px-1 py-4">
                          <span className="text-[12px] text-[#212121] font-normal leading-[18px] tracking-[-0.24px] whitespace-nowrap">Score</span>
                        </div>
                        {/* AEO content score row */}
                        <div className="bg-[#fafafa] border-b border-[#eaeaea] h-[56px] flex items-center gap-[5px] px-1 py-4">
                          {chevronDown}
                          <span className="text-[14px] text-[#212121] font-normal leading-[20px] tracking-[-0.28px] whitespace-nowrap">AEO content score</span>
                        </div>
                        {/* Sub-score rows */}
                        {rec.aeoScore!.subScores.map((row, ri) => (
                          <div key={ri} className={`bg-[#fafafa] flex flex-col gap-[2px] h-[56px] justify-center px-6 py-4 ${ri < rec.aeoScore!.subScores.length - 1 ? 'border-b border-[#eaeaea]' : ''}`}>
                            <p className="text-[14px] text-[#212121] font-normal leading-[20px] tracking-[-0.28px]">{row.name}</p>
                            <p className="text-[12px] text-[#555] font-normal leading-[18px] tracking-[-0.24px]">Weights: {row.weight}</p>
                          </div>
                        ))}
                      </div>

                      {/* You column */}
                      <div className="flex flex-col w-1/5 flex-shrink-0">
                        <div className="bg-[#fafafa] border-b border-[#e9e9eb] h-[52px] flex items-center gap-1 p-4">
                          <span className="bg-[#0f7195] text-white text-[9px] font-normal leading-[14px] rounded-full px-[7px] py-[1.5px] whitespace-nowrap">You</span>
                          {infoIcon}
                        </div>
                        <div className="bg-[#fafafa] border-b border-[#eaeaea] h-[56px] flex items-center px-5 py-4">
                          <span className="text-[14px] text-black font-normal leading-[20px] tracking-[-0.28px] whitespace-nowrap">{rec.aeoScore!.you}%</span>
                        </div>
                        {rec.aeoScore!.subScores.map((row, ri) => (
                          <div key={ri} className={`bg-[#fafafa] h-[56px] flex items-center px-5 py-4 ${ri < rec.aeoScore!.subScores.length - 1 ? 'border-b border-[#eaeaea]' : ''}`}>
                            <span className="text-[14px] text-black font-normal leading-[20px] tracking-[-0.28px] whitespace-nowrap">{row.you}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Competitor columns */}
                      {compNames.map((name, ci) => (
                        <div key={ci} className="flex flex-col w-1/5 flex-shrink-0">
                          <div className="bg-[#fafafa] border-b border-[#e9e9eb] h-[52px] flex items-center gap-1 p-4">
                            <span className="text-[12px] text-[#555] font-normal leading-[18px] whitespace-nowrap">{name}</span>
                            {infoIcon}
                          </div>
                          <div className="bg-[#fafafa] border-b border-[#eaeaea] h-[56px] flex items-center px-5 py-4">
                            <span className="text-[14px] text-black font-normal leading-[20px] tracking-[-0.28px] whitespace-nowrap">{rec.aeoScore!.competitor}%</span>
                          </div>
                          {rec.aeoScore!.subScores.map((row, ri) => (
                            <div key={ri} className={`bg-[#fafafa] h-[56px] flex items-center px-5 py-4 ${ri < rec.aeoScore!.subScores.length - 1 ? 'border-b border-[#eaeaea]' : ''}`}>
                              <span className="text-[14px] text-black font-normal leading-[20px] tracking-[-0.28px] whitespace-nowrap">{row.competitor}%</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </div>
            </div>
          )}
        </div>

        {/* ═══ Prompt Execution — How did AI sites respond ═════════════════ */}
        <div className="bg-white border border-[#eaeaea] rounded-lg overflow-hidden">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-[16px] text-[#212121] leading-[24px] font-normal">
                How did AI sites respond to{' '}
                <span className="text-[#1976d2]">{themePrompt}</span>
              </p>
              <p className="text-[12px] text-[#888] leading-[18px] mt-0.5">
                To generate this recommendation, we ran these prompts across LLMs. Here are the responses each AI site returned.
              </p>
            </div>
          </div>

          {/* LLM sub-tabs */}
          <div className="border-b border-[#eaeaea] px-5 flex gap-5 overflow-x-auto">
            {LLM_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setLlmTab(tab)}
                className={`py-2.5 text-[13px] font-normal border-b-2 -mb-px whitespace-nowrap transition-colors ${
                  llmTab === tab
                    ? 'border-[#1976d2] text-[#212121]'
                    : 'border-transparent text-[#555] hover:text-[#212121]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table header */}
          <div className="flex items-center h-[52px] px-5 border-b border-[#eaeaea] text-[12px] text-[#555] font-normal">
            <div className="w-[122px] flex-shrink-0">Date</div>
            <div className="w-[122px] flex-shrink-0">Location</div>
            <div className="w-[95px] flex-shrink-0 flex items-center gap-1">
              <span>Mention</span>
              {/* info.svg */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path d="M7.99672 11.0331C8.11856 11.0331 8.22179 10.9915 8.3064 10.9085C8.39101 10.8254 8.43332 10.7225 8.43332 10.5998V7.63307C8.43332 7.51031 8.39211 7.40739 8.30968 7.32434C8.22726 7.24128 8.12513 7.19976 8.00328 7.19976C7.88144 7.19976 7.77821 7.24128 7.6936 7.32434C7.60899 7.40739 7.56668 7.51031 7.56668 7.63307V10.5998C7.56668 10.7225 7.60789 10.8254 7.69032 10.9085C7.77274 10.9915 7.87487 11.0331 7.99672 11.0331ZM7.99648 6.19207C8.12917 6.19207 8.24156 6.1472 8.33365 6.05746C8.42574 5.9677 8.47178 5.85648 8.47178 5.72381C8.47178 5.59113 8.42691 5.47874 8.33715 5.38664C8.24741 5.29455 8.13619 5.24851 8.00352 5.24851C7.87083 5.24851 7.75844 5.29338 7.66635 5.38314C7.57426 5.47289 7.52822 5.58411 7.52822 5.71679C7.52822 5.84947 7.57309 5.96185 7.66285 6.05394C7.75259 6.14603 7.86381 6.19207 7.99648 6.19207ZM8.00572 14.0664C7.17114 14.0664 6.38514 13.9085 5.64772 13.5927C4.91028 13.277 4.26483 12.8425 3.71135 12.2892C3.15786 11.736 2.72316 11.0911 2.40723 10.3545C2.09131 9.61783 1.93335 8.83076 1.93335 7.99324C1.93335 7.15571 2.09124 6.37101 2.40702 5.63914C2.72279 4.90726 3.15729 4.26458 3.71052 3.71111C4.26375 3.15762 4.90868 2.72291 5.6453 2.40699C6.38192 2.09107 7.16899 1.93311 8.00652 1.93311C8.84405 1.93311 9.62875 2.091 10.3606 2.40677C11.0925 2.72255 11.7352 3.15705 12.2886 3.71027C12.8421 4.26351 13.2768 4.90713 13.5928 5.64116C13.9087 6.37518 14.0667 7.15947 14.0667 7.99404C14.0667 8.82862 13.9088 9.61462 13.593 10.352C13.2772 11.0895 12.8427 11.7349 12.2895 12.2884C11.7363 12.8419 11.0926 13.2766 10.3586 13.5925C9.62458 13.9084 8.84028 14.0664 8.00572 14.0664ZM8 13.1998C9.44444 13.1998 10.6722 12.6942 11.6833 11.6831C12.6944 10.672 13.2 9.4442 13.2 7.99976C13.2 6.55531 12.6944 5.32753 11.6833 4.31642C10.6722 3.30531 9.44444 2.79976 8 2.79976C6.55556 2.79976 5.32778 3.30531 4.31667 4.31642C3.30556 5.32753 2.8 6.55531 2.8 7.99976C2.8 9.4442 3.30556 10.672 4.31667 11.6831C5.32778 12.6942 6.55556 13.1998 8 13.1998Z" fill="#303030"/>
              </svg>
            </div>
            <div className="w-[124px] flex-shrink-0">Position</div>
            <div className="w-[140px] flex-shrink-0">All mentions</div>
            <div className="w-[137px] flex-shrink-0">Citations</div>
            <div className="flex-1 min-w-0">Response</div>
          </div>

          {/* Table rows */}
          <div>
            {PROMPT_ROWS.map((row, i) => (
              <div key={i} className="group flex items-center h-[68px] px-5 border-b border-[#eaeaea] hover:bg-[#f2f4f7] transition-colors">
                <div className="w-[122px] flex-shrink-0 text-[13px] text-[#212121]">{row.date}</div>
                <div className="w-[122px] flex-shrink-0 text-[13px] text-[#212121]">{row.location}</div>
                <div className="w-[95px] flex-shrink-0">
                  {row.mentioned ? <CheckCircleIcon /> : <CancelIcon />}
                </div>
                <div className="w-[124px] flex-shrink-0">
                  {row.mentioned && row.position != null ? (
                    <div className="flex items-center gap-[12px]">
                      <span className="text-[14px] text-[#212121]">{row.position}</span>
                      <span className="text-[14px] text-[#377e2c]">+{row.positionDelta}</span>
                    </div>
                  ) : (
                    <span className="text-[14px] text-[#212121]">—</span>
                  )}
                </div>
                <div className="w-[140px] flex-shrink-0">
                  {row.mentionCount > 0 ? (
                    <SiteLogos count={row.mentionCount} startIdx={i} />
                  ) : (
                    <span className="text-[14px] text-[#ccc] tracking-[-0.28px]">No mention</span>
                  )}
                </div>
                <div className="w-[137px] flex-shrink-0">
                  <SiteLogos count={row.citationCount} startIdx={i + 2} />
                </div>
                <div className="flex-1 min-w-0 relative flex items-center overflow-hidden">
                  <span className="text-[13px] text-[#212121] truncate w-full">{row.responseExcerpt}</span>
                  <button className="hidden group-hover:flex absolute right-0 items-center h-8 px-3 border border-[#eaeaea] rounded text-[13px] text-[#212121] whitespace-nowrap bg-white hover:bg-[#f5f5f5] transition-colors" style={{ boxShadow: '-12px 0 10px white' }}>
                    View response
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom padding */}
        <div className="h-4 flex-shrink-0" />
      </div>
      )}

      {/* Location hover popover — portal */}
      {showLocHover && locationCount > 1 && createPortal(
        <div
          className="fixed z-[9999] bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-[#eaeaea] w-56 py-2"
          style={{ top: locPopoverPos.top, right: locPopoverPos.right }}
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
        onAccept={() => {
          acceptRec(rec.id, 'self')
          setShowBlogModal(false)
        }}
      />
    </div>
  )
}
