import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Primary Rail — matches primary-rail.html GitHub spec:
 *  width: 40px  bg: #e5e9f0  border-right: 1px #eaeaea
 *  rail-icon: 28×28, border-radius 4px
 *  logo area: 52px height (matches top-nav row in Header)
 *  rail-divider: 20px wide, 1px, #eaeaea
 */

const NAV_ICONS = [
  { src: 'Navigation buttons-2.svg', label: 'Home' },
  { src: 'Navigation buttons.svg',   label: 'Inbox' },
  { src: 'Navigation buttons-1.svg', label: 'Listings' },
  { src: 'Component 73.svg',         label: 'Search AI', path: '/' },
  { src: 'Component 63.svg',         label: 'Reviews' },
  { src: 'Component 64.svg',         label: 'Referrals' },
  { src: 'Component 65.svg',         label: 'Payments' },
  { src: 'Component 66.svg',         label: 'Appointments' },
  { src: 'Component 67.svg',         label: 'Social' },
  { src: 'Component 68.svg',         label: 'Surveys' },
  { src: 'Component 69.svg',         label: 'Ticketing' },
  { src: 'Component 70.svg',         label: 'Contacts' },
  { src: 'Component 71.svg',         label: 'Campaigns' },
  { src: 'Component 72.svg',         label: 'Reports' },
  { src: 'Component 74.svg',         label: 'Competitors' },
]

const BASE = import.meta.env.BASE_URL

export default function L1() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSearchAI = location.pathname === '/' || location.pathname.startsWith('/recommendations')

  return (
    <div
      style={{ width: 40, minHeight: '100vh', background: '#e5e9f0', borderRight: '1px solid #eaeaea' }}
      className="flex flex-col items-center flex-shrink-0 z-10"
    >
      {/* Logo — 52px height matches top-nav row */}
      <div
        style={{ height: 52, borderBottom: '1px solid #eaeaea' }}
        className="w-full flex items-center justify-center flex-shrink-0"
      >
        <img src={`${BASE}assets/agent icons/Birdeye.svg`} alt="Birdeye" className="w-7 h-7 block" />
      </div>

      {/* Nav icons */}
      <div className="flex flex-col items-center gap-1 py-2 flex-1 overflow-y-auto scrollbar-hide w-full px-1.5">
        {NAV_ICONS.map(item => {
          const isActive = item.label === 'Search AI' && isSearchAI
          return (
            <button
              key={item.label}
              title={item.label}
              onClick={() => item.path && navigate(item.path)}
              style={{ width: 28, height: 28, borderRadius: 4 }}
              className={`flex items-center justify-center overflow-hidden flex-shrink-0 transition-colors ${
                item.path ? 'cursor-pointer hover:bg-black/5' : 'cursor-default'
              } ${isActive ? 'bg-black/5' : ''}`}
            >
              <img
                src={`${BASE}assets/${item.src}`}
                alt={item.label}
                className="w-7 h-7 block flex-shrink-0"
              />
            </button>
          )
        })}

        {/* Rail divider */}
        <div style={{ width: 20, height: 1, background: '#eaeaea', margin: '4px auto', flexShrink: 0 }} />

        {/* Settings icon */}
        <button
          title="Settings"
          style={{ width: 28, height: 28, borderRadius: 4 }}
          className="flex items-center justify-center overflow-hidden flex-shrink-0 cursor-default"
        >
          <img src={`${BASE}assets/Component 75.svg`} alt="Settings" className="w-7 h-7 block flex-shrink-0" />
        </button>
      </div>
    </div>
  )
}
