interface HeaderProps {
  title: string
  showInfoIcon?: boolean
  headerRight?: React.ReactNode
  onBack?: () => void
}

/**
 * Tokens mirror primary-rail.html / header.html GitHub reference:
 *  top-nav    → h-[52px]   (28×28 icon buttons, gap-1, px-6, justify-end)
 *  page-header→ h-16       (64px, px-6, gap-2, 36×36 icon buttons)
 */

const TOP_NAV_ICONS = [
  { src: `${import.meta.env.BASE_URL}assets/topnav-63.svg`, alt: 'Add',      label: 'add_circle' },
  { src: `${import.meta.env.BASE_URL}assets/topnav-64.svg`, alt: 'Help',     label: 'help' },
  { src: `${import.meta.env.BASE_URL}assets/topnav-65.svg`, alt: 'Settings', label: 'settings' },
  { src: `${import.meta.env.BASE_URL}assets/topnav-66.svg`, alt: 'Profile',  label: 'avatar' },
  { src: `${import.meta.env.BASE_URL}assets/topnav-67.svg`, alt: 'Menu',     label: 'menu' },
]

export default function Header({ title, showInfoIcon = false, headerRight, onBack }: HeaderProps) {
  return (
    <div className="flex flex-col flex-shrink-0">
      {/* Top Nav — 52px (GitHub: .top-nav height:52px) */}
      <div className="h-[52px] bg-white border-b border-[#eaeaea] flex items-center justify-end px-6 gap-1 overflow-clip">
        {TOP_NAV_ICONS.map(icon => (
          <button
            key={icon.label}
            title={icon.alt}
            className="flex items-center justify-center w-7 h-7 rounded-sm hover:bg-[#f5f5f5] transition-colors flex-shrink-0"
          >
            <img src={icon.src} alt={icon.alt} className="w-7 h-7 block" />
          </button>
        ))}
      </div>

      {/* Page Header — 64px (GitHub: .page-header height:64px, padding:8px 24px) */}
      <div className="h-16 bg-white flex items-center px-6 gap-2">
        {/* Left: optional back arrow + title + optional info icon */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              title="Back"
              className="flex items-center justify-center w-7 h-7 rounded-sm hover:bg-[#f5f5f5] transition-colors flex-shrink-0 -ml-0.5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
              </svg>
            </button>
          )}
          <span className="text-[18px] font-normal text-[#212121] tracking-[-0.36px] leading-[26px] whitespace-nowrap">
            {title}
          </span>
          {showInfoIcon && (
            <img
              src={`${import.meta.env.BASE_URL}assets/info.svg`}
              alt="info"
              className="w-5 h-5 flex-shrink-0 opacity-60"
            />
          )}
        </div>

        {/* Right: injected controls (GitHub: .icon-btn 36×36, border #e5e9f0, radius 4px) */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {headerRight}
        </div>
      </div>
    </div>
  )
}
