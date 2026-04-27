import { useAppStore } from '../../store/useAppStore'
import TableView from './TableView'
import type { Recommendation } from '../../types'
import { getLocationsForRec } from '../../data/locationsData'

const EFFORT_ORDER: Record<Recommendation['effort'], number> = {
  'Quick win':   0,
  'Bigger lift': 1,
  'Medium':      2,
}

export default function ListView() {
  const {
    recommendations, activeTab, metrics,
    filterTypes, filterImpact, filterThemes, filterLocations,
  } = useAppStore()

  const filtered = recommendations.filter(r => {
    if (activeTab !== 'all' && r.status !== activeTab) return false
    if (filterTypes.length > 0 && !filterTypes.includes(r.category)) return false
    if (filterImpact.length > 0 && !filterImpact.includes(r.effort)) return false
    if (filterThemes.length > 0 && !filterThemes.includes(r.themeId)) return false
    if (filterLocations.length > 0) {
      const recLocs = getLocationsForRec(r.id, r.locations ?? 0)
      if (!recLocs.some(l => filterLocations.includes(l))) return false
    }
    return true
  })

  const sorted = [...filtered].sort(
    (a, b) => EFFORT_ORDER[a.effort] - EFFORT_ORDER[b.effort],
  )

  return <TableView recommendations={sorted} metrics={metrics} />
}
