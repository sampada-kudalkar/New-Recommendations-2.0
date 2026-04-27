import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Secondary Rail (L2) — matches l2-nav.html GitHub spec:
 *  width: 222px  bg: #fafafa  border-right: 1px #eaeaea
 *  title bar: 52px height (aligns with top-nav row)
 *  .nav-item: h-7 (28px), px-2 py-1, text-[14px] font-normal
 *  .sub-item:  h-7 (28px), px-2 py-1, text-[14px] font-light (300)
 *  active/hover bg: #e5e9f0
 *  single-open accordion — opening one closes all others
 */

const BASE = import.meta.env.BASE_URL

const sections = [
  {
    id: 'overview',
    label: 'Overview',
    type: 'standalone' as const,
    path: '/overview',
  },
  {
    id: 'actions',
    label: 'Actions',
    type: 'accordion' as const,
    defaultOpen: true,
    items: [
      { label: 'Recommendations', path: '/recommendations' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    type: 'accordion' as const,
    items: [
      { label: 'Overview',    path: '/reports/overview' },
      { label: 'Citations',   path: '/reports/citations' },
      { label: 'Visibility',  path: '/reports/visibility' },
      { label: 'Rankings',    path: '/reports/rankings' },
      { label: 'Accuracy',    path: '/reports/accuracy' },
      { label: 'Sentiment',   path: '/reports/sentiment' },
      { label: 'Prompts',     path: '/reports/prompts' },
    ],
  },
  {
    id: 'agents',
    label: 'Agents',
    type: 'accordion' as const,
    items: [
      { label: 'FAQ generation agent',   path: '/agents/faq' },
      { label: 'Recommendation agent',   path: '/agents/recommendations' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    type: 'accordion' as const,
    items: [
      { label: 'Prompts', path: '/settings/prompts' },
      { label: 'Report',  path: '/settings/report' },
    ],
  },
]

/** Chevron icon — down when closed, up when open */
function Chevron({ open }: { open: boolean }) {
  return open
    ? <img src={`${BASE}assets/chevron_up.svg`}   alt="" className="w-5 h-5 flex-shrink-0" />
    : <img src={`${BASE}assets/chevron_down.svg`} alt="" className="w-5 h-5 flex-shrink-0" />
}

export default function L2() {
  const navigate = useNavigate()
  const location = useLocation()

  // Single-open: default open is 'actions'
  const [openId, setOpenId] = useState<string | null>('actions')

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id))

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <div
      style={{ width: 222, minHeight: '100vh', background: '#fafafa', borderRight: '1px solid #eaeaea' }}
      className="flex flex-col flex-shrink-0"
    >
      {/* Title — 52px, aligns with top-nav row */}
      <div
        style={{ height: 52, borderBottom: '1px solid #eaeaea' }}
        className="flex items-center px-6 flex-shrink-0"
      >
        <span style={{ fontSize: 18, lineHeight: '26px', letterSpacing: '-0.36px', color: '#212121', fontWeight: 400 }}>
          Search AI
        </span>
      </div>

      {/* Nav list */}
      <nav className="flex flex-col gap-1 px-4 py-2 flex-1 overflow-y-auto">
        {sections.map(section => {
          if (section.type === 'standalone') {
            const active = isActive(section.path)
            return (
              <button
                key={section.id}
                onClick={() => navigate(section.path)}
                style={{ height: 28, padding: '4px 8px', borderRadius: 4, fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', fontWeight: 400 }}
                className={`flex items-center w-full text-left transition-colors ${
                  active ? 'bg-[#e5e9f0] text-[#212121]' : 'text-[#212121] hover:bg-[#e5e9f0]'
                }`}
              >
                {section.label}
              </button>
            )
          }

          const isOpen = openId === section.id
          return (
            <div key={section.id} className="flex flex-col gap-1">
              {/* Accordion header — .nav-item */}
              <button
                onClick={() => toggle(section.id)}
                style={{ height: 28, padding: '4px 8px', borderRadius: 4, fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', fontWeight: 400 }}
                className="flex items-center gap-2 w-full text-left text-[#212121] hover:bg-[#e5e9f0] transition-colors"
              >
                <span className="flex-1">{section.label}</span>
                <Chevron open={isOpen} />
              </button>

              {/* Accordion body — .accordion-body */}
              {isOpen && section.items && (
                <div className="flex flex-col gap-1">
                  {section.items.map(item => {
                    const active = isActive(item.path)
                    return (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{ height: 28, padding: '4px 8px', borderRadius: 4, fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px', fontWeight: 300 }}
                        className={`flex items-center w-full text-left transition-colors ${
                          active ? 'bg-[#e5e9f0] text-[#212121]' : 'text-[#212121] hover:bg-[#e5e9f0]'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
