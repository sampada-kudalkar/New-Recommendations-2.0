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

  // 4 — 69de01cb9c10756b6b6132a9
  {
    id: '69de01cb9c10756b6b6132a9',
    title: 'Claim LocalSearch and API Profiles for Dubbo Appraisals',
    description:
      'Your business lacks consistent presence on key local directories where Dubbo residents search for property appraisals. LocalSearch and Australian Property Institute (API) profiles are missing or incomplete, limiting your visibility in local searches and AI-powered answers.',
    category: 'Local SEO',
    impactLabel: 'High impact',
    effort: 'Quick win',
    themeId: 'property-appraisals',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 5, // niche: two specific platforms
    tags: ['Local SEO', 'Quick Win'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Claim and optimize local directory profiles',
    youScore: 0,
    compScore: 75,
    expectedImpact:
      'Increased visibility in local search results and directory listings will drive more direct phone calls and appraisal inquiries. Consistent business information across platforms strengthens Google\'s confidence in your location data.',
    keyInsights: [
      'LocalSearch and API are trusted sources that Google uses to verify business information',
      'Competitors actively maintain these profiles and highlight free appraisal services prominently',
    ],
    swotDrivers: [
      'Opportunity: Untapped local directory channels for lead generation',
      'Threat: Competitors dominating directory listings for appraisal searches',
    ],
    competitorsInsight: [
      'Leading competitors use directory profiles as additional lead generation channels beyond their websites',
      'Successful agents emphasize \'free\' and \'no-obligation\' messaging consistently across all platforms',
    ],
    targetPages: ['https://raineandhorne.com.au'],
    whyItWorks: [
      'Missing profiles mean lost opportunities when locals search directories for free property appraisals',
      'Consistent NAP (Name, Address, Phone) across directories boosts Google\'s trust and local rankings',
      'Professional API membership listing builds immediate credibility for high-value appraisal services',
    ],
    competitors: makeCompetitors([
      {
        name: 'Aspect Property Consultant',
        pageUrl: 'https://aspectproperty.com.au/property-appraisal/',
        gap: 'Maintains complete directory profiles with clear free appraisal messaging across all channels',
        totalCitations: 41,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'],
        llmSnippet: 'Aspect Property Consultant appears in multiple local directories with fully completed profiles and consistent "free property appraisal Dubbo" messaging, making them the top AI recommendation for appraisal searches.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Free property appraisal Dubbo', snippet: 'Aspect Property Consultant is consistently recommended for free property appraisals in Dubbo, with their LocalSearch and Google profiles prominently featuring their no-obligation appraisal offer.' },
          { platform: 'Gemini',  prompt: 'Property appraisal Dubbo NSW', snippet: 'Aspect Property Consultant ranks highly for Dubbo appraisal searches, with complete LocalSearch.com.au and API member directory profiles highlighting their free appraisal service.' },
          { platform: 'Perplexity', prompt: 'Who offers free home appraisals in Dubbo', snippet: 'Aspect Property Consultant offers complimentary property appraisals in Dubbo, with their directory profiles clearly stating "no obligation, no cost" valuations for homeowners.' },
        ],
      },
      {
        name: 'Elders Real Estate Dubbo',
        pageUrl: 'https://dubbo.eldersrealestate.com.au/about-us/',
        gap: 'Actively promotes no-obligation appraisals through optimized directory listings',
        totalCitations: 28,
        citationRank: 2,
        citedBy: ['ChatGPT', 'Gemini'],
        llmSnippet: 'Elders Real Estate Dubbo maintains active profiles on LocalSearch, Australian Property Institute, and Google Business, all featuring their no-obligation appraisal offer for Dubbo homeowners.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Real estate appraisals near me Dubbo', snippet: 'Elders Real Estate Dubbo is frequently cited for their directory presence, with complete profiles on LocalSearch and API member directory highlighting free appraisals in the Dubbo area.' },
          { platform: 'Gemini',  prompt: 'Dubbo real estate agents offering free valuations', snippet: 'Elders Real Estate Dubbo maintains comprehensive local directory listings and offers free property valuations, making them visible across multiple Dubbo appraisal searches.' },
        ],
      },
      {
        name: 'Ray White Dubbo',
        gap: 'Consistent brand presence across national and local directories drives appraisal enquiries',
        totalCitations: 16,
        citationRank: 3,
        citedBy: ['Perplexity'],
        llmSnippet: 'Ray White Dubbo\'s national brand profile and consistent local directory presence means they appear in AI answers for property appraisal queries even without an optimized local page.',
        platformSnippets: [
          { platform: 'Perplexity', prompt: 'Top real estate agencies Dubbo', snippet: 'Ray White Dubbo benefits from their strong national brand presence and consistent directory profiles, appearing in Perplexity results for appraisal-related searches in the Dubbo area.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'LocalSearch business directory',
          source: 'localsearch.com.au',
          snippet: 'Local directory where complete profiles can highlight services like free appraisals.',
        },
        {
          title: 'Australian Property Institute member directory',
          source: 'api.org.au',
          snippet: 'Professional directory; complete profiles build credibility for property appraisal services.',
        },
      ],
      'https://raineandhorne.com.au',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'People search for free property appraisals and home value in Dubbo. Your site lacks consistent, matching listings that highlight "Obligation-free property appraisal" for Dubbo.',
    },
    generatedAsset: null,
    checklist: makeChecklist('69de01cb9c10756b6b6132a9', [
      {
        label: 'Claim your profiles on these two directories',
        description: 'Both LocalSearch and the API member directory are trusted sources that Google uses to verify your business. Competitors already have profiles here — claiming yours takes about 10 minutes each.',
        stepType: 'link',
        links: [
          { label: 'LocalSearch.com.au — claim your free listing', url: 'https://www.localsearch.com.au/claim-listing' },
          { label: 'API.org.au — member directory listing', url: 'https://www.api.org.au/find-a-member' },
        ],
      },
      {
        label: 'Use this exact business info on both profiles',
        description: 'Small inconsistencies — like "Rd" vs "Road" or a different phone number — confuse Google and reduce how much it trusts your location data. Copy these details exactly as shown.',
        stepType: 'nap',
        napData: {
          name: 'Raine & Horne Dubbo',
          address: '63 Macquarie Street, Dubbo NSW 2830',
          phone: '(02) 6882 6999',
        },
      },
      {
        label: 'Add these search phrases to your profile',
        description: 'Paste these into the Services or Description field on each profile. These are the exact words Dubbo property owners type when looking for an appraisal — being in the profile text helps you show up.',
        stepType: 'keyword',
        keywords: [
          'Free property appraisal Dubbo',
          'Rental appraisal Dubbo NSW',
          'Obligation-free property appraisal',
          'Home valuation Dubbo',
        ],
      },
      {
        label: 'Upload a few photos',
        description: 'Profiles with photos get significantly more clicks than those without. Use 3–5 real images — your office exterior, your team, or a recent property you\'ve listed. Phone photos are fine.',
        stepType: 'task',
      },
      {
        label: 'Write a short business description',
        description: 'In 2–3 sentences, mention that you offer free appraisals, how quickly you respond, and that you\'ve been in Dubbo for 40+ years. Keep the tone conversational — write it like you\'d explain it to a neighbour.',
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

  // 9 — 69de02549c10756b6b6132b5
  {
    id: '69de02549c10756b6b6132b5',
    title: 'Set Clear PM Response Standards to Convert More Leads',
    description:
      'Property management inquiries often stall when landlords can\'t find clear communication standards and response times. By publishing explicit service commitments, you\'ll reduce friction in the decision process and showcase your professionalism—a key strength that differentiates you from competitors who leave prospects guessing.',
    category: 'Conversion',
    impactLabel: 'High impact',
    effort: 'Bigger lift',
    themeId: 'residential-property-leasing',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 8,
    tags: ['Conversion', 'High Impact'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Publish service standards',
    youScore: 16.7,
    compScore: 50,
    expectedImpact:
      'Publishing clear service standards will reduce objections during the inquiry process and increase conversion rates from website visitors to actual property management leads. Landlords who see defined response times and escalation procedures are more likely to trust you with their investment properties.',
    keyInsights: [
      'Despite a perfect 5.0 rating showing strong satisfaction, this strength isn\'t being leveraged on the website',
      'The absence of published communication standards creates unnecessary friction for potential clients',
      'Competitors who clearly state service commitments capture leads that might otherwise choose you',
    ],
    swotDrivers: [
      'Occasional complaints about administration in property management',
      'Changing Consumer Expectations',
      'Professionalism and Expertise',
    ],
    competitorsInsight: [
      'Competitors who publish clear service standards capture trust-sensitive landlords earlier in the decision process',
      'The absence of visible communication commitments creates an opportunity gap competitors can exploit',
    ],
    targetPages: [
      'https://raineandhorne.com.au/dubbo/property-management-support',
      'https://raineandhorne.com.au/dubbo/communication-standards',
    ],
    whyItWorks: [
      'Landlords choose property managers based on trust and clear communication expectations',
      'Admin complaints noted in SWOT analysis indicate gaps in setting proper expectations',
      'Changing consumer expectations demand transparency before they even inquire',
    ],
    competitors: makeCompetitors([
      {
        name: 'PPG Dubbo',
        gap: 'Publishes explicit response time guarantees and service standards on their PM page',
        totalCitations: 27,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini'],
        llmSnippet: 'PPG Dubbo clearly states their property management response time commitments and service standards online, making them the default recommendation when landlords search for transparent property managers in Dubbo.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Property manager with clear service standards Dubbo', snippet: 'PPG Dubbo is frequently recommended for their transparent property management standards, with published response times for maintenance requests and regular update schedules for landlords.' },
          { platform: 'Gemini',  prompt: 'Dubbo property management response times', snippet: 'PPG Dubbo outlines their specific response time commitments for routine and urgent maintenance requests, making them a trusted choice for landlords who value clear communication.' },
        ],
      },
      {
        name: 'Ray White Dubbo',
        gap: 'Dedicated PM communication page with update schedules and escalation paths builds landlord confidence',
        totalCitations: 16,
        citationRank: 2,
        citedBy: ['Perplexity'],
        llmSnippet: 'Ray White Dubbo\'s property management section includes a clear outline of landlord update frequencies, maintenance escalation procedures, and communication channels — cited by Perplexity for PM transparency queries.',
        platformSnippets: [
          { platform: 'Perplexity', prompt: 'Transparent property management Dubbo', snippet: 'Ray White Dubbo provides landlords with clear expectations around communication frequency, update schedules, and how maintenance issues are escalated and resolved.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'SWOT Analysis - Administrative Weaknesses',
          source: 'SWOT',
          snippet: 'Occasional complaints about administration in property management',
        },
        {
          title: 'Market Threat Assessment',
          source: 'SWOT',
          snippet: 'Changing Consumer Expectations',
        },
        {
          title: 'Customer Satisfaction Data',
          source: 'gemini',
          snippet: 'Perfect 5.0 rating indicating strong satisfaction',
        },
      ],
      'https://raineandhorne.com.au/dubbo/property-management-support',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'Before landlords enquire, they want simple, clear communication standards they can trust. The site lacks a page with response times, update frequency, and escalation steps.',
    },
    generatedAsset: null,
    checklist: makeChecklist('69de02549c10756b6b6132b5', [
      {
        label: 'Document your actual response times',
        description: 'Write down what you genuinely commit to: urgent issues (4 hours), routine enquiries (24 hours), maintenance requests (48 hours). If the standard isn\'t set internally first, publishing it externally won\'t stick.',
        stepType: 'task',
      },
      {
        label: 'Create a simple service standards page',
        description: 'One page that lists your communication commitments, how often landlords get updates, and what happens when something needs escalating. Plain language, no jargon — think of it as your promise in writing.',
        stepType: 'task',
        targetPage: 'https://raineandhorne.com.au/dubbo/property-management-support',
      },
      {
        label: 'Add direct contact info for different request types',
        description: 'Make it clear who to call for urgent repairs vs routine enquiries vs after-hours emergencies. A simple table or three labelled contact options removes the friction of "I don\'t know who to call."',
        stepType: 'task',
      },
      {
        label: 'Add a FAQ for common admin concerns',
        description: 'Answer the questions that precede hesitation: "What happens if I can\'t reach you?", "How quickly will a repair be handled?", "When do I get my monthly statement?" — these are the objections that stop landlords from signing up.',
        stepType: 'task',
      },
      {
        label: 'Put an enquiry form on every PM page',
        description: 'Once a landlord has read your standards and feels confident, the form should be right there — no hunting for a contact page. Add a phone number too, prominently displayed.',
        stepType: 'task',
      },
    ]),
  },

  // 10 — 69de03209c10756b6b6132bd
  {
    id: '69de03209c10756b6b6132bd',
    title: 'Complete Domain, Realestate and Farmbuy Rural Profiles',
    description:
      'Major property portals like Domain, Realestate.com.au, and Farmbuy dominate rural property searches in Dubbo, appearing frequently in search results and citation sources. Completing and optimizing your profiles on these platforms will significantly increase your visibility to rural buyers and sellers who start their property journey on these trusted portals.',
    category: 'Local SEO',
    impactLabel: 'High impact',
    effort: 'Quick win',
    themeId: 'rural-property-sales',
    createdAt: CREATED_AT,
    locationNames: LOCATION_NAMES,
    locations: 5,
    tags: ['Local SEO', 'Quick Win'],
    status: 'pending',
    assignedTo: null,
    assignChoice: null,
    acceptedAt: null,
    acceptedBy: null,
    completedAt: null,
    shortAction: 'Complete key portal profiles',
    youScore: 0,
    compScore: 66.7,
    expectedImpact:
      'By establishing a strong presence on these dominant property portals, you\'ll capture more leads from rural property seekers who rely on these platforms. This increased visibility will drive more direct inquiries, phone calls, and website traffic while simultaneously strengthening your local SEO through improved citation consistency.',
    keyInsights: [
      'Property portals serve as both lead generation platforms and critical citation sources for local SEO',
      'Rural property searches have unique characteristics that require specialized portal optimization',
    ],
    swotDrivers: [
      'Opportunity to leverage established portal traffic for rural property searches',
      'Threat from competitors who maintain active, optimized portal profiles',
    ],
    competitorsInsight: [
      'Major property portals rank prominently for rural property searches, making profile optimization essential',
      'Competitors with complete, active portal profiles capture leads before prospects reach agency websites',
    ],
    targetPages: ['https://raineandhorne.com.au'],
    whyItWorks: [
      'These portals appear prominently in your citation sources, indicating Google uses them to verify business information',
      'Rural buyers and sellers typically start their property search on these major portals before contacting agents',
      'Consistent business details across portals strengthen Google\'s trust signals and improve local search rankings',
    ],
    competitors: makeCompetitors([
      {
        name: 'Dubbo Real Estate Agency',
        pageUrl: 'https://dubborealestateagency.com.au',
        gap: 'Competitors likely have established portal presence capturing rural property searches',
        totalCitations: 33,
        citationRank: 1,
        citedBy: ['ChatGPT', 'Gemini', 'Perplexity'],
        llmSnippet: 'Dubbo Real Estate Agency maintains fully optimised profiles on Domain, Realestate.com.au, and Farmbuy — consistently surfaced by AI tools for rural property searches in the Dubbo region.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Rural property agents Dubbo', snippet: 'Dubbo Real Estate Agency is prominently featured across major property portals including Domain and Realestate.com.au, making them the top recommendation for rural property searches in Dubbo.' },
          { platform: 'Gemini',  prompt: 'Farms for sale Dubbo NSW', snippet: 'Dubbo Real Estate Agency has complete portal profiles on Domain and Farmbuy with rural-specific service descriptions and active listings, ranking highly for rural Dubbo property searches.' },
          { platform: 'Perplexity', prompt: 'Real estate agency rural properties Dubbo', snippet: 'Dubbo Real Estate Agency appears consistently across major property portals with complete business profiles and rural-focused content, making them easy to find for buyers and sellers.' },
        ],
      },
      {
        name: 'Elders Real Estate Dubbo',
        pageUrl: 'https://eldersrealestate.com.au',
        gap: 'Active portal profiles provide competitive advantage in rural market visibility',
        totalCitations: 22,
        citationRank: 2,
        citedBy: ['ChatGPT', 'Perplexity'],
        llmSnippet: 'Elders Real Estate Dubbo maintains active profiles on Domain and Realestate.com.au with rural property listings and service descriptions — regularly cited by AI tools as a strong local option for Dubbo rural searches.',
        platformSnippets: [
          { platform: 'ChatGPT', prompt: 'Farm sales agents near Dubbo', snippet: 'Elders Real Estate Dubbo is active on major property portals with rural listings and complete agency profiles, frequently appearing in results for farm and rural property searches near Dubbo.' },
          { platform: 'Perplexity', prompt: 'Rural lifestyle properties Dubbo agent', snippet: 'Elders Real Estate Dubbo maintains a strong presence on Realestate.com.au and Domain with lifestyle and rural property specialisation, making them visible for rural search queries.' },
        ],
      },
      {
        name: 'Matt Hansen Real Estate',
        pageUrl: 'https://matthansenrealestate.com.au',
        gap: 'Major franchise benefits from strong portal relationships and visibility',
        totalCitations: 18,
        citationRank: 3,
        citedBy: ['Gemini'],
        llmSnippet: 'Matt Hansen Real Estate\'s national franchise relationship ensures a high-quality presence across Domain and Realestate.com.au, giving them consistent visibility for rural property queries in the Dubbo area.',
        platformSnippets: [
          { platform: 'Gemini', prompt: 'Real estate portals Dubbo rural listings', snippet: 'Matt Hansen Real Estate benefits from their national franchise\'s established portal relationships, with well-maintained profiles on Domain and Realestate.com.au covering both residential and rural properties.' },
        ],
      },
    ]),
    sources: makeSources(
      [
        {
          title: 'Domain Australia',
          source: 'domain.com.au',
          snippet: 'Major Australian property portal used by buyers and sellers.',
        },
        {
          title: 'realestate.com.au',
          source: 'realestate.com.au',
          snippet: 'Leading property portal where agencies list and promote properties.',
        },
        {
          title: 'Farmbuy',
          source: 'farmbuy.com',
          snippet: 'Specialist portal for farms and rural properties in Australia.',
        },
      ],
      'https://raineandhorne.com.au',
    ),
    contentGaps: [],
    promptsTriggeringThis: [],
    llmCoverageGap: {
      platforms: [],
      summary:
        'People searching on Google for rural property sales in Dubbo often start on big property portals. Your site likely lacks fully completed, rural-focused profiles on these portals.',
    },
    generatedAsset: null,
    checklist: makeChecklist('69de03209c10756b6b6132bd', [
      {
        label: 'Claim or verify your agency profiles on all three portals',
        description: 'Domain, Realestate.com.au, and Farmbuy are the portals rural buyers and sellers use most. Claiming takes 10–15 minutes each — log in or create an agency account and verify your details.',
        stepType: 'link',
        links: [
          { label: 'Domain.com.au — claim your agency profile', url: 'https://www.domain.com.au/agent-admin' },
          { label: 'Realestate.com.au — agency portal login', url: 'https://www.realestate.com.au/agent-admin' },
          { label: 'Farmbuy.com — list your agency', url: 'https://www.farmbuy.com' },
        ],
      },
      {
        label: 'Use consistent business details across all three',
        description: 'Your business name, address, and phone number must be identical on every platform — exactly as they appear on your website. Even small differences (like "St" vs "Street") reduce Google\'s trust in your location data.',
        stepType: 'nap',
        napData: {
          name: 'Raine & Horne Dubbo',
          address: '63 Macquarie Street, Dubbo NSW 2830',
          phone: '(02) 6882 6999',
        },
      },
      {
        label: 'Write a rural-focused service description',
        description: 'Add a bio that specifically mentions farms, lifestyle blocks, and acreage — not just residential sales. Buyers of rural properties filter for agents who understand their market. Generic descriptions lose them to Elders and Matt Hansen.',
        stepType: 'task',
      },
      {
        label: 'Upload team photos and link to your website',
        description: 'Profiles with photos and a website link get significantly more clicks. Use real photos — not stock. Even a smartphone photo of your team outside the office is better than nothing.',
        stepType: 'task',
      },
      {
        label: 'Add current rural listings and note recent sales',
        description: 'An empty profile signals inactivity. Populate with any current rural or lifestyle listings you have. If you have recent rural sales, add them with keyword-rich descriptions mentioning property type, acreage, and location.',
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

]
