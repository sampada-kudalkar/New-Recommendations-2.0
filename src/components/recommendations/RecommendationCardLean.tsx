import type { Recommendation } from '../../types'

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

interface Props {
  rec: Recommendation
}

export default function RecommendationCardLean({ rec }: Props) {
  const stepsTotal = rec.checklist.length

  return (
    <div className="group flex items-start gap-4 py-5 px-1 hover:bg-[#fafafa] transition-colors cursor-default">

      {/* Left: green check icon */}
      <div className="flex-shrink-0 mt-0.5">
        <img src={`${import.meta.env.BASE_URL}assets/check_circle.svg`} alt="" className="w-4 h-4 opacity-80" />
      </div>

      {/* Center: content — constrained to 70% */}
      <div className="flex-1 min-w-0 max-w-[70%]">
        {/* Meta */}
        <p className="text-[11px] uppercase tracking-[0.07em] text-[#a0a0a0] mb-1">
          {rec.category} · {rec.effort}
        </p>

        {/* Title */}
        <p className="text-[15px] font-[500] text-[#1d1d1f] leading-[22px] tracking-[-0.3px] mb-1">
          {rec.title}
        </p>

        {/* Completion + impact */}
        <p className="text-[12px] text-[#34c759] leading-[18px]">
          {stepsTotal > 0 ? `All ${stepsTotal} steps completed` : 'Completed'}
          {' · '}
          <span className="text-[#555]">{rec.impactLabel}</span>
        </p>

        {/* Date */}
        {rec.completedAt && (
          <p className="text-[11px] text-[#bbb] mt-0.5">{formatDate(rec.completedAt)}</p>
        )}
      </div>

      {/* Right: See results — fades in on hover */}
      <div className="flex-shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-[13px] text-[#1976d2] hover:underline whitespace-nowrap">
          See results →
        </button>
      </div>

    </div>
  )
}
