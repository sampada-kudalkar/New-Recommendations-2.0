import { createPortal } from 'react-dom'
import type { AiResponseEntry } from '../../../data/aiResponses'

const AVATAR_COLORS = ['#f59e0b', '#6b7280', '#8b5cf6', '#10b981', '#ef4444', '#3b82f6']

// ── Static Dubbo map card ─────────────────────────────────────────────────────
function DubboMapCard() {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-[#e0e0e0] mb-5"
      style={{ height: 380, background: '#e8e0d8', userSelect: 'none' }}
    >
      {/* Park blobs */}
      <div className="absolute rounded-full" style={{ width: 120, height: 80, background: '#c8d9a8', top: 80, left: 10, transform: 'rotate(-10deg)', opacity: 0.7 }} />
      <div className="absolute rounded-full" style={{ width: 100, height: 60, background: '#c8d9a8', top: 120, left: 90, transform: 'rotate(15deg)', opacity: 0.6 }} />
      <div className="absolute rounded-full" style={{ width: 80, height: 50, background: '#c8d9a8', top: 260, right: 80, opacity: 0.5 }} />

      {/* Road lines */}
      <div className="absolute" style={{ width: 3, height: '100%', background: '#d4c9b8', top: 0, left: '42%', transform: 'rotate(-5deg)', transformOrigin: 'top' }} />
      <div className="absolute" style={{ width: '100%', height: 3, background: '#d4c9b8', top: '45%', left: 0 }} />
      <div className="absolute" style={{ width: '60%', height: 2, background: '#d4c9b8', top: '65%', left: '20%', transform: 'rotate(-8deg)' }} />

      {/* Suburb labels */}
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 105, left: 12 }}>Churchill<br/>Gardens</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 140, left: 105 }}>Delroy<br/>Gardens</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 175, left: '45%' }}>South<br/>Dubbo</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 190, right: 60 }}>Yarrawonga</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 220, right: 80 }}>Keswick</span>
      <span className="absolute text-[10px] text-[#666] font-medium tracking-wide uppercase" style={{ top: 270, left: '48%' }}>Southlakes</span>

      {/* Road label */}
      <span className="absolute text-[9px] text-[#888] font-medium tracking-widest uppercase" style={{ top: 220, left: 20, transform: 'rotate(-55deg)', transformOrigin: 'left' }}>Peak Hill Rd</span>

      {/* Pin cluster — top center (Ray White + Matt Hansen area) */}
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

      {/* Pin — bottom center (Redden Family) */}
      <div className="absolute flex flex-col items-center gap-0.5" style={{ bottom: 60, left: '52%' }}>
        <PinBadge rating={5.0} />
        <span className="text-[11px] text-[#111] font-medium whitespace-nowrap">Redden Family Real Est…</span>
      </div>

      {/* Expand button — top left */}
      <button className="absolute top-3 left-3 w-8 h-8 bg-white rounded shadow-sm flex items-center justify-center border border-[#e0e0e0]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      </button>

      {/* Info button — bottom left */}
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

