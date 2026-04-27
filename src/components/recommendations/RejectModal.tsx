import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '../ui/dialog'
import { Checkbox } from '../ui/checkbox'

interface RejectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReject: () => void
}

export default function RejectModal({ open, onOpenChange, onReject }: RejectModalProps) {
  const [removePermanently, setRemovePermanently] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 gap-6 bg-white !top-[132px] !translate-y-0">
        <DialogHeader>
          <DialogTitle className="text-[16px] font-medium text-[#212121]">Reject recommendation?</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <p className="text-[14px] text-[#212121] font-medium">Tell us what didn't work</p>
          
          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox className="mt-0.5" />
              <span className="text-[14px] text-[#555] leading-[20px]">The recommendation doesn't apply to the business</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox className="mt-0.5" />
              <span className="text-[14px] text-[#555] leading-[20px]">Previously accepted a similar recommendation</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox className="mt-0.5" />
              <span className="text-[14px] text-[#555] leading-[20px]">The suggestion is unlikely to meaningfully improve performance.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox className="mt-0.5" />
              <span className="text-[14px] text-[#555] leading-[20px]">The recommendation contains errors or could misinform customers.</span>
            </label>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <p className="text-[14px] text-[#212121] leading-[20px]">Rejecting this recommendation will hide it from your list for 30 days.</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox 
                checked={removePermanently} 
                onCheckedChange={(checked) => setRemovePermanently(checked as boolean)} 
              />
              <span className="text-[14px] text-[#555] leading-[20px]">Remove permanently</span>
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <button className="px-4 py-2 text-[14px] font-medium text-[#1976d2] hover:bg-[#f5f5f5] rounded transition-colors">
              Cancel
            </button>
          </DialogClose>
          <button 
            onClick={onReject}
            className="px-4 py-2 text-[14px] font-medium text-white bg-[#1976d2] hover:bg-[#1565c0] rounded transition-colors"
          >
            Reject
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
