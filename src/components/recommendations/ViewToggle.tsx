import { useAppStore } from '../../store/useAppStore'

export default function ViewToggle() {
  const { viewMode, setViewMode } = useAppStore()

  return (
    <div className="flex items-center gap-1 px-2 h-9 bg-white border border-[#e5e9f0] rounded-[4px]">
      <button
        title="Board view"
        onClick={() => setViewMode('kanban')}
        className={`flex items-center justify-center size-6 rounded-[4px] transition-all ${
          viewMode === 'kanban' ? 'bg-[#e5e9f0]' : 'bg-white hover:bg-[#f5f5f5]'
        }`}
      >
        <img src={`${import.meta.env.BASE_URL}assets/grid_view.svg`} alt="Board" className="w-5 h-5" />
      </button>
      <button
        title="List view"
        onClick={() => setViewMode('list')}
        className={`flex items-center justify-center size-6 rounded-[4px] transition-all ${
          viewMode === 'list' ? 'bg-[#e5e9f0]' : 'bg-white hover:bg-[#f5f5f5]'
        }`}
      >
        <img src={`${import.meta.env.BASE_URL}assets/Table view.svg`} alt="List" className="w-5 h-5" />
      </button>
    </div>
  )
}
