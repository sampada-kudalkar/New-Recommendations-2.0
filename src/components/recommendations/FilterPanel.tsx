import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useAppStore } from '../../store/useAppStore'
import type { RecCategory } from '../../types'
import { nsaThemesConfig } from '../../data/nsaThemesConfig'
import { AUSTRALIAN_LOCATIONS } from '../../data/locationsData'

// ── Filter data ───────────────────────────────────────────────────────────────

const ALL_TYPES: RecCategory[] = [
  'Local SEO',
  'Content',
  'Conversion',
  'Website content',
  'Website improvement',
  'Reviews',
  'Social',
  'FAQ',
  'Trust & Reputation',
  'Technical SEO',
]

const IMPACT_OPTIONS = ['Quick win', 'Medium', 'Bigger lift']

const THEME_OPTIONS = Object.entries(nsaThemesConfig).map(([id, t]) => ({
  id,
  label: t.label,
}))

const LOCATION_OPTIONS = AUSTRALIAN_LOCATIONS.map(l => ({ id: l, label: l }))

// ── Custom checkbox — 24×24 container, 16×16 SVG, matches Figma Checkbox spec ─

function FilterCheckbox({ checked }: { checked: boolean }) {
  return (
    <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
      {checked ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect width="16" height="16" rx="2" fill="#1976d2" />
          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="white" stroke="#bdbdbd" />
        </svg>
      )}
    </div>
  )
}

// ── Multi-select tile row ─────────────────────────────────────────────────────
// pl-0 pr-8 py-8 gap-8 — exact match to Figma "Multi select tile"

