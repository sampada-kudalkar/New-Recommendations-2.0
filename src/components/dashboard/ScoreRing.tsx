import { useEffect, useRef } from 'react'

interface Props {
  score: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
  animated?: boolean
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  animated = true,
}: Props) {
  const circleRef = useRef<SVGCircleElement>(null)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (score / 100) * circumference

  const scoreColor =
    score >= 75 ? '#4cae3d' : score >= 50 ? '#e67e00' : '#de1b0c'

  useEffect(() => {
    const el = circleRef.current
    if (!el || !animated) return
    el.style.strokeDashoffset = String(circumference)
    requestAnimationFrame(() => {
      el.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)'
      el.style.strokeDashoffset = String(progress)
    })
  }, [score, circumference, progress, animated])

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eaeaea"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? circumference : progress}
        />
        {/* Center text — counter-rotate so text is upright */}
        <text
          x={size / 2}
          y={size / 2 + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            transform: `rotate(90deg) translate(0, 0)`,
            transformOrigin: `${size / 2}px ${size / 2}px`,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          <tspan
            x={size / 2}
            dy="-6"
            fontSize="22"
            fontWeight="500"
            fill={scoreColor}
          >
            {score}
          </tspan>
          <tspan
            x={size / 2}
            dy="18"
            fontSize="11"
            fontWeight="400"
            fill="#555555"
          >
            /100
          </tspan>
        </text>
      </svg>
      {label && (
        <p className="text-[13px] font-medium text-text-primary text-center">{label}</p>
      )}
      {sublabel && (
        <p className="text-[12px] text-text-secondary text-center">{sublabel}</p>
      )}
    </div>
  )
}
