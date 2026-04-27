interface Props {
  label: string
  value: number
  max?: number
  unit?: string
  color?: string
  sublabel?: string
}

export default function MetricBar({
  label,
  value,
  max = 100,
  unit = '',
  color = '#1976d2',
  sublabel,
}: Props) {
  const pct = Math.min(100, (value / max) * 100)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-text-secondary">{label}</span>
        <span className="text-[14px] font-medium text-text-primary">
          {value}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-border-primary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {sublabel && (
        <p className="text-[12px] text-text-secondary">{sublabel}</p>
      )}
    </div>
  )
}
