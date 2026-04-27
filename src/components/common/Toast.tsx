import { useState } from 'react'
import { X, Info, AlertCircle } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore()

  return (
    <div className="fixed top-[52px] left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onClose }: { toast: { id: string; message: string; type: string }; onClose: () => void }) {
  const [exiting, setExiting] = useState(false)

  const handleClose = () => {
    setExiting(true)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-[#eaeaea] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.10)] min-w-[280px] max-w-sm ${exiting ? 'toast-exit' : 'toast-enter'}`}
    >
      {toast.type === 'success' ? (
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      ) : toast.type === 'error' ? (
        <AlertCircle size={18} className="flex-shrink-0 text-red-500" />
      ) : (
        <Info size={18} className="flex-shrink-0 text-[#1976d2]" />
      )}
      <span className="text-[14px] text-[#212121] leading-[20px] flex-1">{toast.message}</span>
      <button onClick={handleClose} className="flex-shrink-0 text-[#888] hover:text-[#212121] transition-colors">
        <X size={16} />
      </button>
    </div>
  )
}
