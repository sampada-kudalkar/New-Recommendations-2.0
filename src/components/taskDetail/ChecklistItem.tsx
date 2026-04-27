import { Check, Sparkles, ExternalLink } from 'lucide-react'
import type { ChecklistStep } from '../../types'

interface Props {
  step: ChecklistStep
  onToggle: () => void
  onCta?: () => void
  disabled?: boolean
}

export default function ChecklistItem({ step, onToggle, onCta, disabled }: Props) {
  return (
    <div className={`flex items-start gap-3 py-3 border-b border-border-primary last:border-0 ${disabled ? 'opacity-50' : ''}`}>
      {/* Checkbox */}
      <button
        onClick={!step.autoCompleted && !disabled ? onToggle : undefined}
        disabled={step.autoCompleted || disabled}
        className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
          step.completed
            ? 'bg-green-value border-green-value'
            : step.autoCompleted
            ? 'bg-green-value/20 border-green-value/40'
            : 'border-border-primary hover:border-primary cursor-pointer'
        }`}
      >
        {step.completed && <Check size={12} className="text-white" strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[14px] font-medium ${step.completed ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
            {step.label}
          </span>
          {step.autoCompleted && (
            <span className="flex items-center gap-1 text-[11px] text-ai-purple bg-ai-purple-bg px-2 py-0.5 rounded-sm">
              <Sparkles size={10} />
              Done by Birdeye AI
            </span>
          )}
        </div>
        <p className="text-[13px] text-text-secondary mt-0.5 leading-[18px]">{step.description}</p>
      </div>

      {/* CTA button */}
      {step.ctaLabel && !disabled && (
        <button
          onClick={onCta}
          className={`flex-shrink-0 flex items-center gap-1.5 text-[13px] px-3 py-1.5 rounded-sm transition-all ${
            step.ctaAction === 'approve_asset'
              ? 'bg-ai-purple text-white hover:bg-ai-purple/90'
              : 'border border-border-primary text-text-secondary hover:bg-l2-bg'
          }`}
        >
          {step.ctaLabel}
          {step.ctaAction === 'copy_link' && <ExternalLink size={12} />}
        </button>
      )}
    </div>
  )
}
