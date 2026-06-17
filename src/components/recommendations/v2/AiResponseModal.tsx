import { createPortal } from 'react-dom'
import type { AiResponseEntry } from '../../../data/aiResponses'

// ── Favicon helper ────────────────────────────────────────────────────────────
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
    const base = hostname.split('.')[0]
    return base.charAt(0).toUpperCase() + base.slice(1)
  } catch {
    return siteUrl
  }
}

// ── Chevron icon ──────────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#555]">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ── Static Dubbo map card ─────────────────────────────────────────────────────
function DubboMapCard() {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-[#e0e0e0] mb-5"
      style={{ height: 380, background: '#e8e0d8', userSelect: 'none' }}
    >
      <div className="absolute rounded-full" style={{ width: 120, height: 80, background: '#c8d9a8', top: 80, left: 10, transform: 'rotate(-10deg)', opacity: 0.7 }} />
      <div className="absolute rounded-full" style={{ width: 100, height: 60, background: '#c8d9a8', top: 120, left: 90, transform: 'rotate(15deg)', opacity: 0.6 }} />
      <div className="absolute rounded-full" style={{ width: 80, height: 50, background: '#c8d9a8', top: 260, right: 80, opacity: 0.5 }} />
      <div className="absolute" style={{ width: 3, height: '100%', background: '#d4c9b8', top: 0, left: '42%', transform: 'rotate(-5deg)', transformOrigin: 'top' }} />
      <div className="absolute" style={{ width: '100%', height: 3, background: '#d4c9b8', top: '45%', left: 0 }} />
      <div className="absolute" style={{ width: '60%', height: 2, background: '#d4c9b8', top: '65%', left: '20%', transform: 'rotate(-8deg)' }} />
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 105, left: 12 }}>Churchill<br/>Gardens</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 140, left: 105 }}>Delroy<br/>Gardens</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 175, left: '45%' }}>South<br/>Dubbo</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 190, right: 60 }}>Yarrawonga</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 220, right: 80 }}>Keswick</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 270, left: '48%' }}>Southlakes</span>
      <span className="absolute text-[9px] text-[#888] font-medium tracking-widest uppercase" style={{ top: 220, left: 20, transform: 'rotate(-55deg)', transformOrigin: 'left' }}>Peak Hill Rd</span>
      <div className="absolute flex flex-col gap-1" style={{ top: 60, left: '38%' }}>
        <PinBadge rating={4.8} />
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-[#333] font-normal">Ray</span>
          <PinBadge rating={4.0} />
          <span className="text-[11px] text-[#333] font-normal">Dubbo</span>
        </div>
        <PinBadge rating={3.7} />
        <span className="text-[11px] text-[#111] font-medium mt-0.5">Matt Hansen Real Estate</span>
      </div>
      <div className="absolute flex flex-col items-center gap-0.5" style={{ bottom: 60, left: '52%' }}>
        <PinBadge rating={5.0} />
        <span className="text-[11px] text-[#111] font-medium whitespace-nowrap">Redden Family Real Est…</span>
      </div>
      <button className="absolute top-3 left-3 w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center border border-[#e0e0e0]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>
      <button className="absolute bottom-3 left-3 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center border border-[#e0e0e0]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </button>
    </div>
  )
}

