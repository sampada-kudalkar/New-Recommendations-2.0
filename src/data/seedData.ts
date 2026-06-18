import type { BusinessMetrics, ChecklistStep, Competitor, CompetitorPlatformSnippet, LLMPlatform, Recommendation } from '../types'

export const seedBusiness = {
  name: 'My Family Dental',
  location: 'Queensland, AU',
}

export const seedMetrics: BusinessMetrics = {
  searchAiScore: 58,
  scoreTrend: 1,
  visibility: 52,
  citationShare: 45,
  rank: 4,
  sentiment: 74,
  youCitations: 9,
}

// ─── helpers ────────────────────────────────────────────────────────────────

type StepInput = Omit<ChecklistStep, 'id' | 'completed' | 'autoCompleted'>

function makeChecklist(valueId: string, steps: StepInput[]): ChecklistStep[] {
  return steps.map((step, i) => ({
    ...step,
    id: `${valueId}-step-${i + 1}`,
    completed: false,
    autoCompleted: false,
  }))
}

function makeCompetitors(
  comps: {
    name: string
    pageUrl?: string
    gap: string
    totalCitations?: number
    citationRank?: number
    citedBy?: LLMPlatform[]
    llmSnippet?: string
    platformSnippets?: CompetitorPlatformSnippet[]
  }[],
): Competitor[] {
  return comps.map((c, i) => ({
    id: c.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name: c.name,
    pageUrl: c.pageUrl,
    llmSnippet: c.llmSnippet ?? c.gap,
    citedBy: c.citedBy ?? [],
    totalCitations: c.totalCitations ?? 0,
    citationRank: c.citationRank ?? (i + 1),
    sourceGaps: [c.gap],
    whyTheyWin: c.gap,
    platformSnippets: c.platformSnippets,
  }))
}



const CREATED_AT = '2026-06-11'

// ─── recommendations ────────────────────────────────────────────────────────

