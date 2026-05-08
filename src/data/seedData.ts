import type { BusinessMetrics, ChecklistStep, Competitor, CompetitorPlatformSnippet, LLMPlatform, Recommendation, SourceReference } from '../types'

export const seedBusiness = {
  name: 'Raine & Horne Dubbo',
  location: 'Dubbo, NSW',
}

export const seedMetrics: BusinessMetrics = {
  searchAiScore: 54,
  scoreTrend: 2,
  visibility: 48,
  citationShare: 62,
  rank: 3,
  sentiment: 71,
  youCitations: 13,
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

function makeSources(
  refs: { title: string; source: string; snippet: string }[],
  targetPage: string,
): SourceReference[] {
  return refs.map(r => ({
    platform: r.source,
    competitorName: r.title,
    url: targetPage,
    snippet: r.snippet,
    referencedInAnswers: 0,
  }))
}

const CREATED_AT = '2025-03-15'
const LOCATION_NAMES = ['Dubbo', 'NSW']

// ─── recommendations ────────────────────────────────────────────────────────

export const seedRecommendations: Recommendation[] = [
  // location counts by scope:
  //   brand/website-wide → 20 | moderately broad → 8–15 | niche/specific → 2–7

  // 1 — 69de016e9c10756b6b61329f
  {
    id: '69de016e9c10756b6b61329f',
    title: 'Win More Dubbo Searches with Local Market Content',
    description:
      'Your perfect 5.0 rating from 457 reviews shows buyers and sellers trust you, but you\'re missing opportunities to capture local search traffic. Publishing regular Dubbo market updates and suburb guides will help more people find you when researching property in your area. This positions your 40+ years of local expertise front and center, turning searches into enquiries.',
    category: 'Content',
    impactLabel: 'High impact',
    effort: 'Medium',
    themeId: 'residential-property-sales',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 20, // brand/website-wide
    tags: ['Content', 'Content Boost'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Publish monthly market updates and guides',
    youScore: 11.0,
    compScore: 83.3,
    expectedImpact:
      'Creating Dubbo-focused content will significantly increase your organic search visibility, bringing more qualified buyers and sellers to your website. Each suburb guide and market update becomes a lead generation asset that works 24/7, pre-qualifying prospects before they call.',
    keyInsights: [
      'Despite 457 five-star reviews, your digital presence doesn\'t reflect your market dominance',
      'Local property searches are high-intent moments where buyers and sellers choose their agent',
    ],
    swotDrivers: [
      'Leverage 40+ years of established market presence since 1982',
      'Convert top national rankings into local digital dominance',
    ],
    competitorsInsight: [
      'Competitors capture local search traffic with basic market updates despite inferior reviews',
      'Your absence in content marketing lets newer agencies appear more digitally savvy',
    ],
    targetPages: [
      'https://raineandhorne.com.au/dubbo-market-updates',
      'https://raineandhorne.com.au/suburb-guides-dubbo',
    ],
    whyItWorks: [
      'Buyers and sellers actively search for Dubbo market insights but can\'t find them on your site',
      'Your competitors rank for these searches while you miss out on qualified leads',
      'Content gaps mean Google shows competitors instead of your proven local expertise',
    ],
    competitors: makeCompetitors([
      {
        name: 'Elders Real Estate Dubbo',
        pageUrl: 'https://dubbo.eldersrealestate.com.au/',
        gap: 'Publishes monthly Dubbo market reports and suburb guides that consistently rank for local search queries',
        totalCitations: 47,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'],
        llmSnippet: 'Elders Real Estate Dubbo regularly publishes detailed quarterly market reports and suburb-specific guides, making them a go-to source for Dubbo property market insights online.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Best real estate agent in Dubbo for local market insights', snippet: 'Elders Real Estate Dubbo is frequently recommended for their comprehensive market reports covering median prices, days on market, and suburb-level data for the Dubbo region.' },
          { platform: 'Gemini',  prompt: 'Who publishes the best Dubbo property market updates', snippet: 'Elders Estate Agents Dubbo regularly publishes suburb-specific market analysis and quarterly property reports, ranking prominently for Dubbo real estate content.' },
          { platform: 'Perplexity', prompt: 'Dubbo property market trends 2024', snippet: 'According to Elders Dubbo\'s latest market report, the median house price in Dubbo has risen 4.2% year-on-year, driven by strong demand from regional relocators.' },
        ],
      },
      {
        name: 'Ray White Dubbo',
        pageUrl: 'https://www.raywhite.com/dubbo',
        gap: 'Suburb guides and sold property pages capture local search traffic ahead of R&H Dubbo',
        totalCitations: 32,
        citationRank: 2,
        citedBy: ['ChatGPT', 'Gemini'],
        llmSnippet: 'Ray White Dubbo maintains active suburb guides and a sold property gallery that help buyers and sellers understand the local market before choosing an agent.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Real estate agencies in Dubbo with local market data', snippet: 'Ray White Dubbo stands out for their regularly updated suburb guides and sold results pages, which provide strong local market context for buyers and sellers.' },
          { platform: 'Gemini',  prompt: 'Dubbo sold property results', snippet: 'Ray White Dubbo publishes a detailed sold results gallery with suburb filters, helping sellers benchmark their property against recent local sales.' },
        ],
      },
      {
        name: 'PRD Nationwide Dubbo',
        gap: 'Consistent blog content and market commentary positions PRD as a digital thought leader in Dubbo',
        totalCitations: 19,
        citationRank: 3,
        citedBy: ['Perplexity'],
        llmSnippet: 'PRD Nationwide Dubbo publishes regular market commentary and investor-focused reports that are frequently surfaced by AI search tools when people ask about Dubbo property trends.',
        platformSnippets: [
          { platform: 'Perplexity', prompt: 'Dubbo property investment outlook', snippet: 'PRD Nationwide\'s Dubbo office regularly releases investor-focused market reports covering rental yields, vacancy rates, and capital growth forecasts for the region.' },
        ],
      },
      {
        name: 'LJ Hooker Dubbo',
        gap: 'FAQ pages on their website are indexed by Gemini and surface for common buyer and seller questions',
        totalCitations: 11,
        citationRank: 4,
        citedBy: ['Gemini'],
        llmSnippet: 'LJ Hooker Dubbo\'s website includes comprehensive FAQ sections for buyers and sellers that Gemini frequently cites when answering common Dubbo real estate questions.',
        platformSnippets: [
          { platform: 'Gemini', prompt: 'What to look for when buying a house in Dubbo', snippet: 'LJ Hooker Dubbo provides a helpful buyer\'s guide on their website covering property inspections, conveyancing, and what to look for in the Dubbo market.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Local Content Impact Analysis',
          source: 'gemini',
          snippet: 'Mixed sentiment data suggests strong local reputation but limited digital content presence',
        },
        {
          title: 'Market Search Behavior Study',
          source: 'perplexity',
          snippet: 'Buyers and sellers actively search for local market updates and suburb insights before choosing agents',
        },
      ],
      'https://raineandhorne.com.au/dubbo-market-updates',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'Sentiment is mixed: strong praise exists, but some sources say public data is thin. The site lacks consistent Dubbo-specific updates and guides.',
    },
    generatedAsset: null,
    aeoScore: {
      you: 95,
      competitor: 85,
      subScores: [
        { name: 'Readability',             weight: 10.2, you: 91, competitor: 70, delta: 21 },
        { name: 'Content freshness',       weight: 16.3, you: 90, competitor: 80, delta: 10 },
        { name: 'Click-through structure', weight:  8.5, you: 97, competitor: 84, delta: 13 },
        { name: 'Information density',     weight: 30.5, you: 91, competitor: 78, delta: 13 },
        { name: 'Machine readability',     weight: 11.5, you: 97, competitor: 72, delta: 25 },
        { name: 'Answerability signals',   weight: 22.9, you: 94, competitor: 78, delta: 16 },
      ],
    },
    checklist: makeChecklist('69de016e9c10756b6b61329f', [
      {
        label: 'Pick a publishing rhythm',
        description: 'Decide how often you\'ll publish — once a month is a solid start. Block an hour in your calendar for it so it actually happens, rather than becoming a "we should do this" task.',
        stepType: 'task',
      },
      {
        label: 'Write your first Dubbo suburb guide',
        description: 'Pick one suburb you know well — Glenfield Park, South Dubbo, wherever you sell most. Cover what it\'s like to live there, recent price trends, and who it\'s best for. 400–600 words is plenty.',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au/dubbo-market-updates',
      },
      {
        label: 'Add a free appraisal button to every guide',
        description: 'At the bottom of each piece of content, link to your appraisal request form. Readers who are interested enough to finish an article are exactly the people you want to capture.',
        stepType: 'task',
      },
      {
        label: 'Share it where your clients are',
        description: 'Post each guide to your Facebook page and email it to your contact list. You don\'t need a big production — copy the first paragraph, add the link, and hit send.',
        stepType: 'task',
      },
    ]),
  },

  // 2 — 69de016e9c10756b6b6132a0
  {
    id: '69de016e9c10756b6b6132a0',
    title: 'Create Dubbo Client Success Stories Hub',
    description:
      'Despite perfect 5.0 ratings from 457 reviews, your testimonials aren\'t visible enough online. Creating a dedicated Dubbo testimonials hub will showcase real client success stories, case studies, and third-party reviews in one powerful location. This trust-building asset will help convert more website visitors into enquiries.',
    category: 'Trust & Reputation',
    impactLabel: 'High impact',
    effort: 'Medium',
    themeId: 'residential-property-sales',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 20, // brand/website-wide
    tags: ['Trust & Reputation', 'Trust Boost'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Build Dubbo testimonials hub',
    youScore: 11.0,
    compScore: 83.3,
    expectedImpact:
      'A centralized proof hub will significantly increase enquiry-to-appointment conversion rates by reducing hesitation and building immediate trust. Prospects will see real Dubbo success stories, making them more confident to reach out.',
    keyInsights: [
      'You have a perfect 5.0 rating from 457 reviews but limited public visibility',
      'Specialized teams deliver high client satisfaction that isn\'t being leveraged online',
    ],
    swotDrivers: [
      'Strength: High client satisfaction and successful outcomes',
      'Weakness: Limited online reviews visibility',
    ],
    competitorsInsight: [
      'Competitors with more visible reviews appear more established even with lower ratings',
      'Agencies showcasing local success stories generate more trust and enquiries',
    ],
    targetPages: [
      'https://raineandhorne.com.au/reviews-dubbo',
      'https://raineandhorne.com.au/case-studies-dubbo',
    ],
    whyItWorks: [
      'Prospects compare agencies by reading local testimonials before choosing who to call',
      'Your excellent client satisfaction isn\'t translating into visible online proof',
      'Competitors may appear more trustworthy simply by having more visible reviews',
    ],
    competitors: makeCompetitors([
      {
        name: 'Ray White Dubbo',
        gap: 'Showcases client testimonials and case studies prominently across their website and Google profile',
        totalCitations: 38,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'],
        llmSnippet: 'Ray White Dubbo is frequently cited for their strong client testimonials and publicly visible reviews on Google and RateMyAgent, making them a trusted choice for Dubbo property sellers.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Most trusted real estate agent in Dubbo', snippet: 'Ray White Dubbo is well regarded by past clients and has a strong review presence on Google and RateMyAgent, with testimonials highlighting fast sales and strong communication.' },
          { platform: 'Gemini',  prompt: 'Real estate agent reviews Dubbo NSW', snippet: 'Ray White Dubbo appears prominently in review searches, with a dedicated testimonials section on their website and an active Google Business profile.' },
          { platform: 'Perplexity', prompt: 'Best reviewed real estate agency Dubbo', snippet: 'Ray White Dubbo consistently appears in AI responses about trusted Dubbo agents, supported by publicly visible RateMyAgent reviews and client success stories.' },
        ],
      },
      {
        name: 'Elders Real Estate Dubbo',
        gap: 'Dedicated client success stories page with specific property outcomes builds immediate seller confidence',
        totalCitations: 25,
        citationRank: 2,
        citedBy: ['Gemini', 'Perplexity'],
        llmSnippet: 'Elders Real Estate Dubbo maintains a dedicated success stories section on their website, showing specific Dubbo properties sold, prices achieved, and client quotes that AI systems surface in trust-related queries.',
        platformSnippets: [
          { platform: 'Gemini',  prompt: 'Which Dubbo real estate agents have the best track record', snippet: 'Elders Real Estate Dubbo showcases detailed client success stories on their website with specific suburb outcomes and vendor testimonials, helping them rank for agent comparison searches.' },
          { platform: 'Perplexity', prompt: 'Dubbo real estate agent success stories', snippet: 'Elders Real Estate Dubbo\'s website features client case studies detailing property challenges, marketing approaches, and results achieved — frequently cited by AI search tools.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Client Satisfaction Analysis',
          source: 'Multiple sources',
          snippet: 'Perfect 5.0 rating from 457 reviews indicates exceptional service delivery',
        },
      ],
      'https://raineandhorne.com.au/reviews-dubbo',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'Sentiment shows delighted clients, yet two sources report limited publicly visible reviews.',
    },
    generatedAsset: null,
    checklist: makeChecklist('69de016e9c10756b6b6132a0', [
      {
        label: 'Ask 5 recent clients for a quick quote',
        description: 'Reach out to clients you\'ve helped in the last 6 months. A short message — "Would you mind if I shared your feedback on our website?" — is all it takes. Most happy clients say yes.',
        stepType: 'task',
      },
      {
        label: 'Write a short story for each client',
        description: 'One paragraph per client: what they needed to do, what made their situation tricky, and what the result was. Specific details (suburb, timeframe, price achieved) make it believable and persuasive.',
        stepType: 'task',
      },
      {
        label: 'Pull in your third-party reviews',
        description: 'Your Google and RateMyAgent reviews already exist — you just need to surface them. Add a widget or embed a direct link so visitors can see them without leaving your site.',
        stepType: 'link',
        links: [
          { label: 'Your Google Business reviews', url: 'https://www.google.com/search?q=Raine+%26+Horne+Dubbo+reviews' },
          { label: 'RateMyAgent profile', url: 'https://www.ratemyagent.com.au' },
        ],
      },
      {
        label: 'Create a dedicated testimonials page',
        description: 'Put everything in one place — client quotes, case studies, and review links. This page becomes the answer when a prospect asks "why should I choose you?"',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au/reviews-dubbo',
      },
    ]),
  },

  // 3 — 69de016e9c10756b6b6132a1
  {
    id: '69de016e9c10756b6b6132a1',
    title: 'Transform Dubbo Property Management Page Into Lead Machine',
    description:
      'Your Dubbo property management page needs critical optimization to convert more landlord visitors into enquiries. By adding clear processes, response time guarantees, and prominent contact forms, you\'ll address current administration concerns while showcasing your specialized team\'s expertise.',
    category: 'Conversion',
    impactLabel: 'High impact',
    effort: 'Bigger lift',
    themeId: 'residential-property-leasing',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 8, // region-specific page
    tags: ['Conversion', 'High Impact'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Optimize PM page with processes and CTAs',
    youScore: 16.7,
    compScore: 50,
    expectedImpact:
      'Significantly increased landlord enquiries and appraisal requests by removing friction points and building trust through transparency. Clear service standards and easy contact options will convert hesitant visitors into qualified leads.',
    keyInsights: [
      'Administration issues in property management are damaging your reputation',
      'Changing consumer expectations demand transparency and speed',
      'Your specialized teams are a competitive advantage not being leveraged',
      'Simple process clarity can dramatically improve conversion rates',
    ],
    swotDrivers: [
      'Occasional complaints about administration in property management',
      'Specialized teams committed to client service',
      'Changing Consumer Expectations',
    ],
    competitorsInsight: [
      'Competitors with detailed PM processes are capturing more landlord leads',
      'Clear service standards and guarantees are becoming industry expectations',
    ],
    targetPages: [
      'https://raineandhorne.com.au/property-management-dubbo',
      'https://raineandhorne.com.au/landlords-dubbo',
    ],
    whyItWorks: [
      'Current administration complaints are costing you potential landlord clients',
      'Landlords expect clear processes and response times before choosing a property manager',
      'Your specialized PM team\'s expertise isn\'t effectively communicated online',
      'Competitors with clearer value propositions are winning your leads',
    ],
    competitors: makeCompetitors([
      {
        name: 'PPG Dubbo',
        gap: 'Dedicated PM page with clear process steps, response time guarantees, and prominent enquiry forms',
        totalCitations: 29,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Perplexity'],
        llmSnippet: 'PPG Dubbo\'s property management page clearly outlines their service process, response time commitments, and fee structure, making it the top result when landlords ask AI for Dubbo property managers.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Best property managers in Dubbo NSW', snippet: 'PPG Dubbo is frequently recommended for property management in Dubbo, with their website clearly outlining service standards, response times, and landlord FAQs.' },
          { platform: 'Perplexity', prompt: 'Property management fees Dubbo', snippet: 'PPG Dubbo provides transparent information about their property management fees and service inclusions on their website, making them a top result for landlord queries.' },
        ],
      },
      {
        name: 'Ray White Dubbo',
        gap: 'PM service page with landlord testimonials and a detailed FAQ section addressing common administration concerns',
        totalCitations: 18,
        citationRank: 2,
        citedBy: ['Gemini'],
        llmSnippet: 'Ray White Dubbo\'s property management service page includes landlord testimonials and a comprehensive FAQ addressing response times and administration processes, cited by Gemini for property management queries.',
        platformSnippets: [
          { platform: 'Gemini', prompt: 'Dubbo property management services', snippet: 'Ray White Dubbo provides clear information about their property management service, including landlord FAQs and case studies demonstrating their administration standards.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Property Management Page Optimization',
          source: 'perplexity',
          snippet: 'Clear processes and response times are critical for converting landlord enquiries',
        },
        {
          title: 'Landlord Conversion Best Practices',
          source: 'gemini',
          snippet: 'Transparency in fees and services increases trust and conversion rates',
        },
        {
          title: 'PM Service Page Elements',
          source: 'perplexity',
          snippet: 'Above-the-fold CTAs and social proof drive higher enquiry rates',
        },
      ],
      'https://raineandhorne.com.au/property-management-dubbo',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'Overall sentiment is strong, but mentions of administration issues in property management suggest clarity gaps.',
    },
    generatedAsset: null,
    checklist: makeChecklist('69de016e9c10756b6b6132a1', [
      {
        label: 'Write out your property management process in plain steps',
        description: 'Landlords want to know exactly what happens after they sign up. Write it out simply — "We do X within 24 hours, then Y, then Z." Even 5 bullet points is enough to build confidence.',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au/property-management-dubbo',
      },
      {
        label: 'Be upfront about your fees',
        description: 'A page that clearly lists what\'s included, what costs extra, and what your response guarantees are will outperform vague "contact us for pricing" every time. Transparency wins landlord trust.',
        stepType: 'task',
      },
      {
        label: 'Add a rental appraisal form above the fold',
        description: 'The most important thing a landlord should see first on your PM page is a way to get a free rental appraisal. Put the form — or a prominent button to it — before they have to scroll.',
        stepType: 'task',
      },
      {
        label: 'Add a few landlord testimonials',
        description: 'Even 2–3 quotes from happy landlords on this page make a big difference. Ask a couple of long-term clients if you can use their words. Specific details (e.g. "they found me a tenant within a week") work best.',
        stepType: 'task',
      },
    ]),
  },

  // 5 — 69de01cb9c10756b6b6132aa
  {
    id: '69de01cb9c10756b6b6132aa',
    title: 'Create Dubbo Property Appraisal Hub Page',
    description:
      'Your competitors are capturing valuable appraisal leads with dedicated local pages while your site lacks this critical conversion tool. Creating a comprehensive Dubbo property appraisal hub with online forms and clear value propositions will help you rank for high-intent searches.',
    category: 'Content',
    impactLabel: 'High impact',
    effort: 'Quick win',
    themeId: 'property-appraisals',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 12, // region-specific
    tags: ['Content', 'Content Boost'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Add appraisal hub page',
    youScore: 0,
    compScore: 75,
    expectedImpact:
      'This dedicated appraisal page will become your primary lead generation tool for property valuations. It will rank prominently in local searches, get cited by AI assistants, and provide a clear conversion path for homeowners. Expect steady growth in qualified appraisal requests within 1-2 months of launch.',
    keyInsights: [
      'Competitors present one clear destination for all appraisal requests with strong value propositions',
      'They explain benefits upfront and set clear expectations about the process',
    ],
    swotDrivers: [
      'Opportunity: Capture high-intent local searches for property appraisals',
      'Threat: Competitors already dominating this valuable lead source',
    ],
    competitorsInsight: [
      'Competitors present one clear destination to request property appraisals',
      'They explain benefits upfront and set expectations about the process',
    ],
    targetPages: ['https://raineandhorne.com.au'],
    whyItWorks: [
      'People actively search for \'free property appraisal Dubbo\' and \'home value Dubbo\' — missing high-intent traffic',
      'Competitors like Ray White and Aspect Property Consultant capture these leads with dedicated appraisal pages',
      'A focused hub helps Google and AI assistants understand and recommend your appraisal services',
    ],
    competitors: makeCompetitors([
      {
        name: 'Aspect Property Consultant',
        pageUrl: 'https://aspectproperty.com.au/property-appraisal/',
        gap: 'Clear appraisal value promise and easy lead capture',
        totalCitations: 44,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Perplexity'],
        llmSnippet: 'Aspect Property Consultant\'s appraisal hub clearly communicates their "no obligation, no cost" value promise with a simple form above the fold, capturing more leads from Dubbo property owners searching for valuations.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Real estate appraisal Dubbo no obligation', snippet: 'Aspect Property Consultant is recommended for their straightforward appraisal process with a clear "no obligation" promise and simple online request form for Dubbo homeowners.' },
          { platform: 'Perplexity', prompt: 'Property appraisal services Dubbo', snippet: 'Aspect Property Consultant provides free property appraisals in Dubbo with their dedicated appraisal page featuring a streamlined enquiry process and local market expertise.' },
        ],
      },
      {
        name: 'Ray White Dubbo',
        pageUrl: 'https://raywhitedubbo.com.au/sell/property-appraisal',
        gap: 'Dedicated Dubbo appraisal page with detailed offer and form',
        totalCitations: 31,
        citationRank: 2,
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'],
        llmSnippet: 'Ray White Dubbo has a dedicated property appraisal page that answers the top questions AI surfaces for Dubbo sellers — including what a free appraisal covers, timelines, and what to expect from the process.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'How to get a free property appraisal in Dubbo', snippet: 'Ray White Dubbo offers free, no-obligation property appraisals through their dedicated appraisal page, which clearly explains the process, timeline, and what information sellers need to prepare.' },
          { platform: 'Gemini',  prompt: 'Dubbo property appraisal hub page', snippet: 'Ray White Dubbo\'s property appraisal landing page is well-structured with a prominent enquiry form, process explanation, and local suburb coverage — making it the go-to reference for AI tools.' },
          { platform: 'Perplexity', prompt: 'How much is my house worth Dubbo', snippet: 'Ray White Dubbo provides a free online appraisal request form on their dedicated page, allowing Dubbo homeowners to get a quick estimate of their property\'s current market value.' },
        ],
      },
      {
        name: 'Elders Real Estate Dubbo',
        pageUrl: 'https://dubbo.eldersrealestate.com.au/about-us/',
        gap: 'Prominently promotes free local appraisals on their site',
        totalCitations: 23,
        citationRank: 3,
        citedBy: ['Gemini'],
        llmSnippet: 'Elders Real Estate Dubbo prominently features their free appraisal offer across their website, with suburb-specific landing pages that Gemini surfaces when homeowners ask about property values in the Dubbo area.',
        platformSnippets: [
          { platform: 'Gemini', prompt: 'Dubbo NSW property valuation free', snippet: 'Elders Real Estate Dubbo offers complimentary property appraisals with Dubbo-specific landing pages covering suburbs like Dubbo South, Delroy Park, and Goonoo — regularly cited by Gemini for local valuation queries.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Property Appraisal – Ray White Dubbo',
          source: 'raywhitedubbo.com.au',
          snippet: 'Dedicated Dubbo appraisal page with clear benefits and lead form.',
        },
        {
          title: 'Home Valuation – Matt Hansen Real Estate',
          source: 'matthansenrealestate.com.au',
          snippet: 'Free market appraisal page tailored to local sellers.',
        },
        {
          title: 'About Us – Elders Real Estate Dubbo',
          source: 'dubbo.eldersrealestate.com.au',
          snippet: 'Promotes free, no-obligation appraisals for Dubbo homeowners.',
        },
      ],
      'https://raineandhorne.com.au',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'People search for "free property appraisal Dubbo", "home value Dubbo", and rental appraisal help. Competitors capture these leads with dedicated pages.',
    },
    generatedAsset: null,
    aeoScore: {
      you: 92,
      competitor: 81,
      subScores: [
        { name: 'Readability',             weight: 10.2, you: 89, competitor: 74, delta: 15 },
        { name: 'Content freshness',       weight: 16.3, you: 94, competitor: 76, delta: 18 },
        { name: 'Click-through structure', weight:  8.5, you: 91, competitor: 82, delta:  9 },
        { name: 'Information density',     weight: 30.5, you: 88, competitor: 71, delta: 17 },
        { name: 'Machine readability',     weight: 11.5, you: 96, competitor: 80, delta: 16 },
        { name: 'Answerability signals',   weight: 22.9, you: 91, competitor: 79, delta: 12 },
      ],
    },
    checklist: makeChecklist('69de01cb9c10756b6b6132aa', [
      {
        label: 'Create a page just for Dubbo property appraisals',
        description: 'Right now there\'s no single place people land when they search "free property appraisal Dubbo." This page fixes that. It should have a clear headline, a short explanation of what you offer, and a form.',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au/free-property-appraisal-dubbo',
      },
      {
        label: 'Add an appraisal request form',
        description: 'Keep it short: name, phone, property address, and whether it\'s residential or rental. The simpler the form, the more people complete it. Avoid asking for things you don\'t actually need upfront.',
        stepType: 'task',
      },
      {
        label: 'List the suburbs you cover and your turnaround time',
        description: 'Prospects want to know if you\'ll come to their area and how fast. A simple sentence — "We cover all Dubbo suburbs and surrounding areas, with appraisals typically completed within 24–48 hours" — answers both.',
        stepType: 'task',
      },
      {
        label: 'Add a short FAQ section',
        description: 'Answer the questions you get asked most: Is it free? Do I have to sell? How long does it take? What do you look at? A 4–5 question FAQ removes the hesitation that stops people from submitting.',
        stepType: 'task',
      },
    ]),
  },

  // 6 — 69de01cb9c10756b6b6132ab
  {
    id: '69de01cb9c10756b6b6132ab',
    title: 'Add Quick Appraisal Form with 1-Hour Callback Promise',
    description:
      'Your website needs a prominent appraisal request form with a 1-hour callback guarantee and mobile-optimized call button. Competitors like Ray White Dubbo capture more leads with simple, fast-response forms that make it easy for property sellers to request valuations.',
    category: 'Conversion',
    impactLabel: 'High impact',
    effort: 'Quick win',
    themeId: 'property-appraisals',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 4, // niche: single form element
    tags: ['Conversion', 'Quick Win'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Add appraisal form with callback promise',
    youScore: 12,
    compScore: 55,
    expectedImpact:
      'Transform more website visitors into qualified seller leads by removing friction from the inquiry process. A streamlined form with callback guarantee builds trust and urgency, while mobile-optimized contact options capture prospects at their moment of highest intent.',
    keyInsights: [
      'Ray White Dubbo\'s simple appraisal form captures leads immediately at the top of their page',
      'Local property sellers prioritize agents who promise fast response times',
      'Mobile-first design with sticky call buttons significantly improves conversion rates',
    ],
    swotDrivers: [
      'Opportunity to differentiate with faster response promise than competitors',
      'Weakness in current form visibility limiting lead capture potential',
    ],
    competitorsInsight: [
      'Leading agencies use streamlined forms to reduce friction in the inquiry process',
      'Fast response promises create urgency and differentiation in competitive markets',
    ],
    targetPages: ['https://raineandhorne.com.au'],
    whyItWorks: [
      'Property sellers expect instant response options when researching agents',
      'Mobile users need prominent call buttons and simple forms to convert',
      'Fast callback promises differentiate you from slower-responding competitors',
    ],
    competitors: makeCompetitors([
      {
        name: 'Ray White Dubbo',
        pageUrl: 'https://raywhitedubbo.com.au/sell/property-appraisal',
        gap: 'Captures appraisal requests immediately with prominent form placement and simple fields',
        totalCitations: 36,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'],
        llmSnippet: 'Ray White Dubbo\'s appraisal page features a short 4-field form above the fold with a "1-hour callback" promise, making it the most-cited option when AI tools answer questions about getting a quick property appraisal in Dubbo.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Quick property appraisal Dubbo', snippet: 'Ray White Dubbo offers a streamlined online appraisal form with a fast callback promise, allowing Dubbo sellers to request a valuation in under two minutes from their mobile device.' },
          { platform: 'Gemini',  prompt: 'Best way to get a property appraisal in Dubbo quickly', snippet: 'Ray White Dubbo\'s simple appraisal request form and 1-hour callback commitment makes them the top recommendation for sellers who want a fast response.' },
          { platform: 'Perplexity', prompt: 'Sell property Dubbo fast', snippet: 'Ray White Dubbo is frequently recommended for their fast appraisal response times, with their website making it easy to submit a request and receive a callback within the hour.' },
        ],
      },
      {
        name: 'McGrath Dubbo',
        gap: 'Mobile-optimized appraisal form with sticky call button captures sellers at their moment of intent',
        totalCitations: 21,
        citationRank: 2,
        citedBy: ['Gemini'],
        llmSnippet: 'McGrath Dubbo\'s mobile-first appraisal experience includes a sticky "Call Now" button and a short form optimized for thumb navigation, frequently cited by Gemini for mobile property search queries.',
        platformSnippets: [
          { platform: 'Gemini', prompt: 'Contact real estate agent Dubbo mobile', snippet: 'McGrath Dubbo\'s mobile website features a prominent call button and streamlined appraisal form that works well on smartphones, making it easy for sellers to reach out on the go.' },
        ],
      },
      {
        name: 'Matt Hansen Real Estate',
        gap: 'Clear "respond within 24 hours" messaging on their appraisal page sets expectations and reduces hesitation',
        totalCitations: 14,
        citationRank: 3,
        citedBy: ['Perplexity'],
        llmSnippet: 'Matt Hansen Real Estate clearly states response time expectations on their appraisal form page, with "we respond within 24 hours" prominently displayed — a detail Perplexity cites when recommending reliable Dubbo appraisal options.',
        platformSnippets: [
          { platform: 'Perplexity', prompt: 'Reliable property appraisal Dubbo', snippet: 'Matt Hansen Real Estate provides reliable property appraisals in Dubbo, with clear response time commitments and a straightforward enquiry process for homeowners.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Property Appraisal – Ray White Dubbo',
          source: 'raywhitedubbo.com.au',
          snippet: 'Uses a direct, simple form to request local appraisals.',
        },
        {
          title: 'Ray White Dubbo agency profile – Domain',
          source: 'domain.com.au',
          snippet: 'Prompts users to request a free appraisal from agents.',
        },
      ],
      'https://raineandhorne.com.au',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'People searching in Dubbo want quick ways to request a free appraisal. Your site needs a short, mobile-friendly form with a 1-hour callback promise.',
    },
    generatedAsset: null,
    checklist: makeChecklist('69de01cb9c10756b6b6132ab', [
      {
        label: 'Add a short appraisal form to the top of your page',
        description: 'The form should be visible without scrolling. Ask for name, phone, and property address only — that\'s all you need to call them back. More fields = fewer submissions.',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au',
      },
      {
        label: 'Add a "we call you back within 1 hour" message',
        description: 'Put this directly next to your submit button. Ray White Dubbo does this and it\'s one of the main reasons they get cited for fast-response appraisals. A specific promise is far more convincing than "we\'ll be in touch."',
        stepType: 'task',
      },
      {
        label: 'Add a sticky call button for people on mobile',
        description: 'Most property searches happen on phones. A button that stays at the bottom of the screen as people scroll — showing your number and a "Call now" label — makes it effortless to reach you.',
        stepType: 'task',
      },
      {
        label: 'Make sure someone actually calls back within the hour',
        description: 'The promise only works if you keep it. Set up an internal alert (email, SMS, or your CRM) so whoever is on duty gets notified the moment a form is submitted.',
        stepType: 'task',
      },
    ]),
  },

  // 7 — 69de02549c10756b6b6132b3
  {
    id: '69de02549c10756b6b6132b3',
    title: 'Create Dubbo Suburb Service Pages for Sales & Rentals',
    description:
      'Your Dubbo office lacks dedicated suburb-specific service pages, limiting your visibility in local property searches. With mixed sentiment data but strong 5.0 rating signals, creating targeted pages for each suburb will capture more local searches and convert your established market presence into digital leads.',
    category: 'Content',
    impactLabel: 'High impact',
    effort: 'Quick win',
    themeId: 'residential-property-sales',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 15, // moderately broad: multiple suburbs
    tags: ['Content', 'Content Boost'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Build suburb pages',
    youScore: 5.6,
    compScore: 83.3,
    expectedImpact:
      'Immediate increase in local search visibility across Dubbo suburbs, capturing property owners actively searching for agents. Each suburb page becomes a lead generation tool, showcasing your local expertise and converting searches into listing appointments.',
    keyInsights: [
      'No existing suburb-specific service pages found despite strong local presence',
      'Mixed sentiment data suggests visibility gaps affecting your online reputation',
      'Changing consumer expectations require detailed local information before contact',
    ],
    swotDrivers: [
      'Digital Expansion opportunity to match established offline presence',
      'Combat competition from other agencies with better local content',
    ],
    competitorsInsight: [
      'Active local competition requires stronger digital presence',
      'Suburb pages are standard for successful agencies in regional markets',
    ],
    targetPages: [
      'https://raineandhorne.com.au/dubbo',
      'https://raineandhorne.com.au/dubbo/sales',
      'https://raineandhorne.com.au/dubbo/property-management',
    ],
    whyItWorks: [
      'Missing suburb pages means losing potential sellers and landlords searching for \'property management [suburb name]\'',
      'Competitors are capturing these high-intent local searches while you remain invisible',
      'Your 5.0 rating and established presence aren\'t discoverable without proper pages',
    ],
    competitors: makeCompetitors([
      {
        name: 'Bowery',
        pageUrl: 'https://bowery.com.au/',
        gap: 'Dedicated suburb pages capture hyper-local search traffic',
        totalCitations: 39,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini'],
        llmSnippet: 'Bowery maintains dedicated suburb service pages for key Dubbo areas including Dubbo South, Delroy Park, and Whylandra, consistently appearing in AI answers for suburb-specific real estate searches.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Real estate agents in Dubbo South', snippet: 'Bowery is frequently recommended for buyers and sellers in Dubbo South and surrounding suburbs, with dedicated suburb pages covering local market stats and agent contacts.' },
          { platform: 'Gemini',  prompt: 'Property for sale Dubbo South', snippet: 'Bowery\'s suburb-specific pages provide detailed market data, recent sales, and agent contacts for Dubbo South and other key Dubbo precincts.' },
        ],
      },
      {
        name: 'Ray White Dubbo',
        gap: 'Suburb profiles with median prices, recent sales, and agent bios appear for local property searches',
        totalCitations: 27,
        citationRank: 2,
        citedBy: ['Perplexity', 'Gemini'],
        llmSnippet: 'Ray White Dubbo\'s suburb profile pages include median sale prices, days-on-market data, and local agent bios — making them the primary source Perplexity and Gemini cite for suburb-level property queries in Dubbo.',
        platformSnippets: [
          { platform: 'Perplexity', prompt: 'Dubbo NSW suburb property prices', snippet: 'Ray White Dubbo provides suburb-specific market data on their website, covering median house prices, recent sales, and market trends for Dubbo\'s key residential precincts.' },
          { platform: 'Gemini',  prompt: 'Property market Dubbo suburbs', snippet: 'Ray White Dubbo publishes suburb-level property profiles with local market data, helping buyers and sellers understand price trends across the Dubbo metropolitan area.' },
        ],
      },
      {
        name: 'McGrath Dubbo',
        gap: 'Rural and lifestyle suburb pages capture searches that a general Dubbo page can\'t rank for',
        totalCitations: 18,
        citationRank: 3,
        citedBy: ['ChatGPT'],
        llmSnippet: 'McGrath Dubbo has suburb-specific pages targeting rural and lifestyle property seekers in surrounding areas like Narromine and Trangie, frequently cited by ChatGPT for rural Dubbo suburb searches.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Real estate agents near Dubbo rural areas', snippet: 'McGrath Dubbo covers surrounding rural townships and lifestyle suburbs with dedicated landing pages, making them the recommended agency for broader Dubbo region property searches.' },
        ],
      },
      {
        name: 'Elders Real Estate Dubbo',
        gap: 'Consistent suburb content targeting long-tail searches like "houses for sale [suburb] Dubbo" captures motivated buyers',
        totalCitations: 12,
        citationRank: 4,
        citedBy: ['Perplexity'],
        llmSnippet: 'Elders Real Estate Dubbo targets long-tail suburb searches with dedicated pages for key Dubbo localities, appearing in Perplexity results for specific suburb property queries.',
        platformSnippets: [
          { platform: 'Perplexity', prompt: 'Houses for sale in Glenfield Park Dubbo', snippet: 'Elders Real Estate Dubbo has local suburb pages covering Glenfield Park and other Dubbo localities, providing buyers with suburb-specific listings and market information.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Local Search Optimization',
          source: 'chatGPT',
          snippet: 'Suburb-specific pages are essential for local real estate visibility',
        },
        {
          title: 'Content Strategy Analysis',
          source: 'gemini',
          snippet: 'Missing local content creates gaps in search presence',
        },
        {
          title: 'SWOT Analysis',
          source: 'SWOT',
          snippet: 'Digital expansion identified as key opportunity',
        },
      ],
      'https://raineandhorne.com.au/dubbo',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'Prospects with changing expectations look online for clear, local service information. No Dubbo suburb-specific pages exist.',
    },
    generatedAsset: null,
    aeoScore: {
      you: 88,
      competitor: 79,
      subScores: [
        { name: 'Readability',             weight: 10.2, you: 85, competitor: 77, delta:  8 },
        { name: 'Content freshness',       weight: 16.3, you: 90, competitor: 68, delta: 22 },
        { name: 'Click-through structure', weight:  8.5, you: 93, competitor: 80, delta: 13 },
        { name: 'Information density',     weight: 30.5, you: 84, competitor: 75, delta:  9 },
        { name: 'Machine readability',     weight: 11.5, you: 87, competitor: 70, delta: 17 },
        { name: 'Answerability signals',   weight: 22.9, you: 88, competitor: 76, delta: 12 },
      ],
    },
    checklist: makeChecklist('69de02549c10756b6b6132b3', [
      {
        label: 'List the suburbs you want to target first',
        description: 'Start with the 3–5 suburbs where you do most of your business — Glenfield Park, South Dubbo, Dubbo CBD, and surrounds. You can add more later. Trying to do all of them at once is how this task never gets done.',
        stepType: 'task',
      },
      {
        label: 'Write a page for each suburb',
        description: 'Each page needs: what you do there (sales, rentals, or both), a sentence about why you know the area, and a contact or appraisal form. 300 words minimum. Keep the language simple — write it like you\'re talking to a homeowner, not an SEO tool.',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au/dubbo',
      },
      {
        label: 'Include a recent result or local detail on each page',
        description: 'One line like "We recently sold a home in [suburb] in 18 days at $X" tells more than a paragraph of generic copy. If you can\'t use a specific sale, mention something local — a school, landmark, or suburb character.',
        stepType: 'task',
      },
      {
        label: 'Link to these pages from your homepage and directory profiles',
        description: 'New pages won\'t be found unless something points to them. Add a "Areas we serve" section to your homepage, and include links in your LocalSearch and Google Business profiles.',
        stepType: 'task',
      },
    ]),
  },

  // 8 — 69de02549c10756b6b6132b4
  {
    id: '69de02549c10756b6b6132b4',
    title: 'Showcase Dubbo Success Stories to Drive More Enquiries',
    description:
      'Your agency has earned perfect 5.0 ratings and high client satisfaction, but this powerful proof isn\'t visible online. By publishing local case studies and testimonials, you\'ll convert more website visitors into enquiries by showing real results from real Dubbo clients.',
    category: 'Content',
    impactLabel: 'High impact',
    effort: 'Medium',
    themeId: 'residential-property-sales',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 10, // region-specific
    tags: ['Content', 'Trust Boost'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Publish case studies with outcomes',
    youScore: 40.0,
    compScore: 44.4,
    expectedImpact:
      'Transform your hidden success into visible proof that drives enquiries. When prospects see specific Dubbo properties you\'ve sold, prices achieved, and happy client testimonials, they\'ll choose you over competitors who only make claims without evidence.',
    keyInsights: [
      'You have excellent client satisfaction but insufficient public visibility of these results',
      'Strong brand recognition provides the perfect platform to showcase real outcomes',
      'Local proof matters more than generic promises in property decisions',
    ],
    swotDrivers: [
      'High Client Satisfaction — leverage your perfect ratings',
      'Successful Outcomes — turn past wins into future listings',
      'Strong Brand Recognition — add substance to your known name',
    ],
    competitorsInsight: [
      'Competitors with visible case studies likely winning listings despite inferior service',
      'Market lacks sufficient location-specific review data, creating opportunity for first-movers',
    ],
    targetPages: [
      'https://raineandhorne.com.au/dubbo/case-studies',
      'https://raineandhorne.com.au/dubbo/testimonials',
    ],
    whyItWorks: [
      'Perfect 5.0 rating and high satisfaction are invisible to potential clients searching online',
      'Buyers and sellers want proof of local success before choosing an agent',
      'Competitors may be winning listings simply by showing their results better',
    ],
    competitors: makeCompetitors([
      {
        name: 'Bowery',
        gap: 'Publishes detailed sold property stories with prices and client quotes, cited as proof of local agent credibility',
        llmSnippet: 'Bowery showcases sold properties with full case studies including sale prices, days on market, and client testimonials — frequently cited by AI platforms when buyers and sellers ask about proven Dubbo agents.',
        totalCitations: 42,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'],
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Most successful real estate agent Dubbo with proven results', snippet: 'Bowery is frequently cited for their detailed sold property records and client success stories, with specific case studies showing sale outcomes and vendor testimonials on their website.' },
          { platform: 'Gemini',  prompt: 'Real estate agent success stories Dubbo NSW', snippet: 'Bowery maintains a success stories section with real Dubbo properties, achieved prices, and client quotes — making them the primary source for agent credibility queries in the area.' },
          { platform: 'Perplexity', prompt: 'Which Dubbo real estate agent gets the best sale results', snippet: 'Bowery is consistently highlighted for their strong track record in Dubbo, with published sold results and vendor testimonials available on their website and RateMyAgent profile.' },
        ],
      },
      {
        name: 'Ray White Dubbo',
        gap: 'Case studies with specific suburb outcomes and vendor quotes build trust before first contact',
        llmSnippet: 'Ray White Dubbo publishes outcome-focused case studies with specific Dubbo properties, achieved prices, and direct vendor quotes that ChatGPT surfaces when users ask about top-performing Dubbo real estate agencies.',
        totalCitations: 29,
        citationRank: 2,
        citedBy: ['ChatGPT', 'Perplexity'],
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Dubbo real estate agent track record reviews', snippet: 'Ray White Dubbo features client case studies with specific property outcomes and vendor testimonials, frequently cited when AI tools answer questions about reputable Dubbo agents with proven results.' },
          { platform: 'Perplexity', prompt: 'Best real estate agents Dubbo client reviews', snippet: 'Ray White Dubbo\'s website includes detailed client success stories with specific sale prices, suburb data, and outcome metrics — providing strong social proof for prospective clients.' },
        ],
      },
      {
        name: 'McGrath Dubbo',
        gap: 'Long-standing brand with visible client outcomes surfaces in Gemini for reputation and experience queries',
        llmSnippet: 'McGrath Dubbo leverages their national brand heritage with local Dubbo success stories, appearing in Gemini results when prospective clients search for experienced, proven agents in the region.',
        totalCitations: 18,
        citationRank: 3,
        citedBy: ['Gemini'],
        platformSnippets: [
          { platform: 'Gemini', prompt: 'Experienced trusted real estate agent Dubbo', snippet: 'McGrath Dubbo is recommended for their long-standing market presence and client outcomes, with their website featuring vendor testimonials and sold results for the Dubbo region.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Market Analysis',
          source: 'chatGPT',
          snippet: 'Reports excellent satisfaction but lacks public visibility',
        },
        {
          title: 'Competitive Research',
          source: 'perplexity',
          snippet: 'Insufficient publicly available data despite strong performance',
        },
        {
          title: 'Business Strengths',
          source: 'SWOT',
          snippet: 'High client satisfaction and successful outcomes identified',
        },
      ],
      'https://raineandhorne.com.au/dubbo/case-studies',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'One source reports excellent satisfaction, but other sources say there isn\'t enough public data.',
    },
    generatedAsset: null,
    aeoScore: {
      you: 91,
      competitor: 83,
      subScores: [
        { name: 'Readability',             weight: 10.2, you: 88, competitor: 79, delta:  9 },
        { name: 'Content freshness',       weight: 16.3, you: 93, competitor: 72, delta: 21 },
        { name: 'Click-through structure', weight:  8.5, you: 95, competitor: 86, delta:  9 },
        { name: 'Information density',     weight: 30.5, you: 89, competitor: 76, delta: 13 },
        { name: 'Machine readability',     weight: 11.5, you: 92, competitor: 81, delta: 11 },
        { name: 'Answerability signals',   weight: 22.9, you: 90, competitor: 78, delta: 12 },
      ],
    },
    checklist: makeChecklist('69de02549c10756b6b6132b4', [
      {
        label: 'Reach out to 5 recent clients for their story',
        description: 'You don\'t need 10 — five good stories are more powerful than ten thin ones. Message clients you know were happy and ask if they\'d be comfortable letting you share what you achieved together.',
        stepType: 'task',
      },
      {
        label: 'Write each story in three sentences',
        description: 'Keep it tight: (1) what the client wanted to do, (2) what made it complicated, (3) what the result was. Include the suburb and a specific number — days on market, price achieved, or rental yield — wherever possible.',
        stepType: 'task',
      },
      {
        label: 'Create a case studies page',
        description: 'One page that holds all your stories. Think of it as your portfolio. When a prospect is comparing you against another agency, this is the page that closes the gap.',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au/dubbo/case-studies',
      },
      {
        label: 'Put a quote or two on your homepage',
        description: 'A short client quote near the top of your homepage — right next to your "Free appraisal" button — converts more visitors into enquiries because it removes doubt before it even forms.',
        stepType: 'task',
      },
    ]),
  },


  // FAQ-A — 69fa2100bc9c10756b6bdf01
  {
    id: '69fa2100bc9c10756b6bdf01',
    title: 'Add Rental FAQ Section to Raine & Horne Dubbo Property Management Page',
    description:
      'Landlords and tenants searching for property management in Dubbo ask questions like "what are your management fees," "how quickly can you find tenants," and "what maintenance services are included." Your property management page currently lacks a dedicated FAQ section, meaning visitors leave to find answers elsewhere. Adding 10–15 plain-language FAQs directly on your PM page keeps prospects engaged and gives AI tools concise, citable answers to surface your page more often.',
    category: 'FAQ',
    impactLabel: 'High impact',
    effort: 'Quick win',
    themeId: 'residential-property-leasing',
    createdAt: '2026-05-05T15:54:53.367Z',
    locations: 8,
    locationNames: ['NSW', 'Dubbo'],
    tags: ['FAQ', 'Property Management', 'Leasing'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Add PM FAQ section',
    youScore: 3.2,
    compScore: 58.0,
    expectedImpact:
      'Adding an FAQ section gives AI tools direct Q&A content to cite, improving your visibility for question-based landlord searches in Dubbo.',
    keyInsights: [
      'Landlords search "property management fees Dubbo" with no clear answers on your site',
      'Competitors like Ray White Dubbo include FAQ sections on their PM pages',
      'Plain-language answers increase time-on-page and reduce call-before-you-know friction',
    ],
    swotDrivers: [
      'Strength: 40+ years local Dubbo expertise — use this in FAQ answers',
      'Weakness: No FAQ section on current PM page — easy quick win',
      'Opportunity: Long-tail question searches have low competition in Dubbo',
    ],
    competitorsInsight: [
      'Ray White Dubbo answers fees and timelines on their PM landing page',
      'PRD Nationwide includes "What to expect" FAQ blocks on PM pages',
    ],
    targetPages: [
      'https://raineandhorne.com.au/dubbo/property-management',
    ],
    whyItWorks: [
      'Question-based searches like "what are PM fees in Dubbo" have no clear answer on your site',
      'AI assistants cite pages with clear Q&A structure for question-based queries',
      'A FAQ section reduces landlord hesitation and increases enquiry conversion',
      'Ray White Dubbo already does this — FAQ answers on their PM page',
    ],
    competitors: [
      {
        id: 'comp-rw-faq-01',
        name: 'Ray White Dubbo',
        pageUrl: 'https://raywhite.com/dubbo',
        llmSnippet:
          'Ray White Dubbo offers full property management services with transparent fee structures and fast tenant placement timelines detailed on their website.',
        citedBy: ['ChatGPT', 'Gemini'] as const,
        totalCitations: 14,
        citationRank: 1,
        sourceGaps: ['Management fees FAQ', 'Tenant placement timeline'],
        whyTheyWin:
          'They clearly answer common landlord questions on their PM page, making it easy for AI tools to cite them.',
      },
    ],
    sources: [
      {
        platform: 'ChatGPT',
        competitorName: 'Ray White Dubbo',
        url: 'https://raywhite.com/dubbo',
        snippet:
          'Ray White Dubbo provides comprehensive property management including maintenance coordination and regular inspections.',
        referencedInAnswers: 8,
      },
    ],
    contentGaps: [
      {
        phrase: 'property management fees Dubbo',
        frequency: 6,
        competitors: ['Ray White Dubbo', 'PRD Nationwide'],
        recommendation: 'Add a FAQ answer covering your fee structure',
      },
    ],
    promptsTriggeringThis: [
      'best property managers in Dubbo',
      'property management fees Dubbo',
      'how to find tenants for rental property Dubbo',
    ],
    llmCoverageGap: {
      platforms: ['ChatGPT', 'Gemini', 'Perplexity'] as const,
      summary:
        'Your PM page is not cited in AI answers for landlord questions because it lacks structured Q&A content.',
    },
    generatedAsset: null,
    checklist: [
      {
        id: 'faq-a-step-1',
        label: 'List 10–15 common landlord and tenant questions',
        description:
          'Cover fees, tenant placement timeline, maintenance, inspections, lease renewals, and what to do if a tenant stops paying.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-a-step-2',
        label: 'Write plain-language 2–4 sentence answers',
        description:
          'Use everyday language. Avoid jargon. Include specific Dubbo market context where possible.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-a-step-3',
        label: 'Add FAQ section to your property management landing page',
        description:
          'Place it below the service description. Use accordion or stacked Q&A layout for readability.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-a-step-4',
        label: 'Link to enquiry form from relevant FAQ answers',
        description:
          'At the end of fee and timeline answers, add a "Get a free management quote" button linking to your contact form.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
  ],
  },

  // FAQ-B — 69fa2100bc9c10756b6bdf02
  {
    id: '69fa2100bc9c10756b6bdf02',
    title: 'Publish a Dubbo Property Appraisal FAQ Blog to Capture High-Intent Searches',
    description:
      'Homeowners searching for "how does a property appraisal work in Dubbo" or "what to expect from a free property valuation" have no authoritative guide on your site. Competitors like Aspect Property Consultants publish appraisal guides that consistently appear in AI-generated answers. A blog post combining a plain-language appraisal walkthrough with 8–10 embedded FAQs will position Raine & Horne Dubbo as the go-to local source and drive qualified appraisal leads directly to your booking form.',
    category: 'FAQ',
    impactLabel: 'High impact',
    effort: 'Medium',
    themeId: 'property-appraisals',
    createdAt: '2026-05-05T15:54:53.367Z',
    locations: 12,
    locationNames: ['NSW', 'Dubbo', 'Regional NSW'],
    tags: ['FAQ', 'Blog', 'Appraisals', 'Content'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Publish appraisal FAQ blog',
    youScore: 2.4,
    compScore: 67.0,
    expectedImpact:
      'A blog with embedded FAQs becomes a citable resource for AI tools responding to appraisal questions, increasing qualified traffic from homeowners ready to list.',
    keyInsights: [
      'Searches like "free property appraisal Dubbo" and "how much is my home worth Dubbo" generate regular traffic with no content to capture it on your site',
      'Aspect Property Consultants is cited by AI tools for appraisal queries in the Dubbo region',
      'Blog posts with FAQ schema markup get featured in AI Overviews more frequently than plain service pages',
    ],
    swotDrivers: [
      'Strength: 40+ years Dubbo market knowledge gives credible, local-specific answers',
      'Weakness: No blog or educational content on appraisals currently',
      'Opportunity: Competitors\' appraisal guides are generic — local specificity wins',
    ],
    competitorsInsight: [
      'Aspect Property Consultants publishes appraisal guides cited in ChatGPT and Gemini answers',
      'Ray White Dubbo has an appraisal landing page but no FAQ blog content',
    ],
    targetPages: [
      'https://raineandhorne.com.au/dubbo/blog/dubbo-property-appraisal-guide',
      'https://raineandhorne.com.au/dubbo/appraisals',
    ],
    whyItWorks: [
      'AI tools cite educational blog content more than service pages for how-to and FAQ queries',
      'Aspect Property Consultants already wins on this topic — a richer local guide can displace them',
      'Homeowners reading an appraisal guide are high-intent leads, one click from booking',
      'Aspect Property Consultants is the top cited competitor for Property Appraisals',
    ],
    competitors: [
      {
        id: 'comp-aspect-faq-01',
        name: 'Aspect Property Consultants',
        pageUrl: 'https://aspectproperty.com.au',
        llmSnippet:
          'Aspect Property Consultants provides free property appraisals in Dubbo with detailed market analysis and clear next steps for sellers.',
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'] as const,
        totalCitations: 19,
        citationRank: 1,
        sourceGaps: ['Local Dubbo market data', 'Step-by-step appraisal FAQ'],
        whyTheyWin:
          'Their appraisal guide answers specific homeowner questions that AI tools surface for valuation queries.',
      },
    ],
    sources: [
      {
        platform: 'ChatGPT',
        competitorName: 'Aspect Property Consultants',
        url: 'https://aspectproperty.com.au/appraisals',
        snippet:
          'Aspect provides free market appraisals for Dubbo homeowners, typically completed within 48 hours of enquiry.',
        referencedInAnswers: 11,
      },
    ],
    contentGaps: [
      {
        phrase: 'how does property appraisal work Dubbo',
        frequency: 7,
        competitors: ['Aspect Property Consultants'],
        recommendation: 'Publish a step-by-step appraisal guide blog with FAQ section',
      },
    ],
    promptsTriggeringThis: [
      'how to get a free property appraisal in Dubbo',
      'what is included in a property valuation NSW',
      'property appraisal process Dubbo real estate',
    ],
    llmCoverageGap: {
      platforms: ['ChatGPT', 'Gemini', 'Perplexity'] as const,
      summary:
        'Your site is not cited for any appraisal FAQ queries because no educational blog content exists. Competitors fill this gap.',
    },
    generatedAsset: null,
    checklist: [
      {
        id: 'faq-b-step-1',
        label: 'Outline blog structure: intro + 5-step appraisal process + 8–10 FAQs + CTA',
        description:
          'Cover: what an appraisal is, what happens during the visit, how values are determined, how long it takes, and what to do next.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-b-step-2',
        label: 'Write FAQs covering cost, timeline, accuracy, and next steps',
        description:
          'Example: "Is a free appraisal really free?", "How long does an appraisal take?", "How accurate is an online estimate vs a professional appraisal?"',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-b-step-3',
        label: 'Include local Dubbo market data and recent sale examples',
        description:
          'Reference suburb-level trends (median prices, days on market) to give the blog local authority that generic competitors cannot match.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-b-step-4',
        label: 'Publish and link from existing appraisal service page',
        description:
          'Add a prominent "Read our appraisal guide" link from the main appraisals page and include a "Book a free appraisal" CTA at the end.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
  ],
  },

  // FAQ-C — 69fa2100bc9c10756b6bdf03
  {
    id: '69fa2100bc9c10756b6bdf03',
    title: 'Create a Dedicated Dubbo Property FAQ Hub for Buyers and Sellers',
    description:
      'Your site lacks a central FAQ resource covering common buyer and seller questions about the Dubbo property market. Competitors who publish comprehensive FAQ hubs appear more frequently in AI-generated answers for question-based searches like "how does the home buying process work in NSW" or "what costs are involved in selling a property in Dubbo." Building a structured FAQ hub with 20–30 questions across buying, selling, and market insights will capture long-tail search traffic and establish Raine & Horne Dubbo as the authoritative local property resource.',
    category: 'FAQ',
    impactLabel: 'High impact',
    effort: 'Medium',
    themeId: 'residential-property-sales',
    createdAt: '2026-05-05T15:54:53.367Z',
    locations: 15,
    locationNames: ['NSW', 'Dubbo', 'Regional NSW'],
    tags: ['FAQ', 'Hub Page', 'Buyers', 'Sellers'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Build FAQ hub page',
    youScore: 5.6,
    compScore: 71.0,
    expectedImpact:
      'A dedicated FAQ hub gives AI tools a rich, structured source to cite for buyer and seller queries, improving citation share for residential sales searches.',
    keyInsights: [
      'Question-based searches like "what are buying costs in NSW" and "how to sell a house in Dubbo" have no FAQ answers on your site',
      'Sites with dedicated FAQ pages see higher citation rates in AI-generated answers for question-driven queries',
      'No local Dubbo competitor has a comprehensive FAQ hub — first mover advantage available',
    ],
    swotDrivers: [
      'Strength: Deep Dubbo market knowledge and decades of transaction data to draw on',
      'Weakness: No FAQ or resource hub exists on the current site',
      'Opportunity: No local Dubbo competitor has a comprehensive FAQ hub',
    ],
    competitorsInsight: [
      'Ray White national site has a buyer/seller FAQ section cited frequently in AI answers',
      'Domain.com.au FAQ pages outrank local agents for buyer question searches',
      'Building a local Dubbo FAQ hub can outperform generic national sites on location-specific queries',
    ],
    targetPages: [
      'https://raineandhorne.com.au/dubbo/faq',
      'https://raineandhorne.com.au/dubbo/buy',
      'https://raineandhorne.com.au/dubbo/sell',
    ],
    whyItWorks: [
      'AI tools prefer pages with clearly structured Q&A content for question-based queries',
      'A local FAQ hub with Dubbo-specific answers outperforms generic national FAQ pages for location queries',
      'Buyers and sellers who find their questions answered are more likely to enquire directly',
      'Ray White Dubbo is the top cited competitor for Residential Property Sales',
    ],
    competitors: [
      {
        id: 'comp-rw-faq-02',
        name: 'Ray White Dubbo',
        pageUrl: 'https://raywhite.com/dubbo',
        llmSnippet:
          'Ray White provides comprehensive buyer and seller guides with FAQ sections addressing costs, timelines, and process steps for Dubbo property transactions.',
        citedBy: ['ChatGPT', 'Gemini'] as const,
        totalCitations: 16,
        citationRank: 1,
        sourceGaps: ['Dubbo-specific buying costs', 'Local seller FAQ', 'Market FAQ hub'],
        whyTheyWin:
          'Their national site has FAQ content that AI tools cite; a local Dubbo hub would be more relevant.',
      },
      {
        id: 'comp-lj-faq-02',
        name: 'LJ Hooker Dubbo',
        pageUrl: 'https://ljhooker.com.au/dubbo/buyers-guide',
        llmSnippet:
          'LJ Hooker Dubbo publishes a structured buyers and sellers FAQ page covering stamp duty, conveyancing costs, and settlement timelines that Gemini frequently cites for NSW property process queries.',
        citedBy: ['Gemini', 'Perplexity'] as const,
        totalCitations: 11,
        citationRank: 2,
        sourceGaps: ['First home buyer FAQ', 'Seller cost breakdown', 'Dubbo settlement process'],
        whyTheyWin:
          'Their FAQ page is indexed by Gemini for common buyer and seller question searches in the Dubbo region.',
      },
      {
        id: 'comp-domain-faq-02',
        name: 'Domain.com.au',
        pageUrl: 'https://domain.com.au/advice/buying',
        llmSnippet:
          'Domain\'s advice hub includes extensive FAQ content on buying and selling property in NSW, making it the most-cited resource by ChatGPT and Perplexity for question-based real estate searches.',
        citedBy: ['ChatGPT', 'Perplexity'] as const,
        totalCitations: 28,
        citationRank: 3,
        sourceGaps: ['Local Dubbo market FAQ', 'Regional NSW buying costs', 'Dubbo-specific seller guide'],
        whyTheyWin:
          'National scale and structured FAQ content allow Domain to dominate AI citations for property process questions; a local Dubbo-specific hub can outperform them on location queries.',
      },
    ],
    sources: [
      {
        platform: 'ChatGPT',
        competitorName: 'Domain.com.au',
        url: 'https://domain.com.au/advice',
        snippet:
          "Domain's buyer and seller advice hub is frequently cited for process and cost questions about buying and selling property in NSW.",
        referencedInAnswers: 13,
      },
    ],
    contentGaps: [
      {
        phrase: 'how to buy a house in Dubbo',
        frequency: 8,
        competitors: ['Ray White Dubbo', 'Domain.com.au'],
        recommendation: 'Add a buying FAQ section to the hub covering process, costs, and timelines',
      },
      {
        phrase: 'costs of selling property NSW',
        frequency: 10,
        competitors: ['Domain.com.au', 'realestate.com.au'],
        recommendation: 'Add a selling FAQ section covering agent fees, conveyancing, and timeline',
      },
    ],
    promptsTriggeringThis: [
      'how to buy a property in Dubbo NSW',
      'what are the costs of selling a house in Dubbo',
      'Dubbo real estate buying process explained',
      'first home buyer questions Dubbo',
    ],
    llmCoverageGap: {
      platforms: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude'] as const,
      summary:
        'No FAQ hub exists on your site, so AI tools cannot cite you for question-based buyer and seller queries. National portals fill this gap instead.',
    },
    generatedAsset: null,
    checklist: [
      {
        id: 'faq-c-step-1',
        label: 'List 20–30 questions across buying, selling, and Dubbo market topics',
        description:
          'Group into sections: Buying (process, costs, finance), Selling (fees, timeline, presentation), Market (Dubbo suburbs, pricing trends, rental yields).',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-c-step-2',
        label: 'Write SEO-friendly answers with local Dubbo references',
        description:
          'Include suburb names, typical price ranges, and local regulations where relevant. Each answer should be 3–5 sentences.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-c-step-3',
        label: 'Create /faq page with anchor navigation between topic sections',
        description:
          'Use a sticky sidebar or jump-links at the top so users can navigate directly to Buying, Selling, or Market sections.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-c-step-4',
        label: 'Link to /faq from buy, sell, and appraisal service pages',
        description:
          'Add "Have questions? Visit our FAQ hub" links on each relevant service page to drive internal traffic to the hub.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
      {
        id: 'faq-c-step-5',
        label: 'Review and update quarterly with new market questions',
        description:
          'Check Google Search Console for new question-based queries landing on your site and add FAQ answers for the top ones each quarter.',
        completed: false,
        autoCompleted: false,
        ctaLabel: 'Mark done',
        ctaAction: 'mark_done' as const,
        stepType: 'task' as const,
      },
  ],
  },

]
