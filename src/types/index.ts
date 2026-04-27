export type RecStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected'
export type RecCategory =
  | 'Website content'
  | 'Website improvement'
  | 'Reviews'
  | 'Social'
  | 'FAQ'
  | 'Content'
  | 'Local SEO'
  | 'Conversion'
  | 'Trust & Reputation'
  | 'Technical SEO'
export type LLMPlatform = 'ChatGPT' | 'Gemini' | 'Perplexity' | 'Claude'
export type AssignChoice = 'self' | 'team' | 'remind'
export type ViewMode = 'list' | 'kanban'

export interface CompetitorPlatformSnippet {
  platform: LLMPlatform
  prompt: string
  snippet: string
}

export interface Competitor {
  id: string
  name: string
  pageUrl?: string
  llmSnippet: string
  citedBy: LLMPlatform[]
  totalCitations: number
  citationRank: number
  sourceGaps: string[]
  whyTheyWin: string
  platformSnippets?: CompetitorPlatformSnippet[]
}

export interface SourceReference {
  platform: string
  competitorName: string
  url: string
  snippet: string
  referencedInAnswers: number
}

export interface ContentGap {
  phrase: string
  frequency: number
  competitors: string[]
  recommendation: string
}

export type ChecklistStepType = 'link' | 'nap' | 'keyword' | 'task'

export interface ChecklistStep {
  id: string
  label: string
  description: string
  completed: boolean
  autoCompleted: boolean
  ctaLabel?: string
  ctaAction?: 'approve_asset' | 'copy_link' | 'assign' | 'open_content_hub' | 'mark_done'
  /** Drives the rich content box rendered below the description */
  stepType?: ChecklistStepType
  /** For stepType 'link' — list of URLs to display as clickable rows */
  links?: { label: string; url: string }[]
  /** For stepType 'nap' — exact business details the user should copy */
  napData?: { name: string; address: string; phone: string }
  /** For stepType 'keyword' — search phrases to copy into the profile */
  keywords?: string[]
  /** For any step that targets a specific page URL */
  targetPage?: string
}

export interface GeneratedAsset {
  type: 'blog' | 'faq' | 'schema' | 'social' | 'content_suggestions' | 'citations'
  title: string
  previewText: string
  fullContent: string
  approved: boolean
}

export interface Recommendation {
  id: string
  title: string
  description: string
  category: RecCategory
  impactLabel: string
  effort: 'Quick win' | 'Medium' | 'Bigger lift'
  tags?: string[]
  locations?: number
  themeId: string
  createdAt: string
  locationNames?: string[]
  status: RecStatus
  assignedTo: string | null
  assignChoice: AssignChoice | null
  acceptedAt: string | null
  acceptedBy: string | null
  completedAt: string | null
  whyItWorks: string[]
  competitors: Competitor[]
  sources: SourceReference[]
  contentGaps: ContentGap[]
  promptsTriggeringThis: string[]
  llmCoverageGap: {
    platforms: LLMPlatform[]
    summary: string
  }
  generatedAsset: GeneratedAsset | null
  checklist: ChecklistStep[]
  targetPages?: string[]
  shortAction?: string
  youCitations?: number
  expectedImpact?: string
  keyInsights?: string[]
  swotDrivers?: string[]
  competitorsInsight?: string[]
  /** AEO content score data — only populated for Content-type recs */
  aeoScore?: AeoScore
  /** Your actual metric score (0-100) — overrides global BusinessMetrics for bars */
  youScore?: number
  /** Top competitor's metric score (0-100) */
  compScore?: number
}

export interface AeoSubScore {
  name: string
  weight: number   // e.g. 10.2
  you: number      // your percentage (0-100)
  competitor: number
  delta: number    // positive = you lead
}

export interface AeoScore {
  you: number           // total AEO score (0-100)
  competitor: number    // top competitor's AEO total
  subScores: AeoSubScore[]
}

export interface BusinessMetrics {
  searchAiScore: number
  scoreTrend: number
  visibility: number
  citationShare: number
  rank: number
  sentiment: number
  youCitations: number
}