export const seedRecommendations: Recommendation[] = [

  // 1 — 42ce10f0-b574-4fc5-8229-0740f4e09785
  {
    id: '42ce10f0-b574-4fc5-8229-0740f4e09785',
    title: 'Update Website Information for My Family Dental Bohle Plains',
    description:
      'Inconsistent website information across third-party directories can lead potential patients to the wrong site, which may result in missed appointments, reduced confidence in the practice, and lost bookings.',
    category: 'Accuracy',
    impactLabel: 'High impact',
    effort: 'Bigger lift',
    themeId: 'business-information',
    createdAt: CREATED_AT,
    locationNames: ['Bohle Plains QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 40.0,
    expectedImpact:
      'Gemini and Perplexity will return the correct website, https://www.myfamilydentalqld.com.au/dentist-bohle-plains/, when patients search for My Family Dental Bohle Plains.',
    targetPages: [
      'https://www.healthdirect.gov.au/australian-health-services/healthcare-service/bohle-plains-4817-qld/my-family-dental-townsville/dentists/e782ad10-907e-4cdf-88d3-a903649800f0',
    ],
    whyItWorks: [
      'Inconsistent website information across third-party directories can lead potential patients to the wrong site, which may result in missed appointments, reduced confidence in the practice, and lost bookings.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('42ce10f0-b574-4fc5-8229-0740f4e09785', [
      {
        label: 'Update website URL on third-party directories',
        description: 'Ensure the correct website https://www.myfamilydentalqld.com.au/dentist-bohle-plains/ is listed on all third-party directories.',
        stepType: 'link',
        links: [
          {
            label: 'Healthdirect listing',
            url: 'https://www.healthdirect.gov.au/australian-health-services/healthcare-service/bohle-plains-4817-qld/my-family-dental-townsville/dentists/e782ad10-907e-4cdf-88d3-a903649800f0',
          },
        ],
      },
    ]),
  },

  // 2 — 21237f8c-bad0-44f8-bad0-0f5e99d7e3c1
  {
    id: '21237f8c-bad0-44f8-bad0-0f5e99d7e3c1',
    title: 'Update Hours of Operation for My Family Dental Ingham',
    description:
      'Inconsistent hours of operation across AI platforms can create confusion for potential patients, may result in missed appointments, lost bookings, and reduced confidence in the practice when patients arrive to find the clinic open or closed contrary to what they were told.',
    category: 'Accuracy',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'business-information',
    createdAt: CREATED_AT,
    locationNames: ['Ingham QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 60.0,
    expectedImpact:
      'ChatGPT, Gemini, and Perplexity will return the correct hours of 8:30 AM - 5:00 PM, Monday through Sunday, for My Family Dental Ingham.',
    targetPages: [
      'https://www.myfamilydentalqld.com.au/contact-us/',
    ],
    whyItWorks: [
      'Inconsistent hours of operation across AI platforms can create confusion for potential patients, may result in missed appointments, lost bookings, and reduced confidence in the practice when patients arrive to find the clinic open or closed contrary to what they were told.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('21237f8c-bad0-44f8-bad0-0f5e99d7e3c1', [
      {
        label: 'Update hours of operation to 8:30 AM - 5:00 PM, Monday through Sunday',
        description: 'Ensure hours are consistent across your website contact page and all AI-visible directory listings.',
        stepType: 'nap',
        napData: {
          name: 'My Family Dental Ingham',
          address: 'Ingham QLD',
          phone: '',
        },
      },
    ]),
  },

  // 3 — 255a9e6f-867b-4484-a54c-299a8916e51a
  {
    id: '255a9e6f-867b-4484-a54c-299a8916e51a',
    title: 'Add Schema Markup for Teeth Whitening at My Family Dental Townsville, Kirwan',
    description:
      'Potential patients asking AI assistants for teeth whitening providers are rarely being shown My Family Dental Townsville, which can result in missed enquiries, fewer booked appointments, and competitors capturing high-intent local referrals that should be reaching the practice.',
    category: 'Technical SEO',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'teeth-whitening',
    createdAt: CREATED_AT,
    locationNames: ['Kirwan QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 7.41,
    compScore: 11.11,
    expectedImpact:
      'After adding structured data markup to the teeth whitening page, My Family Dental Townsville will be more likely to appear in AI responses when potential patients search for teeth whitening services in the local area.',
    targetPages: [
      'https://myfamilydentalqld.com.au/teeth-whitening-service',
    ],
    whyItWorks: [
      'Potential patients asking AI assistants for teeth whitening providers are rarely being shown My Family Dental Townsville, which can result in missed enquiries, fewer booked appointments, and competitors capturing high-intent local referrals that should be reaching the practice.',
    ],
    competitors: makeCompetitors([
      {
        name: 'National Dental Care Townsville',
        pageUrl: 'https://www.nationaldentalcare.com.au/townsville/teeth-whitening',
        llmSnippet: 'Comprehensive dental services in Townsville including professional teeth whitening. Book online with our experienced Townsville dental team...',
        gap: 'High citation share across ChatGPT and Gemini for teeth whitening queries.',
        totalCitations: 6, citationRank: 1,
      },
      {
        name: 'Absolutely Dental @ Kirwan Plaza',
        pageUrl: 'https://www.absolutelydental.com.au/',
        llmSnippet: 'Cosmetic and general dentistry in Kirwan, Townsville. Specialising in professional teeth whitening and complete smile makeover treatments...',
        gap: 'Strong presence on Perplexity and Claude for local whitening searches.',
        totalCitations: 5, citationRank: 2,
      },
      {
        name: 'Dental Balance NQ',
        pageUrl: 'https://dentalbalance.com.au/',
        llmSnippet: 'Family and cosmetic dentistry in North Queensland offering in-chair and take-home teeth whitening solutions for a brighter smile...',
        gap: 'Frequently cited alongside National Dental Care for whitening queries.',
        totalCitations: 4, citationRank: 3,
      },
    ]),
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('255a9e6f-867b-4484-a54c-299a8916e51a', [
      {
        label: 'Add structured data markup to the teeth whitening page',
        description: 'Implement DentistService schema markup on the teeth whitening page to improve AI assistant citation likelihood.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/teeth-whitening-service',
      },
    ]),
  },

  // 4 — a1b2c3d4-e5f6-7890-abcd-ef1234567890
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Update Website Information for My Family Dental Ingham',
    description:
      'Inconsistent website information across AI platforms can create confusion for potential patients, may result in failed visits to dead URLs, lost appointment bookings, and reduced confidence in the practice.',
    category: 'Accuracy',
    impactLabel: 'High impact',
    effort: 'Bigger lift',
    themeId: 'business-information',
    createdAt: CREATED_AT,
    locationNames: ['Ingham QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 60,
    expectedImpact:
      'Gemini and Perplexity will return the correct website https://www.myfamilydentalqld.com.au/dentist-ingham/ when potential patients ask about My Family Dental Ingham.',
    targetPages: [
      'https://www.healthdirect.gov.au/australian-health-services/search/ingham-4850-qld/dentists/310144008',
    ],
    whyItWorks: [
      'Inconsistent website information across AI platforms can create confusion for potential patients, may result in failed visits to dead URLs, lost appointment bookings, and reduced confidence in the practice.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('a1b2c3d4-e5f6-7890-abcd-ef1234567890', [
      {
        label: 'Fix your listing on AI-cited sources with the wrong website',
        description: 'Update the website URL to https://www.myfamilydentalqld.com.au/dentist-ingham/ on each directory AI assistants are citing.',
        stepType: 'link',
        links: [
          {
            label: 'Healthdirect listing',
            url: 'https://www.healthdirect.gov.au/australian-health-services/search/ingham-4850-qld/dentists/310144008',
          },
        ],
      },
      {
        label: 'Verify AI assistants return the correct website',
        description: 'After 30–60 days, confirm that Gemini and Perplexity return the correct website when customers search for My Family Dental Ingham.',
        stepType: 'task',
        targetPage: 'https://www.myfamilydentalqld.com.au/dentist-ingham/',
      },
    ]),
  },

  // 5 — b2c3d4e5-f6a7-8901-bcde-f12345678901
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    title: 'Update Teeth Whitening Content for My Family Dental Townsville, Kirwan',
    description:
      'Potential patients asking AI assistants about teeth whitening near Kirwan are not seeing My Family Dental Townsville in the answers. This can result in missed enquiries, fewer booked appointments, and competitors capturing local demand that should reach the practice.',
    category: 'Content',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'teeth-whitening',
    createdAt: CREATED_AT,
    locationNames: ['Kirwan QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 7.41,
    compScore: 11.1,
    expectedImpact:
      'After fixing the existing page, My Family Dental Townsville will be more likely to appear in AI-assistant answers about teeth whitening for the Kirwan area.',
    targetPages: [
      'https://myfamilydentalqld.com.au/teeth-whitening-service',
    ],
    whyItWorks: [
      'Potential patients asking AI assistants about teeth whitening near Kirwan are not seeing My Family Dental Townsville in the answers. This can result in missed enquiries, fewer booked appointments, and competitors capturing local demand that should reach the practice.',
    ],
    competitors: makeCompetitors([
      {
        name: 'National Dental Care Townsville',
        pageUrl: 'https://www.nationaldentalcare.com.au/townsville/teeth-whitening',
        llmSnippet: 'Comprehensive dental services in Townsville including professional teeth whitening. Book online with our experienced Townsville dental team...',
        gap: 'High citation share across ChatGPT and Gemini for teeth whitening queries.',
        totalCitations: 6, citationRank: 1,
      },
      {
        name: 'Absolutely Dental @ Kirwan Plaza',
        pageUrl: 'https://www.absolutelydental.com.au/',
        llmSnippet: 'Cosmetic and general dentistry in Kirwan, Townsville. Specialising in professional teeth whitening and complete smile makeover treatments...',
        gap: 'Strong presence on Perplexity and Claude for local whitening searches.',
        totalCitations: 5, citationRank: 2,
      },
      {
        name: 'Dental Balance NQ',
        pageUrl: 'https://dentalbalance.com.au/',
        llmSnippet: 'Family and cosmetic dentistry in North Queensland offering in-chair and take-home teeth whitening solutions for a brighter smile...',
        gap: 'Frequently cited alongside National Dental Care for whitening queries.',
        totalCitations: 4, citationRank: 3,
      },
    ]),
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('b2c3d4e5-f6a7-8901-bcde-f12345678901', [
      {
        label: 'Review and update the teeth whitening service page',
        description: 'Ensure https://myfamilydentalqld.com.au/teeth-whitening-service includes specific service details for teeth whitening and a direct call to action.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/teeth-whitening-service',
      },
      {
        label: 'Submit the page for reindexing in Google Search Console',
        description: 'Once changes are published, submit https://myfamilydentalqld.com.au/teeth-whitening-service for reindexing so search engines discover the updated content.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/teeth-whitening-service',
      },
    ]),
  },

  {
    id: 'c3d4e5f6-b2c3-1234-cdef-teeth-whitening2',
    title: 'Update Teeth Whitening Content for My Family Dental Townsville, Kirwan',
    description:
      'Potential patients asking AI assistants about teeth whitening near Kirwan are not seeing My Family Dental Townsville in the answers. This can result in missed enquiries, fewer booked appointments, and competitors capturing local demand that should reach the practice.',
    category: 'Content',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'teeth-whitening',
    createdAt: CREATED_AT,
    locationNames: ['Kirwan QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 7.41,
    compScore: 11.1,
    expectedImpact:
      'After fixing the existing page, My Family Dental Townsville will be more likely to appear in AI-assistant answers about teeth whitening for the Kirwan area.',
    targetPages: [
      'https://myfamilydentalqld.com.au/teeth-whitening-service',
    ],
    whyItWorks: [
      'Potential patients asking AI assistants about teeth whitening near Kirwan are not seeing My Family Dental Townsville in the answers. This can result in missed enquiries, fewer booked appointments, and competitors capturing local demand that should reach the practice.',
    ],
    competitors: makeCompetitors([
      {
        name: 'National Dental Care Townsville',
        pageUrl: 'https://www.nationaldentalcare.com.au/townsville/teeth-whitening',
        llmSnippet: 'Comprehensive dental services in Townsville including professional teeth whitening. Book online with our experienced Townsville dental team...',
        gap: 'High citation share across ChatGPT and Gemini for teeth whitening queries.',
        totalCitations: 6, citationRank: 1,
      },
      {
        name: 'Absolutely Dental @ Kirwan Plaza',
        pageUrl: 'https://www.absolutelydental.com.au/',
        llmSnippet: 'Cosmetic and general dentistry in Kirwan, Townsville. Specialising in professional teeth whitening and complete smile makeover treatments...',
        gap: 'Strong presence on Perplexity and Claude for local whitening searches.',
        totalCitations: 5, citationRank: 2,
      },
      {
        name: 'Dental Balance NQ',
        pageUrl: 'https://dentalbalance.com.au/',
        llmSnippet: 'Family and cosmetic dentistry in North Queensland offering in-chair and take-home teeth whitening solutions for a brighter smile...',
        gap: 'Frequently cited alongside National Dental Care for whitening queries.',
        totalCitations: 4, citationRank: 3,
      },
    ]),
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('c3d4e5f6-b2c3-1234-cdef-teeth-whitening2', [
      {
        label: 'Review and update the teeth whitening service page',
        description: 'Ensure https://myfamilydentalqld.com.au/teeth-whitening-service includes specific service details for teeth whitening and a direct call to action.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/teeth-whitening-service',
      },
      {
        label: 'Submit the page for reindexing in Google Search Console',
        description: 'Once changes are published, submit https://myfamilydentalqld.com.au/teeth-whitening-service for reindexing so search engines discover the updated content.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/teeth-whitening-service',
      },
    ]),
  },

  // 6 — 43d87f49-4a5b-45c8-b656-d70276b5b068
  {
    id: '43d87f49-4a5b-45c8-b656-d70276b5b068',
    title: 'Optimize Dental Implants Page for My Family Dental Bowen',
    description:
      'Potential patients asking AI assistants about dental implants in Bowen are mostly being pointed to a competitor. This can result in fewer consultation enquiries, missed treatment bookings, and bowendental.com.au capturing referrals that should belong to My Family Dental Bowen.',
    category: 'Content',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'dental-implants',
    createdAt: CREATED_AT,
    locationNames: ['Bowen QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 11.76,
    compScore: 14.71,
    expectedImpact:
      'After improving the page structure and content on the existing dental implants page, My Family Dental Bowen will be more likely to appear in AI responses for dental implants queries in the Bowen area.',
    targetPages: [
      'https://myfamilydentalqld.com.au/all-on-4-dental-implants',
    ],
    whyItWorks: [
      'Potential patients asking AI assistants about dental implants in Bowen are mostly being pointed to a competitor. This can result in fewer consultation enquiries, missed treatment bookings, and bowendental.com.au capturing referrals that should belong to My Family Dental Bowen.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('43d87f49-4a5b-45c8-b656-d70276b5b068', [
      {
        label: 'Improve page structure and content on the dental implants page',
        description: 'Enhance headings, copy clarity, and local relevance signals on the dental implants page to improve AI citation likelihood in Bowen area searches.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/all-on-4-dental-implants',
      },
    ]),
  },

  // 7 — 51116426-c80c-4821-aeae-2ab63e296139
  {
    id: '51116426-c80c-4821-aeae-2ab63e296139',
    title: 'Update Wisdom Teeth Removal Content for My Family Dental Bowen',
    description:
      'Potential patients researching wisdom teeth removal near Bowen are rarely seeing My Family Dental Bowen in AI assistant answers, which can result in missed enquiries, fewer consultation bookings, and competing clinics capturing the local referral.',
    category: 'Content',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'wisdom-teeth-removal',
    createdAt: CREATED_AT,
    locationNames: ['Bowen QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 12.12,
    compScore: 15.15,
    expectedImpact:
      'After fixing the existing page, My Family Dental Bowen will be more likely to be cited by AI assistants when potential patients ask about wisdom teeth removal in the Bowen area.',
    targetPages: [
      'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
    ],
    whyItWorks: [
      'Potential patients researching wisdom teeth removal near Bowen are rarely seeing My Family Dental Bowen in AI assistant answers, which can result in missed enquiries, fewer consultation bookings, and competing clinics capturing the local referral.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('51116426-c80c-4821-aeae-2ab63e296139', [
      {
        label: 'Update and improve wisdom teeth removal page content',
        description: 'Revise the wisdom teeth removal page to include stronger local relevance signals and clearer service descriptions for the Bowen area.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
    ]),
  },

  // 8 — 5c20c648-e660-4d05-9f3f-ab16ca2d5365
  {
    id: '5c20c648-e660-4d05-9f3f-ab16ca2d5365',
    title: 'Add Schema Markup for Wisdom Teeth Removal at My Family Dental Bowen',
    description:
      'Potential patients searching for wisdom teeth removal specialists nearby are unlikely to see My Family Dental Bowen surfaced, which can result in fewer enquiries, missed consultations, and competitor clinics receiving the referral instead.',
    category: 'Technical SEO',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'wisdom-teeth-removal',
    createdAt: CREATED_AT,
    locationNames: ['Bowen QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 12.12,
    compScore: 15.15,
    expectedImpact:
      'After adding structured data markup, the wisdom teeth removal page for My Family Dental Bowen will be more likely to appear in AI-generated answers for location-based queries.',
    targetPages: [
      'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
    ],
    whyItWorks: [
      'Potential patients searching for wisdom teeth removal specialists nearby are unlikely to see My Family Dental Bowen surfaced, which can result in fewer enquiries, missed consultations, and competitor clinics receiving the referral instead.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('5c20c648-e660-4d05-9f3f-ab16ca2d5365', [
      {
        label: 'Add structured data markup to wisdom teeth removal page',
        description: 'Implement DentistService schema markup on the wisdom teeth removal page to improve AI assistant citation likelihood for Bowen area searches.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
    ]),
  },

  // 9 — 5f3dbd85-4ba7-4fa0-bb2e-365256e93768
  {
    id: '5f3dbd85-4ba7-4fa0-bb2e-365256e93768',
    title: 'Update Hours of Operation for My Family Dental Innisfail',
    description:
      'Inconsistent hours data across AI platforms can mislead potential patients into thinking the practice is closed on weekends, which may result in missed appointments, lost bookings, and reduced confidence in the practice\'s reliability.',
    category: 'Accuracy',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'business-information',
    createdAt: CREATED_AT,
    locationNames: ['Innisfail QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 66.7,
    expectedImpact:
      'ChatGPT, Gemini, and Perplexity will return the correct seven-day hours of 8:00 AM to 5:00 PM for My Family Dental Innisfail.',
    targetPages: [
      'https://www.myfamilydentalqld.com.au/dentist-innisfail/',
    ],
    whyItWorks: [
      'Inconsistent hours data across AI platforms can mislead potential patients into thinking the practice is closed on weekends, which may result in missed appointments, lost bookings, and reduced confidence in the practice\'s reliability.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('5f3dbd85-4ba7-4fa0-bb2e-365256e93768', [
      {
        label: 'Update hours to 8:00 AM - 5:00 PM, seven days a week',
        description: 'Ensure the Innisfail location page and all directory listings reflect consistent seven-day opening hours.',
        stepType: 'nap',
        napData: {
          name: 'My Family Dental Innisfail',
          address: 'Innisfail QLD',
          phone: '',
        },
      },
    ]),
  },

  // 10 — 78be1521-2cca-4b21-b85c-e293c52209d8
  {
    id: '78be1521-2cca-4b21-b85c-e293c52209d8',
    title: 'Expand Wisdom Teeth Removal Listings for My Family Dental Townsville, Kirwan',
    description:
      'Potential patients asking AI assistants about wisdom teeth removal in Townsville are not seeing My Family Dental Townsville at all, which can result in missed consultations, lost enquiries, and referrals flowing to competitors like townsvilledental.clinic instead.',
    category: 'Outreach',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'wisdom-teeth-removal',
    createdAt: CREATED_AT,
    locationNames: ['Kirwan QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 5.71,
    compScore: 14.29,
    expectedImpact:
      'After updating directory and listing profiles, My Family Dental Townsville will be more likely to appear in AI responses about wisdom teeth removal.',
    targetPages: [
      'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
    ],
    whyItWorks: [
      'Potential patients asking AI assistants about wisdom teeth removal in Townsville are not seeing My Family Dental Townsville at all, which can result in missed consultations, lost enquiries, and referrals flowing to competitors like townsvilledental.clinic instead.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('78be1521-2cca-4b21-b85c-e293c52209d8', [
      {
        label: 'Update directory and listing profiles for wisdom teeth removal',
        description: 'Add or update the wisdom teeth removal service to directory and listing profiles to improve AI assistant citation coverage in Townsville.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
    ]),
  },

  // 11 — c664d613-c625-4c81-851a-b1e0190f8556
  {
    id: 'c664d613-c625-4c81-851a-b1e0190f8556',
    title: 'Optimize Tooth Extraction Page for My Family Dental Bowen',
    description:
      'Potential patients asking AI assistants about tooth extraction are routinely shown bowendental.com.au rather than My Family Dental Bowen, which can result in missed enquiries, fewer booked appointments, and a steady flow of local referrals going to the competitor.',
    category: 'Content',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'tooth-extraction',
    createdAt: CREATED_AT,
    locationNames: ['Bowen QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 10.53,
    compScore: 15.79,
    expectedImpact:
      'After improving the page structure and content, the My Family Dental Bowen tooth extraction page will be more likely to be cited by AI assistants answering questions about tooth extraction.',
    targetPages: [
      'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
    ],
    whyItWorks: [
      'Potential patients asking AI assistants about tooth extraction are routinely shown bowendental.com.au rather than My Family Dental Bowen, which can result in missed enquiries, fewer booked appointments, and a steady flow of local referrals going to the competitor.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('c664d613-c625-4c81-851a-b1e0190f8556', [
      {
        label: 'Improve page structure and content for tooth extraction',
        description: 'Enhance the tooth extraction content with stronger local relevance signals and clearer service descriptions to outrank bowendental.com.au in AI responses.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
    ]),
  },

  // 12 — d27b179e-611c-45f7-a9ed-f156c9e8ad88
  {
    id: 'd27b179e-611c-45f7-a9ed-f156c9e8ad88',
    title: 'Update Hours of Operation for My Family Dental Bowen',
    description:
      'Inconsistent business hours across AI platforms can create confusion for potential patients, may result in missed weekend appointments, lost bookings, and reduced trust in the practice\'s availability information.',
    category: 'Accuracy',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'business-information',
    createdAt: CREATED_AT,
    locationNames: ['Bowen QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 70.0,
    expectedImpact:
      'ChatGPT and Perplexity will return the correct seven-day 8:30 AM - 5:00 PM hours of operation for My Family Dental Bowen.',
    targetPages: [
      'https://www.myfamilydentalqld.com.au/dr-barry-john-doran/',
    ],
    whyItWorks: [
      'Inconsistent business hours across AI platforms can create confusion for potential patients, may result in missed weekend appointments, lost bookings, and reduced trust in the practice\'s availability information.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('d27b179e-611c-45f7-a9ed-f156c9e8ad88', [
      {
        label: 'Update hours to 8:30 AM - 5:00 PM, seven days a week',
        description: 'Ensure consistent seven-day hours are reflected across the Bowen location page and all AI-visible directories.',
        stepType: 'nap',
        napData: {
          name: 'My Family Dental Bowen',
          address: 'Bowen QLD',
          phone: '',
        },
      },
    ]),
  },

  // 13 — c3d4e5f6-a7b8-9012-cdef-123456789012
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    title: 'Add Schema Markup for Wisdom Teeth Removal at My Family Dental Bowen',
    description:
      'Potential patients searching for wisdom teeth removal are being pointed to nearby competitors instead of My Family Dental Bowen. This can result in missed appointment bookings, fewer enquiries, and referrals flowing to rival clinics in the same area.',
    category: 'Technical SEO',
    impactLabel: 'Medium impact',
    effort: 'Bigger lift',
    themeId: 'wisdom-teeth-removal',
    createdAt: CREATED_AT,
    locationNames: ['Bowen QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 12.12,
    compScore: 15.2,
    expectedImpact:
      'After adding structured data markup, the wisdom teeth removal page for My Family Dental Bowen will be more likely to appear in AI-generated answers about local providers.',
    targetPages: [
      'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
    ],
    whyItWorks: [
      'Potential patients searching for wisdom teeth removal are being pointed to nearby competitors instead of My Family Dental Bowen. This can result in missed appointment bookings, fewer enquiries, and referrals flowing to rival clinics in the same area.',
    ],
    competitors: makeCompetitors([
      {
        name: 'Bowendental',
        gap: "Covers the 'how will i know if my wisdom teeth need extracting?' topic not found on your pages.",
        totalCitations: 5,
        citationRank: 1,
      },
    ]),
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('c3d4e5f6-a7b8-9012-cdef-123456789012', [
      {
        label: 'Add LocalBusiness structured data markup to the wisdom teeth removal page',
        description: 'Ask your web developer to add LocalBusiness schema with name, address, phone, hours, and geo coordinates to https://myfamilydentalqld.com.au/wisdom-teeth-removal.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
      {
        label: 'Validate the markup and request reindexing',
        description: 'Validate the structured data using a testing tool, then request reindexing through Google Search Console.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
      {
        label: 'Confirm values match your primary business profiles',
        description: 'Ensure name, address, phone, and hours in the markup exactly match what appears on your primary business profiles and directory listings — inconsistencies weaken trust signals.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
    ]),
  },

  // 14 — dd3c8852-ca3a-4804-bf43-8a33e458546c
  {
    id: 'dd3c8852-ca3a-4804-bf43-8a33e458546c',
    title: 'Optimize Teeth Whitening Page for My Family Dental Townsville, Kirwan',
    description:
      'Potential patients using ChatGPT to find teeth whitening providers are largely not seeing My Family Dental Townsville, while competitors are. This gap can result in fewer enquiries, missed bookings, and referrals going to other practices.',
    category: 'Content',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'teeth-whitening',
    createdAt: CREATED_AT,
    locationNames: ['Kirwan QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 30.6,
    compScore: 83.3,
    expectedImpact:
      'After improving the page structure and content, the teeth whitening page for My Family Dental Townsville will be more likely to appear consistently across ChatGPT alongside its existing strong performance on Gemini and Perplexity.',
    targetPages: [
      'https://myfamilydentalqld.com.au/teeth-whitening-service',
    ],
    whyItWorks: [
      'Potential patients using ChatGPT to find teeth whitening providers are largely not seeing My Family Dental Townsville, while competitors are. This gap can result in fewer enquiries, missed bookings, and referrals going to other practices.',
    ],
    competitors: makeCompetitors([
      {
        name: 'National Dental Care Townsville',
        pageUrl: 'https://www.nationaldentalcare.com.au/townsville/teeth-whitening',
        llmSnippet: 'Comprehensive dental services in Townsville including professional teeth whitening. Book online with our experienced Townsville dental team...',
        gap: 'High citation share across ChatGPT and Gemini for teeth whitening queries.',
        totalCitations: 6, citationRank: 1,
      },
      {
        name: 'Absolutely Dental @ Kirwan Plaza',
        pageUrl: 'https://www.absolutelydental.com.au/',
        llmSnippet: 'Cosmetic and general dentistry in Kirwan, Townsville. Specialising in professional teeth whitening and complete smile makeover treatments...',
        gap: 'Strong presence on Perplexity and Claude for local whitening searches.',
        totalCitations: 5, citationRank: 2,
      },
      {
        name: 'Dental Balance NQ',
        pageUrl: 'https://dentalbalance.com.au/',
        llmSnippet: 'Family and cosmetic dentistry in North Queensland offering in-chair and take-home teeth whitening solutions for a brighter smile...',
        gap: 'Frequently cited alongside National Dental Care for whitening queries.',
        totalCitations: 4, citationRank: 3,
      },
    ]),
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('dd3c8852-ca3a-4804-bf43-8a33e458546c', [
      {
        label: 'Improve page structure and content on the teeth whitening page',
        description: 'Enhance headings, copy clarity, and local relevance signals on the teeth whitening page to improve ChatGPT citation likelihood.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/teeth-whitening-service',
      },
    ]),
  },

  // 15 — ea8dd501-24fc-4e00-9591-64642771f3c0
  {
    id: 'ea8dd501-24fc-4e00-9591-64642771f3c0',
    title: 'Update Hours of Operation for My Family Dental Emerald',
    description:
      'Inconsistent hours of operation across AI platforms can create confusion for potential patients, may result in missed appointments, wasted trips to a closed practice, and reduced confidence in the information they find about your business.',
    category: 'Accuracy',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'business-information',
    createdAt: CREATED_AT,
    locationNames: ['Emerald QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 53.3,
    expectedImpact:
      'ChatGPT, Gemini, and Perplexity will return the correct hours of 8:00 AM - 5:00 PM, Monday through Sunday, for My Family Dental Emerald.',
    targetPages: [
      'https://www.myfamilydentalqld.com.au/contact-us/',
    ],
    whyItWorks: [
      'Inconsistent hours of operation across AI platforms can create confusion for potential patients, may result in missed appointments, wasted trips to a closed practice, and reduced confidence in the information they find about your business.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('ea8dd501-24fc-4e00-9591-64642771f3c0', [
      {
        label: 'Update hours to 8:00 AM - 5:00 PM, Monday through Sunday',
        description: 'Ensure consistent seven-day hours are reflected across the Emerald location page and all AI-visible directories.',
        stepType: 'nap',
        napData: {
          name: 'My Family Dental Emerald',
          address: 'Emerald QLD',
          phone: '',
        },
      },
    ]),
  },

  // 16 — ee21418d-3eec-4eb2-8bbc-88239675f032
  {
    id: 'ee21418d-3eec-4eb2-8bbc-88239675f032',
    title: 'Earn External Coverage for Wisdom Teeth Removal — My Family Dental Bowen',
    description:
      'Potential patients researching wisdom teeth removal through AI assistants are not seeing My Family Dental Bowen on the directories and listicles that drive citations. This can result in missed enquiries, fewer consultation bookings, and referrals flowing to competitors instead.',
    category: 'Outreach',
    impactLabel: 'Medium impact',
    effort: 'Medium',
    themeId: 'wisdom-teeth-removal',
    createdAt: CREATED_AT,
    locationNames: ['Bowen QLD'],
    locations: 1,
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    youScore: 12.12,
    compScore: 15.15,
    expectedImpact:
      'My Family Dental Bowen will be more likely to appear in AI assistant answers about wisdom teeth removal as earning mentions on third-party platforms begins to register across the citation sources AI assistants reference.',
    targetPages: [
      'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
    ],
    whyItWorks: [
      'Potential patients researching wisdom teeth removal through AI assistants are not seeing My Family Dental Bowen on the directories and listicles that drive citations. This can result in missed enquiries, fewer consultation bookings, and referrals flowing to competitors instead.',
    ],
    competitors: [],
    sources: [],
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: { platforms: [], summary: '' },
    generatedAsset: null,
    checklist: makeChecklist('ee21418d-3eec-4eb2-8bbc-88239675f032', [
      {
        label: 'Earn mentions on third-party directories and listicles',
        description: 'Submit or claim listings on dental directories and health listicles that AI assistants reference when answering wisdom teeth removal queries in the Bowen area.',
        stepType: 'task',
        targetPage: 'https://myfamilydentalqld.com.au/wisdom-teeth-removal',
      },
    ]),
  },

]