// ── ChatGPT response renderer ─────────────────────────────────────────────────
function ChatGptResponse({ entry }: { entry: AiResponseEntry }) {
  const bullets = entry.chatGptBullets ?? []
  const outro = entry.chatGptOutro ?? []
  const outroList = outro.slice(1) // first item is the "If you want..." header

  return (
    <div className="flex flex-col gap-0">
      {/* Prompt bubble */}
      <div className="flex justify-end mb-4">
        <div
          className="max-w-[70%] px-4 py-3 text-[15px] text-[#1a1a1a] leading-[24px] font-normal"
          style={{ background: '#f4f4f4', borderRadius: '18px 18px 4px 18px' }}
        >
          {entry.prompt}
        </div>
      </div>

      {/* Map */}
      {entry.hasMap && <DubboMapCard />}

      {/* Intro paragraph */}
      {entry.chatGptIntro && (
        <p className="text-[15px] text-[#1a1a1a] leading-[26px] font-normal mb-4">
          {entry.chatGptIntro}
        </p>
      )}

      {/* Bullet list */}
      <ul className="flex flex-col gap-3 mb-5">
        {bullets.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-[15px] text-[#1a1a1a] leading-[26px]">
            <span className="flex-shrink-0 mt-[5px] text-[#1a1a1a]">•</span>
            <span>
              {item.agencyUrl ? (
                <a href={item.agencyUrl} target="_blank" rel="noreferrer" className="font-normal underline decoration-[#1a1a1a] text-[#1a1a1a] hover:text-[#555]">
                  {item.agencyName}
                </a>
              ) : (
                <strong className="font-medium">{item.agencyName}</strong>
              )}
              {' — '}
              {item.description}
              {item.chips && item.chips.length > 0 && (
                <span className="inline-flex gap-1 ml-2 flex-wrap">
                  {item.chips.map((chip, ci) => (
                    <span
                      key={ci}
                      className="inline-flex items-center px-2 py-0.5 text-[12px] text-[#555] bg-[#f0f0f0] rounded border border-[#e0e0e0] font-normal leading-[18px]"
                    >
                      {chip.label}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {/* Outro */}
      {outro.length > 0 && (
        <div className="mt-2">
          <p className="text-[15px] text-[#1a1a1a] leading-[26px] font-normal mb-2">{outro[0]}</p>
          <ul className="flex flex-col gap-1.5 ml-1">
            {outroList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[15px] text-[#1a1a1a] leading-[26px]">
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
          <p className="text-[14px] text-[#212121] leading-[22px] font-normal"><strong className="font-medium">{num}. {renderInline(content)}</strong></p>
          {continuation && <p className="text-[14px] text-[#555] leading-[22px] mt-1 font-normal">{renderInline(continuation)}</p>}
        </div>
      )
      if (continuation) i++
      continue
    }

    if (line.startsWith('•')) {
      elements.push(
        <div key={key++} className="flex items-start gap-2 mb-1.5">
          <span className="text-[#555] text-[14px] leading-[22px] flex-shrink-0 mt-[1px]">•</span>
          <p className="text-[14px] text-[#555] leading-[22px] font-normal">{renderInline(line.slice(1).trim())}</p>
        </div>
      )
      continue
    }

    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      elements.push(<p key={key++} className="text-[15px] text-[#212121] leading-[24px] font-medium mb-2">{renderInline(line.slice(2, -2))}</p>)
      continue
    }

    elements.push(<p key={key++} className="text-[14px] text-[#212121] leading-[22px] font-normal mb-2">{renderInline(line)}</p>)
  }
  return <div>{elements}</div>
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/)
  if (parts.length === 1) return text
  return <>{parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-medium text-[#212121]">{part}</strong> : <span key={i}>{part}</span>)}</>
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  open: boolean
  onClose: () => void
  entry: AiResponseEntry | null
}

export default function AiResponseModal({ open, onClose, entry }: Props) {
  if (!open || !entry) return null

  const isChatGpt = entry.llm === 'ChatGPT' && !!entry.chatGptBullets?.length
  const metaSubtitle = `Prompt executed on ${entry.date} on ${entry.llm} for ${entry.location}`

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-[rgba(33,33,33,0.64)]" onClick={onClose} />

      <div
        className="relative bg-white rounded shadow-[0px_4px_8px_0px_rgba(33,33,33,0.18)] w-[1200px] max-w-[calc(100vw-48px)] flex flex-col mt-12 mb-12"
        style={{ maxHeight: 'calc(100vh - 96px)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Sticky header (Figma 957:21572) ─────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eaeaea] flex-shrink-0 bg-white rounded-t-lg sticky top-0 z-10">
          <div className="flex flex-col items-start">
            <p className="text-[16px] text-[#1f2328] leading-[24px] font-normal">
              {entry.prompt}
            </p>
            <p className="text-[12px] text-[#555] leading-[18px] tracking-[-0.24px] mt-0.5">
              {metaSubtitle}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f5f5f5] transition-colors flex-shrink-0 ml-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ───────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {/* Response content */}
          <div className="mb-8">
            {isChatGpt
              ? <ChatGptResponse entry={entry} />
              : renderResponse(entry.response, entry.llm)
            }
          </div>

          {/* Citations */}
          {entry.citations.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-[#eaeaea]" />
                <span className="text-[13px] text-[#888] font-normal whitespace-nowrap px-2">
                  Citations ({entry.citations.length})
                </span>
                <div className="h-px flex-1 bg-[#eaeaea]" />
              </div>
              <div className="flex flex-col gap-3">
                {entry.citations.map((cite, i) => {
                  const initial = cite.name.charAt(0).toUpperCase()
                  const avatarBg = AVATAR_COLORS[i % AVATAR_COLORS.length]
                  return (
                    <div key={i} className="bg-[#fafafa] rounded-[8px] p-4 flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-normal flex-shrink-0" style={{ background: avatarBg }}>{initial}</div>
                        <span className="text-[12px] text-[#212121] leading-[18px] font-normal">{cite.name}</span>
                      </div>
                      <a href={cite.url} target="_blank" rel="noreferrer" className="text-[14px] text-[#1976d2] leading-[20px] tracking-[-0.28px] font-normal hover:underline line-clamp-1">{cite.title}</a>
                      <p className="text-[14px] text-[#555] leading-[20px] font-normal overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{cite.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className="h-4" />
        </div>
      </div>
    </div>,
    document.body
  )
}
