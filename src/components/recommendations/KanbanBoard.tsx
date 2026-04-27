import { useState } from 'react'
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useAppStore } from '../../store/useAppStore'
import KanbanColumn from './KanbanColumn'
import type { RecStatus } from '../../types'
import { getLocationsForRec } from '../../data/locationsData'

const COLUMNS: { status: RecStatus; label: string; color: string }[] = [
  { status: 'pending', label: 'Pending', color: 'text-text-secondary' },
  { status: 'accepted', label: 'Accepted', color: 'text-primary' },
  { status: 'in_progress', label: 'In Progress', color: 'text-orange-text' },
  { status: 'completed', label: 'Completed', color: 'text-green-text' },
]

export default function KanbanBoard() {
  const {
    recommendations, moveRec, reorderRecs,
    filterTypes, filterImpact, filterThemes, filterLocations,
  } = useAppStore()
  const [activeId, setActiveId] = useState<string | null>(null)

  const panelFiltered = recommendations.filter(r => {
    if (filterTypes.length > 0 && !filterTypes.includes(r.category)) return false
    if (filterImpact.length > 0 && !filterImpact.includes(r.effort)) return false
    if (filterThemes.length > 0 && !filterThemes.includes(r.themeId)) return false
    if (filterLocations.length > 0) {
      const recLocs = getLocationsForRec(r.id, r.locations ?? 0)
      if (!recLocs.some(l => filterLocations.includes(l))) return false
    }
    return true
  })

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(e.active.id as string)
  }

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = e
    if (!over) return

    const fromId = active.id as string
    const toId = over.id as string

    if (fromId === toId) return

    const activeRec = recommendations.find(r => r.id === fromId)
    const overRec = recommendations.find(r => r.id === toId)

    if (!activeRec) return

    // Dropped on a column
    const columnStatuses: RecStatus[] = ['pending', 'accepted', 'in_progress', 'completed']
    if (columnStatuses.includes(toId as RecStatus)) {
      if (activeRec.status !== toId) {
        moveRec(fromId, toId as RecStatus)
      }
      return
    }

    // Dropped on a card
    if (overRec) {
      if (activeRec.status === overRec.status) {
        reorderRecs(fromId, toId)
      } else {
        moveRec(fromId, overRec.status)
      }
    }
  }

  return (
    <div className="flex-1 overflow-x-auto p-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 h-full min-w-max">
          {COLUMNS.map(col => {
            const items = panelFiltered.filter(r => r.status === col.status)
            return (
              <KanbanColumn
                key={col.status}
                status={col.status}
                label={col.label}
                labelColor={col.color}
                items={items}
                activeId={activeId}
              />
            )
          })}
        </div>
      </DndContext>
    </div>
  )
}