function PinBadge({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 bg-white rounded-full px-2 py-0.5 shadow-sm border border-[#e0e0e0] w-fit">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#1a1a1a" className="flex-shrink-0">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span className="text-[11px] text-[#111] font-medium leading-none">{rating.toFixed(1)}</span>
    </div>
  )
}

// ── ChatGPT bullet-list renderer ──────────────────────────────────────────────
function ChatGptResponse({ entry }: { entry: AiResponseEntry }) {
  const bullets = entry.chatGptBullets ?? []
  const outro = entry.chatGptOutro ?? []
  const outroList = outro.slice(1)

  return (
    <div className="flex flex-col gap-0">
      {entry.hasMap && <DubboMapCard />}
      {entry.chatGptIntro && (
        <p style={{ fontFamily: 'Inter, Roboto, sans-serif' }} className="text-[16px] text-[#212121] leading-[27px] font-normal mb-[34px]">
          {entry.chatGptIntro}
        </p>
      )}
      <ul className="flex flex-col gap-3 mb-5">
        {bullets.map((item, i) => (
          <li key={i} className="flex items-start gap-2 leading-[27px]" style={{ fontFamily: 'Inter, Roboto, sans-serif', fontSize: 16, color: '#212121' }}>
            <span className="flex-shrink-0 mt-[5px] text-[#1a1a1a]">•</span>
            <span>
              {item.agencyUrl ? (
                <a href={item.agencyUrl} target="_blank" rel="noreferrer" className="font-normal underline decoration-dotted text-[#212121] hover:text-[#555]">
                  {item.agencyName}
                </a>
              ) : (
                <span className="font-semibold underline decoration-dotted">{item.agencyName}</span>
              )}
              {' — '}
              {item.description}
              {item.chips && item.chips.length > 0 && (
                <span className="inline-flex gap-1 ml-2 flex-wrap">
                  {item.chips.map((chip, ci) => (
                    <span key={ci} className="inline-flex items-center px-[6px] text-[10px] text-[#757575] bg-[#f4f4f4] rounded-[20px] font-normal leading-[21px]">
                      {chip.label}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      {outro.length > 0 && (
        <div className="mt-2">
          <p style={{ fontFamily: 'Inter, Roboto, sans-serif' }} className="text-[16px] text-[#212121] leading-[27px] font-normal mb-2">{outro[0]}</p>
          <ul className="flex flex-col gap-1.5 ml-1">
            {outroList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 leading-[27px]" style={{ fontFamily: 'Inter, Roboto, sans-serif', fontSize: 16, color: '#212121' }}>
                <span className="flex-shrink-0 mt-[5px]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Generic markdown-like renderer (Gemini, Perplexity, etc.) ────────────────
function renderResponse(text: string, llm: string) {
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) { elements.push(<div key={key++} className="h-3" />); continue }

    const numberedMatch = line.match(/^\*?\*?(\d+)\.\s+\*?\*?(.+?)\*?\*?$/)
    if (numberedMatch && llm !== 'Gemini') {
      const [, num, content] = numberedMatch
      const continuation = lines[i + 1]?.trim() && !lines[i + 1]?.trim().match(/^\d+\./) ? lines[i + 1].trim() : null
      elements.push(
        <div key={key++} className="mb-3">
          <p style={{ fontFamily: 'Inter, Roboto, sans-serif' }} className="text-[16px] text-[#212121] leading-[27px] font-semibold">
            <span className="underline decoration-dotted">{num}. {renderInline(content)}</span>
          </p>
          {continuation && <p style={{ fontFamily: 'Inter, Roboto, sans-serif' }} className="text-[16px] text-[#555] leading-[27px] mt-1 font-normal">{renderInline(continuation)}</p>}
        </div>
      )
      if (continuation) i++
      continue
    }

    if (line.startsWith('•')) {
      elements.push(
        <div key={key++} className="flex items-start gap-2 mb-1.5">
          <span className="text-[#555] text-[16px] leading-[27px] flex-shrink-0 mt-[1px]">•</span>
          <p style={{ fontFamily: 'Inter, Roboto, sans-serif' }} className="text-[16px] text-[#555] leading-[27px] font-normal">{renderInline(line.slice(1).trim())}</p>
        </div>
      )
      continue
    }

    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(<p key={key++} style={{ fontFamily: 'Inter, Roboto, sans-serif' }} className="text-[20px] text-[#212121] leading-[27px] font-semibold mb-2">{renderInline(line.slice(2, -2))}</p>)
      continue
    }

    elements.push(<p key={key++} style={{ fontFamily: 'Inter, Roboto, sans-serif' }} className="text-[16px] text-[#212121] leading-[27px] font-normal mb-2">{renderInline(line)}</p>)
  }
  return <div>{elements}</div>
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/)
  if (parts.length === 1) return text
  return <>{parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-[#212121]">{part}</strong> : <span key={i}>{part}</span>)}</>
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  open: boolean
  onClose: () => void
  entry: AiResponseEntry | null
  themeTitle?: string
}

export default function AiResponseModal({ open, onClose, entry, themeTitle }: Props) {
  if (!open || !entry) return null

  const isChatGpt = entry.llm === 'ChatGPT'

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-[rgba(33,33,33,0.64)]" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative bg-white mx-auto flex flex-col"
        style={{
          borderRadius: 4,
          marginTop: 65,
          marginBottom: 40,
          width: '92%',
          maxWidth: 1200,
          boxShadow: '0px 4px 8px 0px rgba(33,33,33,0.18)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Sticky Header ──────────────────────────────────────────── */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-[#eaeaea]">
          <div className="flex flex-col gap-[4px]">
            <p className="text-[16px] text-[#1f2328] leading-[24px] font-normal m-0">
              {themeTitle ?? entry.prompt}
            </p>
            <div className="flex items-center gap-[4px]">
              {entry.date && (
                <span className="flex items-center text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-[2px]">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {entry.date}
                </span>
              )}
              {entry.location && (
                <span className="flex items-center text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mr-[2px]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {entry.location}
                </span>
              )}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f5f5f5] transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Content Card ───────────────────────────────────────────── */}
        <div className="mx-5 mb-5 mt-0 border border-[#eaeaea] rounded-[8px] p-[16px] overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="pt-[38px] pl-[50px] pr-[37px] pb-[24px] flex flex-col gap-[36px]">

            {/* LLM label + prompt bubble + response */}
            <div className="flex flex-col gap-[66px] items-end">
              <div className="w-full flex flex-col gap-[34px]">

                {/* LLM name as bold heading at top of card */}
                <p
                  className="text-[16px] text-[#212121] leading-[27px] font-semibold"
                  style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
                >
                  {entry.llm}
                </p>

                {/* Prompt bubble — right-aligned, gray */}
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
                    {entry.prompt}
                  </div>
                </div>

                {/* Response content */}
                <div>
                  {entry.htmlResponse ? (
                    <div
                      className="rec-exec-response-html"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: entry.htmlResponse }}
                    />
                  ) : isChatGpt && entry.chatGptBullets?.length ? (
                    <ChatGptResponse entry={entry} />
                  ) : (
                    renderResponse(entry.response, entry.llm)
                  )}
                </div>
              </div>
            </div>

            {/* ── Citations + competitor stats ────────────────────────── */}
            {(entry.citations.length > 0 || entry.competitorStats?.length) && (
              <div className="flex flex-col gap-[24px] px-[16px]">

                {/* Citation sources */}
                {entry.citations.length > 0 && (
                  <div className="flex flex-col px-[8px]">
                    <div className="flex flex-col gap-[14px]">
                      <div className="flex items-center pt-[6px] px-[4px]">
                        <p className="text-[14px] text-[#212121] leading-[20px] font-normal tracking-[-0.28px]">
                          Citation sources
                        </p>
                      </div>
                      <div className="flex flex-col gap-[14px]">
                        {entry.citations.map((cite, i) => {
                          const favicon = faviconUrl(cite.url)
                          const domain = domainLabel(cite.url)
                          const isLast = i === entry.citations.length - 1
                          return (
                            <div
                              key={i}
                              className={`flex flex-col gap-[4px] pb-[12px]${isLast ? '' : ' border-b border-[#eaeaea]'}`}
                            >
                              {/* site icon + name */}
                              <div className="flex gap-[4px] items-center">
                                {favicon && (
                                  <div className="w-5 h-5 rounded flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#f0f0f0]">
                                    <img src={favicon} alt="site icon" loading="lazy" width={20} height={20} style={{ objectFit: 'contain', display: 'block' }} />
                                  </div>
                                )}
                                <span className="text-[12px] text-[#212121] leading-[18px] font-normal">{cite.name || domain}</span>
                              </div>
                              {/* title link */}
                              <a
                                href={cite.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[12px] text-[#1976d2] leading-[18px] font-normal tracking-[-0.24px]"
                                style={{ width: 465 }}
                              >
                                {cite.title}
                              </a>
                              {/* description */}
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
                )}

                {/* Competitor citation stats */}
                {entry.competitorStats && entry.competitorStats.length > 0 && (
                  <div className="flex flex-col gap-[24px]">
                    {entry.competitorStats.map((comp, i) => (
                      <div key={i} className="flex items-start justify-between">
                        <div className="flex flex-col items-start" style={{ width: 183 }}>
                          <div className="flex items-center py-[4px]">
                            <p className="text-[14px] text-[#212121] leading-[20px] font-normal tracking-[-0.28px] whitespace-nowrap">
                              {comp.name}
                            </p>
                          </div>
                          <div className="flex gap-[4px] items-center">
                            <p className="text-[12px] text-[#555] leading-[18px] font-normal tracking-[-0.24px] whitespace-nowrap">
                              {comp.citations} citations
                            </p>
                            <ChevronDown />
                          </div>
                        </div>
                        <div className="flex items-center py-[4px]">
                          <p className="text-[0px] leading-none">
                            <span className="text-[14px] text-[#212121] leading-[20px] font-normal tracking-[-0.28px]">{comp.percentage}</span>
                            <span className="text-[12px] text-[#555] leading-[18px] tracking-[-0.24px]">%</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Top cited sources label */}
                <p className="text-[14px] text-[#212121] leading-[20px] font-normal tracking-[-0.28px]">
                  Top cited sources
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        .rec-exec-status-closed { color: #d32f2f; }
        .rec-exec-response-html p { margin-bottom: 12px; font-size: 16px; line-height: 27px; color: #212121; font-family: Inter, Roboto, sans-serif; }
        .rec-exec-response-html p:last-child { margin-bottom: 0; }
        .rec-exec-response-html a { color: #1976d2; text-decoration: underline; }
        .rec-exec-response-html a:hover { opacity: 0.8; }
        .rec-exec-response-html strong { font-weight: 600; }
        .rec-exec-response-html em { font-style: italic; color: #555; }
      `}</style>
    </div>,
    document.body
  )
}
