import { create } from 'zustand'
import type { Recommendation, BusinessMetrics, ViewMode, RecStatus, AssignChoice, RecCategory } from '../types'
import { seedRecommendations, seedMetrics, seedBusiness } from '../data/seedData'

interface Toast {
  id: string
  message: string
  type: 'success' | 'info' | 'error'
}

interface AppStore {
  // Data
  recommendations: Recommendation[]
  metrics: BusinessMetrics
  businessName: string

  // UI state
  viewMode: ViewMode
  activeTab: RecStatus | 'all'
  selectedRecId: string | null
  toasts: Toast[]
  regeneratingIds: Set<string>
  activeDetailTab: Record<string, number>

  // Filter panel state
  showFilterPanel: boolean
  filterTypes: RecCategory[]
  filterImpact: string[]
  filterThemes: string[]
  filterLocations: string[]

  // Actions
  acceptRec: (id: string, assignChoice: AssignChoice, assignedTo?: string) => void
  rejectRec: (id: string) => void
  completeRec: (id: string) => void
  moveRec: (id: string, newStatus: RecStatus) => void
  reorderRecs: (fromId: string, toId: string) => void
  toggleChecklistItem: (recId: string, stepId: string) => void
  approveAsset: (recId: string) => void
  setViewMode: (mode: ViewMode) => void
  setActiveTab: (tab: RecStatus | 'all') => void
  setSelectedRec: (id: string | null) => void
  regenerateRec: (id: string) => void
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void
  removeToast: (id: string) => void
  setDetailTab: (recId: string, tabIndex: number) => void

  // Filter panel actions
  toggleFilterPanel: () => void
  setFilterTypes: (types: RecCategory[]) => void
  setFilterImpact: (impact: string[]) => void
  setFilterThemes: (themes: string[]) => void
  setFilterLocations: (locations: string[]) => void
  clearAllFilters: () => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  recommendations: seedRecommendations,
  metrics: seedMetrics,
  businessName: seedBusiness.name,
  viewMode: 'list',
  activeTab: 'pending',
  selectedRecId: null,
  toasts: [],
  regeneratingIds: new Set(),
  activeDetailTab: {},
  showFilterPanel: false,
  filterTypes: [],
  filterImpact: [],
  filterThemes: [],
  filterLocations: [],

  acceptRec: (id, assignChoice, assignedTo) => {
    set(state => ({
      recommendations: state.recommendations.map(r =>
        r.id === id
          ? { ...r, status: 'accepted', assignChoice, assignedTo: assignedTo ?? null, acceptedAt: new Date().toISOString(), acceptedBy: 'James Smith' }
          : r
      ),
      metrics: { ...state.metrics, searchAiScore: Math.min(100, state.metrics.searchAiScore + 2) },
    }))
    get().addToast('Recommendation is accepted', 'success')
  },

  rejectRec: (id) => {
    set(state => ({
      recommendations: state.recommendations.map(r =>
        r.id === id ? { ...r, status: 'rejected' } : r
      ),
    }))
    get().addToast('Recommendation is rejected', 'info')
    // Trigger regeneration after 2s
    const store = get()
    store.regenerateRec(id)
  },

  completeRec: (id) => {
    set(state => ({
      recommendations: state.recommendations.map(r =>
        r.id === id
          ? { ...r, status: 'completed', completedAt: new Date().toISOString() }
          : r
      ),
      metrics: {
        ...state.metrics,
        searchAiScore: Math.min(100, state.metrics.searchAiScore + 4),
        visibility: Math.min(100, state.metrics.visibility + 2),
        citationShare: Math.min(100, state.metrics.citationShare + 3),
      },
    }))
    get().addToast('recommendation marked as complete', 'success')
  },

  moveRec: (id, newStatus) => {
    set(state => ({
      recommendations: state.recommendations.map(r =>
        r.id === id ? { ...r, status: newStatus } : r
      ),
    }))
  },

  reorderRecs: (fromId, toId) => {
    set(state => {
      const recs = [...state.recommendations]
      const fromIndex = recs.findIndex(r => r.id === fromId)
      const toIndex = recs.findIndex(r => r.id === toId)
      if (fromIndex === -1 || toIndex === -1) return state
      const [removed] = recs.splice(fromIndex, 1)
      recs.splice(toIndex, 0, removed)
      return { recommendations: recs }
    })
  },

  toggleChecklistItem: (recId, stepId) => {
    set(state => ({
      recommendations: state.recommendations.map(r => {
        if (r.id !== recId) return r
        const updatedChecklist = r.checklist.map(step =>
          step.id === stepId && !step.autoCompleted
            ? { ...step, completed: !step.completed }
            : step
        )
        // Auto-advance to in_progress if first manual check happens
        const anyCompleted = updatedChecklist.some(s => s.completed && !s.autoCompleted)
        const newStatus = r.status === 'accepted' && anyCompleted ? 'in_progress' : r.status
        // Check if all steps done → enable complete button (user must still click)
        return { ...r, checklist: updatedChecklist, status: newStatus }
      }),
    }))
  },

  approveAsset: (recId) => {
    set(state => ({
      recommendations: state.recommendations.map(r => {
        if (r.id !== recId || !r.generatedAsset) return r
        return {
          ...r,
          generatedAsset: { ...r.generatedAsset, approved: true },
          checklist: r.checklist.map((s, i) =>
            i === 0 ? { ...s, completed: true } : s
          ),
        }
      }),
    }))
    get().addToast('Asset approved!', 'success')
  },

  setViewMode: (mode) => set({ viewMode: mode }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedRec: (id) => set({ selectedRecId: id }),

  regenerateRec: (id) => {
    set(state => {
      const ids = new Set(state.regeneratingIds)
      ids.add(id)
      return { regeneratingIds: ids }
    })
    setTimeout(() => {
      set(state => {
        const ids = new Set(state.regeneratingIds)
        ids.delete(id)
        return { regeneratingIds: ids }
      })
      get().addToast('New recommendation generated!', 'info')
    }, 2500)
  },

  addToast: (message, type = 'success') => {
    const id = Date.now().toString()
    set(state => ({ toasts: [...state.toasts, { id, message, type }] }))
    setTimeout(() => get().removeToast(id), 5000)
  },

  removeToast: (id) => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
  },

  setDetailTab: (recId, tabIndex) => {
    set(state => ({ activeDetailTab: { ...state.activeDetailTab, [recId]: tabIndex } }))
  },

  toggleFilterPanel: () => set(state => ({ showFilterPanel: !state.showFilterPanel })),
  setFilterTypes: (types) => set({ filterTypes: types }),
  setFilterImpact: (impact) => set({ filterImpact: impact }),
  setFilterThemes: (themes) => set({ filterThemes: themes }),
  setFilterLocations: (locations) => set({ filterLocations: locations }),
  clearAllFilters: () => set({ filterTypes: [], filterImpact: [], filterThemes: [], filterLocations: [] }),
}))
