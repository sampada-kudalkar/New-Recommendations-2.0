import { TrendingUp, Eye, Star, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import ScoreRing from '../components/dashboard/ScoreRing'
import MetricBar from '../components/dashboard/MetricBar'
import CoachCallout from '../components/dashboard/CoachCallout'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { metrics, recommendations } = useAppStore()

  const pending = recommendations.filter(r => r.status === 'pending').length
  const inProgress = recommendations.filter(r => r.status === 'in_progress' || r.status === 'accepted').length
  const completed = recommendations.filter(r => r.status === 'completed').length

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">

        {/* AI Coach callout */}
        <CoachCallout />

        {/* Score + metrics row */}
        <div className="flex gap-4">
          {/* Score ring card */}
          <div className="border border-border-primary rounded-md p-5 flex flex-col items-center gap-3 w-[200px] flex-shrink-0">
            <ScoreRing score={metrics.searchAiScore} size={130} strokeWidth={11} animated />
            <div className="text-center">
              <p className="text-[14px] font-medium text-text-primary">Search AI Score</p>
              <p className="text-[12px] text-text-secondary flex items-center justify-center gap-1 mt-0.5">
                <TrendingUp size={12} className="text-green-text" />
                <span className="text-green-text font-medium">+{metrics.scoreTrend}</span> this week
              </p>
            </div>
          </div>

          {/* Metrics card */}
          <div className="border border-border-primary rounded-md p-5 flex-1 flex flex-col justify-between gap-4">
            <h3 className="text-[14px] font-medium text-text-primary">Visibility metrics</h3>
            <div className="flex flex-col gap-4">
              <MetricBar
                label="AI Visibility"
                value={metrics.visibility}
                color="#1976d2"
                sublabel="How often AI surfaces your business"
              />
              <MetricBar
                label="Citation Share"
                value={metrics.citationShare}
                color="#6834b7"
                unit="%"
                sublabel="% of relevant AI answers citing you"
              />
              <MetricBar
                label="Sentiment Score"
                value={metrics.sentiment}
                color="#4cae3d"
                sublabel="Positive tone in AI descriptions"
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="border border-border-primary rounded-md p-5 w-[160px] flex-shrink-0 flex flex-col gap-4">
            <h3 className="text-[14px] font-medium text-text-primary">At a glance</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Eye size={15} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-[18px] font-medium text-text-primary leading-none">{metrics.rank}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">AI rank</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star size={15} className="text-orange-text flex-shrink-0" />
                <div>
                  <p className="text-[18px] font-medium text-text-primary leading-none">{pending}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">pending tasks</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={15} className="text-green-text flex-shrink-0" />
                <div>
                  <p className="text-[18px] font-medium text-text-primary leading-none">{completed}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task summary */}
        <div className="border border-border-primary rounded-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-medium text-text-primary">Recommendations summary</h3>
            <button
              onClick={() => navigate('/recommendations')}
              className="text-[13px] text-primary hover:text-primary-hover"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Pending', count: pending, color: '#555555', bg: '#f5f5f5' },
              { label: 'In progress', count: inProgress, color: '#e67e00', bg: '#fff8f0' },
              { label: 'Completed', count: completed, color: '#377e2c', bg: '#f1faf0' },
            ].map(({ label, count, color, bg }) => (
              <button
                key={label}
                onClick={() => navigate('/recommendations')}
                className="flex flex-col items-center gap-1.5 p-4 rounded-md border border-border-primary hover:border-primary/40 transition-all text-center"
                style={{ backgroundColor: bg }}
              >
                <span className="text-[26px] font-medium" style={{ color }}>{count}</span>
                <span className="text-[12px] text-text-secondary">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Competitor overview */}
        <div className="border border-border-primary rounded-md p-5">
          <h3 className="text-[15px] font-medium text-text-primary mb-3">Competitors outranking you in AI</h3>
          <div className="flex flex-col gap-2">
            {['Austin Family Dentistry', 'Capitol Dental Care', 'Lakeway Modern Dentistry'].map((name, i) => (
              <div key={name} className="flex items-center gap-3 py-2 border-b border-border-primary last:border-0">
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-[13px] flex-shrink-0">
                  {name[0]}
                </div>
                <span className="text-[14px] text-text-primary flex-1">{name}</span>
                <span className="text-[12px] text-text-secondary">#{i + 1} in AI results</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
