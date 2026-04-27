type Effort = 'Quick win' | 'Medium' | 'Bigger lift'

const config: Record<Effort, { cls: string }> = {
  'Quick win': { cls: 'bg-green-bg text-green-text' },
  'Medium': { cls: 'bg-orange-bg text-orange-text' },
  'Bigger lift': { cls: 'bg-red-bg text-red-text' },
}

export default function EffortBadge({ effort }: { effort: Effort }) {
  const { cls } = config[effort]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[12px] font-normal ${cls}`}>
      {effort}
    </span>
  )
}
