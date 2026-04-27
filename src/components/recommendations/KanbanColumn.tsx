import { useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Recommendation, RecStatus } from '../../types'
import RecommendationCard from './RecommendationCard'

interface Props {
  status: RecStatus
  label: string
  labelColor: string
  items: Recommendation[]
  activeId: string | null
}

export default function KanbanColumn({ status, label, labelColor, items, activeId }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-[280px] min-w-[280px] rounded-md transition-all ${
        isOver ? 'bg-blue-bg/50 ring-2 ring-primary/20' : 'bg-l2-bg'
      }`}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2.5 flex-shrink-0">
        <span className={`text-[14px] font-medium ${labelColor}`}>{label}</span>
        <span className="text-[12px] px-1.5 py-0.5 rounded-full bg-selected text-text-secondary min-w-[22px] text-center">
          {items.length}
        </span>
      </div>

      {/* Cards */}
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 px-2 pb-3 flex-1 overflow-y-auto min-h-[200px]">
          {items.length === 0 ? (
            <div className={`flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-md transition-all ${
              isOver ? 'border-primary/40 bg-blue-bg/30' : 'border-border-primary'
            }`}>
              <p className="text-[13px] text-text-disabled">No tasks here</p>
              <p className="text-[12px] text-text-disabled mt-0.5">Drag cards here</p>
            </div>
          ) : (
            items.map(rec => (
              <SortableCard key={rec.id} rec={rec} isDragging={activeId === rec.id} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}

function SortableCard({ rec, isDragging }: { rec: Recommendation; isDragging: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: rec.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <RecommendationCard rec={rec} isKanban />
    </div>
  )
}
