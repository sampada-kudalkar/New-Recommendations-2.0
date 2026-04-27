import type { RecStatus } from '../../types'

const config: Record<RecStatus, { label: string; cls: string }> = {
  pending: { label: 'Pending', cls: 'bg-white text-text-secondary' },
  accepted: { label: 'Accepted', cls: 'bg-blue-bg text-primary' },
  in_progress: { label: 'In Progress', cls: 'bg-orange-bg text-orange-text' },
  completed: { label: 'Completed', cls: 'bg-green-bg text-green-text' },
  rejected: { label: 'Rejected', cls: 'bg-red-bg text-red-text' },
}

export default function StatusBadge({ status }: { status: RecStatus }) {
  const { label, cls } = config[status]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[12px] font-normal ${cls}`}>
      {label}
    </span>
  )
}
