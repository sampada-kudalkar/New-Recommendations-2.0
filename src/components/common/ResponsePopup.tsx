import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface ResponsePopupProps {
  open: boolean
  onClose: () => void
  /** Main title shown in the sticky header */
  title: string
  /** Optional date string, e.g. "Jan 10, 2026" */
  date?: string
  /** Optional location string, e.g. "Kirwan, QLD" */
  location?: string
  /** AI platform name shown as bold heading inside the card, e.g. "ChatGPT" */
  llmName: string
  /** The user prompt shown as a right-aligned bubble */
  prompt: string
  /** The response body — pass any rendered content */
  children: React.ReactNode
  /** Optional callback for an "Accept" action button in the header */
  onAccept?: () => void
  /** Optional citation sources rendered below the response */
  citations?: Array<{
    url: string
    name?: string
    title?: string
    description?: string
  }>
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function faviconUrl(siteUrl: string): string {
  try {
    const u = new URL(siteUrl)
    return `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${u.protocol}//${u.hostname}&size=64`
  } catch {
    return ''
  }
}

function domainLabel(siteUrl: string): string {
  try {
    const hostname = new URL(siteUrl).hostname.replace(/^www\./, '')
    return hostname.split('.')[0].replace(/^\w/, c => c.toUpperCase())
  } catch {
    return siteUrl
  }
}

// ── ResponsePopup ─────────────────────────────────────────────────────────────

export default function ResponsePopup({
  open,
  onClose,
  title,
  date,
  location,
  llmName,
  prompt,
  children,
  onAccept,
  citations,
}: ResponsePopupProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[rgba(33,33,33,0.64)]"
        onClick={onClose}
      />

      {/* Modal shell */}
      <div
        className="relative bg-white mx-auto flex flex-col"
        style={{
          borderRadius: 8,
          marginTop: 65,
          marginBottom: 40,
          width: '92%',
          maxWidth: 1200,
          boxShadow: '0px 4px 8px 0px rgba(33,33,33,0.18)',
          overflow: 'clip',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Sticky header ──────────────────────────────────────────────── */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4">
          <div className="flex flex-col gap-[4px]">
            <p className="text-[16px] text-[#1f2328] leading-[24px] font-normal m-0">
              {title}
            </p>
            <div className="flex items-center gap-[4px]">
              {date && (
                <span className="flex items-center text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-[2px]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {date}
                </span>
              )}
              {location && (
                <span className="flex items-center text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-[2px]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {location}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onAccept && (
              <button
                onClick={onAccept}
                className="px-3 py-1.5 text-[13px] font-medium text-[#212121] border border-[#d0d7de] rounded-[4px] hover:bg-[#f5f5f5] transition-colors leading-[20px]"
              >
                Accept
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f5f5f5] transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Content card ───────────────────────────────────────────────── */}
        <div
          className="mx-5 mb-5 mt-0 border border-[#eaeaea] rounded-[8px] overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          <div className="pt-[38px] pl-[50px] pr-[37px] pb-[24px] flex flex-col gap-[36px] relative">

            {/* LLM name — absolute top-left, outside the centred zone */}
            <p
              className="absolute top-[38px] left-[50px] text-[16px] text-[#212121] leading-[27px] font-semibold"
              style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
            >
              {llmName}
            </p>

            {/* 70%-wide centred container: prompt bubble + response */}
            <div className="w-[70%] mx-auto flex flex-col gap-[66px]">

              {/* Prompt bubble — right-aligned within the 70% zone */}
              <div className="flex justify-end">
                <div
                  className="text-[16px] text-[#212121] leading-[27px] font-normal px-4 py-3"
                  style={{
                    fontFamily: 'Inter, Roboto, sans-serif',
                    background: '#f4f4f4',
                    borderRadius: 24,
                    maxWidth: 558,
                  }}
                >
                  {prompt}
                </div>
              </div>

              {/* Response content */}
              <div className="flex flex-col gap-[34px]">
                {children}
              </div>
            </div>

            {/* ── Citations ──────────────────────────────────────────────── */}
            {citations && citations.length > 0 && (
              <div className="flex flex-col gap-[24px] px-[16px]">
                <div className="flex flex-col px-[8px]">
                  <div className="flex flex-col gap-[14px]">
                    <p className="text-[14px] text-[#212121] leading-[20px] font-normal tracking-[-0.28px] pt-[6px] px-[4px]">
                      Citation sources
                    </p>
                    <div className="flex flex-col gap-[14px]">
                      {citations.map((cite, i) => {
                        const favicon = faviconUrl(cite.url)
                        const domain = domainLabel(cite.url)
                        const isLast = i === citations.length - 1
                        return (
                          <div
                            key={i}
                            className={`flex flex-col gap-[4px] pb-[12px]${isLast ? '' : ' border-b border-[#eaeaea]'}`}
                          >
                            <div className="flex gap-[4px] items-center">
                              {favicon && (
                                <div className="w-5 h-5 rounded flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#f0f0f0]">
                                  <img src={favicon} alt="site icon" loading="lazy" width={20} height={20} style={{ objectFit: 'contain', display: 'block' }} />
                                </div>
                              )}
                              <span className="text-[12px] text-[#212121] leading-[18px] font-normal">
                                {cite.name || domain}
                              </span>
                            </div>
                            {cite.title && (
                              <a
                                href={cite.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[12px] text-[#1976d2] leading-[18px] font-normal tracking-[-0.24px]"
                                style={{ width: 465 }}
                              >
                                {cite.title}
                              </a>
                            )}
                            {cite.description && (
                              <p
                                className="text-[12px] text-[#555] leading-[18px] font-normal tracking-[-0.24px] overflow-hidden"
                                style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                              >
                                {cite.description}
                              </p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
