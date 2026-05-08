import { useState } from 'react'
import { User, Users, Bell, X, Check } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import type { AssignChoice } from '../../types'

interface AssignModalProps {
  recId: string
  onClose: () => void
}

export default function AssignModal({ recId, onClose }: AssignModalProps) {
  const [choice, setChoice] = useState<AssignChoice | null>(null)
  const [teamEmail, setTeamEmail] = useState('')
  const { acceptRec } = useAppStore()

  const handleConfirm = () => {
    if (!choice) return
    acceptRec(recId, choice, choice === 'team' ? teamEmail : undefined)
    onClose()
  }

  const options: { id: AssignChoice; icon: typeof User; title: string; desc: string }[] = [
    { id: 'self', icon: User, title: "I'll do it myself", desc: "Task moves to your to-do list" },
    { id: 'team', icon: Users, title: 'Send to my team', desc: 'Enter email or select team member' },
    { id: 'remind', icon: Bell, title: 'Remind me later', desc: 'Set a reminder date' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm fade-in">
      <div className="bg-white rounded-md shadow-card w-[560px] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-[18px] font-normal text-text-primary">Accept this task</h2>
            <p className="text-[14px] text-text-secondary mt-1">How would you like to handle it?</p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary p-1 rounded-sm hover:bg-selected/50">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {options.map(opt => {
            const Icon = opt.icon
            const isSelected = choice === opt.id
            return (
              <button
                key={opt.id}
                onClick={() => setChoice(opt.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-md border-2 transition-all text-center ${
                  isSelected
                    ? 'border-primary bg-blue-bg'
                    : 'border-border-primary hover:border-primary/30 hover:bg-l2-bg'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary text-white' : 'bg-selected text-text-secondary'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className={`text-[14px] font-medium ${isSelected ? 'text-primary' : 'text-text-primary'}`}>{opt.title}</p>
                  <p className="text-[12px] text-text-secondary mt-1">{opt.desc}</p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {choice === 'team' && (
          <div className="mb-5 fade-in">
            <label className="block text-[14px] text-text-secondary mb-1.5">Team member email</label>
            <input
              type="email"
              placeholder="sarah@raineandhorne.com.au"
              value={teamEmail}
              onChange={e => setTeamEmail(e.target.value)}
              className="w-full border border-border-primary rounded-sm px-3 py-2 text-[14px] text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
        )}

        {choice === 'remind' && (
          <div className="mb-5 fade-in">
            <label className="block text-[14px] text-text-secondary mb-1.5">Remind me on</label>
            <input
              type="date"
              className="w-full border border-border-primary rounded-sm px-3 py-2 text-[14px] text-text-primary focus:outline-none focus:border-primary"
            />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-[14px] text-text-secondary border border-border-primary rounded-sm hover:bg-l2-bg transition-all">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!choice}
            className="px-4 py-2 text-[14px] text-white bg-ai-purple rounded-sm hover:bg-ai-purple/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