function OptionRow({
  label,
  checked,
  onClick,
}: {
  label: string
  checked: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: 'pointer',
        borderRadius: 4,
        width: '100%',
      }}
      className="hover:bg-[#f5f5f5] transition-colors"
    >
      <FilterCheckbox checked={checked} />
      <span
        style={{
          flex: '1 0 0',
          minWidth: 0,
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '-0.28px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 400,
          color: '#212121',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Dropdown portal ───────────────────────────────────────────────────────────

interface DropdownPortalProps {
  anchorRect: DOMRect
  onClose: () => void
  options: { id: string; label: string }[]
  selected: string[]           // empty = "all selected" / no filter
  allOptions: { id: string; label: string }[]
  onChange: (next: string[]) => void
  showSearch: boolean
}

function DropdownPortal({
  anchorRect,
  onClose,
  options,
  selected,
  allOptions,
  onChange,
  showSearch,
}: DropdownPortalProps) {
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Defer so the open-click itself doesn't immediately close
    const id = setTimeout(() => document.addEventListener('mousedown', handle), 0)
    return () => {
      clearTimeout(id)
      document.removeEventListener('mousedown', handle)
    }
  }, [onClose])

  // Compute visible options (filtered by search query when applicable)
  const visibleOptions =
    showSearch && query.trim()
      ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
      : options

  // "All selected" semantics: empty selected array = no filter = all shown = all checked
  const allChecked = selected.length === 0

  function isChecked(id: string) {
    return allChecked || selected.includes(id)
  }

  function handleSelectAll() {
    // If already all: do nothing (stay in all-selected mode)
    // If some filtered: clear back to all
    onChange([])
  }

  function handleToggle(id: string) {
    if (allChecked) {
      // Currently "all" mode — unchecking this one means include all EXCEPT this
      onChange(allOptions.map(o => o.id).filter(oid => oid !== id))
    } else {
      const next = selected.includes(id)
        ? selected.filter(s => s !== id)
        : [...selected, id]
      // If every option is now explicitly checked, revert to "all" mode
      onChange(next.length === allOptions.length ? [] : next)
    }
  }

  // Position dropdown directly below the trigger
  const top = anchorRect.bottom + 4
  const left = anchorRect.left

  return createPortal(
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top,
        left,
        width: anchorRect.width,
        zIndex: 9999,
        background: 'white',
        borderRadius: 4,
        boxShadow: '0px 4px 8px 0px rgba(33,33,33,0.18)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Options area — pt-12, px-16, gap-4 between rows */}
      <div style={{ paddingTop: 12, paddingLeft: 16, paddingRight: 16 }}>

        {/* Search field — only for Location */}
        {showSearch && (
          <div style={{ marginBottom: 4 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 36,
                border: '1px solid #e5e9f0',
                borderRadius: 4,
                paddingLeft: 12,
                paddingRight: 8,
                background: 'white',
              }}
            >
              {/* Search icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8f8f8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  lineHeight: '20px',
                  letterSpacing: '-0.28px',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#212121',
                  background: 'transparent',
                }}
              />
            </div>
          </div>
        )}

        {/* Scrollable options list */}
        <div style={{ maxHeight: 220, overflowY: 'auto' }}>

          {/* "Select all" row — always first, hidden during search query */}
          {(!showSearch || !query.trim()) && (
            <OptionRow
              label="Select all"
              checked={allChecked}
              onClick={handleSelectAll}
            />
          )}

          {visibleOptions.map(opt => (
            <OptionRow
              key={opt.id}
              label={opt.label}
              checked={isChecked(opt.id)}
              onClick={() => handleToggle(opt.id)}
            />
          ))}

          {visibleOptions.length === 0 && (
            <p
              style={{
                padding: '8px 0',
                fontSize: 13,
                color: '#8f8f8f',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              No results
            </p>
          )}
        </div>
      </div>

      {/* Separator + Apply footer — matches Figma exactly */}
      <div style={{ height: 1, background: '#eaeaea', flexShrink: 0 }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 20 }}>
        <button
          onClick={onClose}
          style={{
            height: 36,
            padding: '8px 12px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '-0.28px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            cursor: 'pointer',
          }}
          className="hover:opacity-90 transition-opacity"
        >
          Apply
        </button>
      </div>
    </div>,
    document.body
  )
}

// ── Dropdown trigger + popup (one filter row) ─────────────────────────────────

interface FilterDropdownProps {
  label: string
  options: { id: string; label: string }[]
  selected: string[]
  onChange: (next: string[]) => void
  showSearch?: boolean
}

function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  showSearch = false,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  function handleToggleOpen() {
    if (open) {
      setOpen(false)
      setAnchorRect(null)
    } else {
      if (triggerRef.current) {
        setAnchorRect(triggerRef.current.getBoundingClientRect())
      }
      setOpen(true)
    }
  }

  function handleClose() {
    setOpen(false)
    setAnchorRect(null)
  }

  const isActive = selected.length > 0

  // Trigger label — gray placeholder when all, summary text when filtered
  const triggerLabel =
    selected.length === 0
      ? label
      : selected.length === 1
      ? options.find(o => o.id === selected[0])?.label ?? label
      : `${label} (${selected.length})`

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Trigger — Figma "Dropdown - Regular": border #e5e9f0, radius 4, h-36, pl-12, pr-8 */}
      <button
        ref={triggerRef}
        onClick={handleToggleOpen}
        style={{
          width: '100%',
          height: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 12,
          paddingRight: 8,
          border: `1px solid ${open || isActive ? '#1976d2' : '#e5e9f0'}`,
          borderRadius: 4,
          background: 'white',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            flex: '1 0 0',
            minWidth: 0,
            fontSize: 14,
            lineHeight: '20px',
            letterSpacing: '-0.28px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: isActive ? 500 : 400,
            color: isActive ? '#212121' : '#8f8f8f',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {triggerLabel}
        </span>
        {/* Chevron — rotates 180° when open */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8f8f8f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Portal dropdown */}
      {open && anchorRect && (
        <DropdownPortal
          anchorRect={anchorRect}
          onClose={handleClose}
          options={options}
          selected={selected}
          allOptions={options}
          onChange={onChange}
          showSearch={showSearch}
        />
      )}
    </div>
  )
}

// ── Main FilterPanel ──────────────────────────────────────────────────────────

export default function FilterPanel() {
  const {
    showFilterPanel,
    filterTypes, setFilterTypes,
    filterImpact, setFilterImpact,
    filterThemes, setFilterThemes,
    filterLocations, setFilterLocations,
    clearAllFilters,
  } = useAppStore()

  if (!showFilterPanel) return null

  const hasActiveFilters =
    filterTypes.length > 0 ||
    filterImpact.length > 0 ||
    filterThemes.length > 0 ||
    filterLocations.length > 0

  const typeOptions = ALL_TYPES.map(t => ({ id: t, label: t }))
  const impactOptions = IMPACT_OPTIONS.map(i => ({ id: i, label: i }))

  return (
    <aside
      style={{
        width: 280,
        borderLeft: '1px solid #eaeaea',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {/* Panel header — h-68, px-20, py-16, bold 16px */}
      <div
        style={{
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #eaeaea',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: '-0.32px',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            color: '#212121',
          }}
        >
          Filter by
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            style={{
              fontSize: 13,
              lineHeight: '20px',
              fontFamily: 'Roboto, sans-serif',
              color: '#1976d2',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            className="hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter dropdown fields — 20px padding, 8px gap */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          padding: '16px 20px',
        }}
      >
        <FilterDropdown
          label="Type"
          options={typeOptions}
          selected={filterTypes as string[]}
          onChange={v => setFilterTypes(v as RecCategory[])}
        />
        <FilterDropdown
          label="Impact"
          options={impactOptions}
          selected={filterImpact}
          onChange={setFilterImpact}
        />
        <FilterDropdown
          label="Theme"
          options={THEME_OPTIONS}
          selected={filterThemes}
          onChange={setFilterThemes}
        />
        <FilterDropdown
          label="Location"
          options={LOCATION_OPTIONS}
          selected={filterLocations}
          onChange={setFilterLocations}
          showSearch
        />
      </div>
    </aside>
  )
}
