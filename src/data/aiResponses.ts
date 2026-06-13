export interface AiCitation {
  name: string
  url: string
  title: string
  description: string
}

// Source chips shown inline in ChatGPT bullet list (e.g. [View], [Allhomes +2])
export interface SourceChip {
  label: string
  url?: string
}

export interface ChatGptBullet {
  agencyName: string
  agencyUrl?: string
  description: string
  chips?: SourceChip[]
}

export interface AiResponseEntry {
  date: string
  llm: string
  location: string
  prompt: string
  // For ChatGPT responses with structured bullet list
  chatGptIntro?: string
  chatGptBullets?: ChatGptBullet[]
  chatGptOutro?: string[]
  hasMap?: boolean   // show static Dubbo map card
  // For other LLMs — markdown-like plain text
  response: string
  citations: AiCitation[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const AI_RESPONSES: AiResponseEntry[] = [
  {
    date: 'Jan 10, 2026',
    llm: 'ChatGPT',
    location: 'Dubbo, NSW',
    prompt: 'Find real estate agencies in dubbo australia specialising in residential property sales',
    hasMap: true,
    chatGptIntro: 'Here are some of the top real estate agencies in Dubbo, Australia that specialise in residential property sales:',
    chatGptBullets: [
      {
        agencyName: 'Raine & Horne Dubbo',
        agencyUrl: 'https://www.rainehorne.com.au/dubbo',
        description: "One of Dubbo's largest and longest-running agencies, specialising in residential sales, auctions, rentals, and investment properties. They sold over 200 properties in the last 12 months according to View.com.au.",
        chips: [{ label: 'View', url: 'https://www.view.com.au' }],
      },
      {
        agencyName: 'Elders Real Estate Dubbo',
        agencyUrl: 'https://www.eldersrealestate.com.au/nsw/dubbo',
        description: 'Established local agency with more than 50 years operating in the Dubbo region. Strong focus on residential home sales, lifestyle properties, and auctions.',
        chips: [{ label: 'Allhomes' }, { label: '+2' }],
      },
      {
        agencyName: 'Ray White Dubbo',
        agencyUrl: 'https://www.raywhite.com.au/offices/ray-white-dubbo',
        description: 'Well-known national brand with a strong Dubbo office specialising in residential property sales and property management across the region.',
      },
      {
        agencyName: 'Bob Berry Real Estate',
        agencyUrl: 'https://www.bobberry.com.au',
        description: 'Highly rated local agency known for residential sales and investment properties with a strong reputation among Dubbo homeowners and investors.',
      },
      {
        agencyName: 'Redden Family Real Estate',
        agencyUrl: 'https://www.reddenfamilyrealestate.com.au',
        description: 'Family-run boutique agency specialising in personalised residential property sales services with excellent customer reviews.',
      },
      {
        agencyName: 'Matt Hansen Real Estate',
        agencyUrl: 'https://www.matthansenrealestate.com.au',
        description: 'Popular independent Dubbo agency focused on residential homes, investment properties, and local market expertise.',
      },
      {
        agencyName: 'Western Plains Real Estate',
        description: 'Local agency servicing residential sales and rentals throughout Dubbo and surrounding suburbs.',
      },
      {
        agencyName: 'Dubbo Real Estate Agency',
        description: 'Established agency offering residential property sales, leasing, and property management services.',
      },
      {
        agencyName: 'Peter Milling & Company - Livestock & Real Estate Agents Dubbo',
        description: 'Regional agency handling residential, rural, and lifestyle property sales.',
      },
      {
        agencyName: 'Brien Real Estate Agency',
        description: 'Smaller local agency focused on personalised property sales and management services.',
      },
    ],
    chatGptOutro: [
      'If you want, I can also help with:',
      'Best agencies specifically for selling homes',
      'Agencies with strongest online reviews',
      'Boutique vs large franchise comparison',
      'Top-performing agents in Dubbo',
      'Agencies best for investment properties or first-home buyers',
      'Sentiment analysis of customer reviews across these agencies',
    ],
    response: '',
    citations: [
      {
        name: 'Raine & Horne Dubbo',
        url: 'https://www.rainehorne.com.au/dubbo',
        title: 'Raine & Horne Dubbo | Leading Property Agency in Dubbo',
        description: 'Raine & Horne Dubbo maintains dedicated suburb service pages for key Dubbo areas including Dubbo South, Delroy Park, and surrounding rural communities.',
      },
      {
        name: 'Ray White Dubbo',
        url: 'https://www.raywhite.com.au/offices/ray-white-dubbo',
        title: 'Ray White Dubbo | Real Estate Agents & Property Management',
        description: "Ray White Dubbo's suburb profile pages include median sale prices, days-on-market data, and local agent profiles to help buyers and sellers navigate the market.",
      },
      {
        name: 'McGrath Dubbo',
        url: 'https://www.mcgrath.com.au/agents/dubbo',
        title: 'McGrath Dubbo | Residential & Rural Property Specialists',
        description: 'McGrath Dubbo has suburb-specific pages targeting rural and lifestyle property seekers in surrounding areas, with consistent coverage of Dubbo residential sales.',
      },
    ],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Gemini',
    location: 'Dubbo, NSW',
    prompt: 'Find real estate agencies near me specialising in residential property sales',
    response: `Real estate agencies in Dubbo, NSW offering residential property sales services include several well-established local firms.

Raine & Horne Dubbo provides residential sales, property management, and free market appraisals across the Dubbo region. They service a range of suburbs from South Dubbo to Delroy Park.

Ray White Dubbo offers residential sales and property management supported by a national network. Their online resources include suburb-level market data and agent profiles.

McGrath Dubbo focuses on residential and rural property sales with suburb-specific content targeting buyers and sellers across the greater Dubbo area.

These agencies all have a strong local presence and regularly appear in property searches for the Dubbo, NSW market.`,
    citations: [
      {
        name: 'Raine & Horne Dubbo',
        url: 'https://www.rainehorne.com.au/dubbo',
        title: 'Raine & Horne Dubbo | Residential Property Sales',
        description: 'Raine & Horne Dubbo provides residential sales, property management, and free appraisals across South Dubbo, Delroy Park, and surrounding suburbs.',
      },
      {
        name: 'Ray White Dubbo',
        url: 'https://www.raywhite.com.au/offices/ray-white-dubbo',
        title: 'Ray White Dubbo | Residential Sales & Property Management',
        description: 'Ray White Dubbo offers comprehensive residential sales backed by national market data, with suburb profiles for buyers and sellers.',
      },
    ],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Perplexity',
    location: 'Dubbo, NSW',
    prompt: 'Find real estate agencies near me specialising in residential property sales',
    response: `Based on current listings and local market presence, the following agencies specialise in residential property sales in Dubbo, NSW:

1. **Raine & Horne Dubbo** — A leading residential agency with dedicated suburb pages for South Dubbo, Delroy Park, and key areas. Offers free appraisals and full sales management. [1]

2. **Ray White Dubbo** — Part of the Ray White network, providing residential sales and property management with access to national buyer databases and suburb-level price data. [2]

3. **McGrath Dubbo** — Specialists in residential and rural property sales, with suburb-specific content and a focus on the greater Dubbo and regional NSW market. [3]

All three agencies maintain active listings and strong local knowledge across the Dubbo residential market.`,
    citations: [
      {
        name: 'Raine & Horne Dubbo',
        url: 'https://www.rainehorne.com.au/dubbo',
        title: 'Raine & Horne Dubbo | Leading Residential Agency',
        description: 'Dedicated suburb service pages for key Dubbo areas. Offers free market appraisals and full sales management services.',
      },
      {
        name: 'Ray White Dubbo',
        url: 'https://www.raywhite.com.au/offices/ray-white-dubbo',
        title: 'Ray White Dubbo | Residential Sales',
        description: 'National network, local expertise. Suburb-level price data and active residential listings across Dubbo.',
      },
      {
        name: 'McGrath Dubbo',
        url: 'https://www.mcgrath.com.au/agents/dubbo',
        title: 'McGrath Dubbo | Residential & Rural Property',
        description: 'Suburb-specific residential sales content targeting buyers and sellers across the greater Dubbo and regional NSW market.',
      },
    ],
  },
  {
    date: 'Jan 9, 2026',
    llm: 'ChatGPT',
    location: 'Bathurst, NSW',
    prompt: 'Find real estate agencies near me specialising in residential property sales',
    response: `🏡 **Top Real Estate Agencies in Bathurst, NSW for Residential Sales**

Bathurst is one of regional NSW's most active property markets. Here are the agencies consistently recommended for residential sales:

**1. Ray White Bathurst**
Ray White Bathurst is a highly active agency with strong suburb coverage across Bathurst. They offer free appraisals, comprehensive marketing, and access to a national buyer network.

**2. Richardson & Wrench Bathurst**
Richardson & Wrench Bathurst specialises in residential and rural property, with a long-standing presence in the market. They're frequently cited for vendor-focused sales campaigns.

**3. PRD Bathurst**
PRD Bathurst provides residential sales and property management with a data-driven approach. Their suburb reports and market insights make them a go-to for both buyers and sellers.`,
    citations: [
      {
        name: 'Ray White Bathurst',
        url: 'https://www.raywhite.com.au/offices/ray-white-bathurst',
        title: 'Ray White Bathurst | Real Estate Agents',
        description: 'Active residential agency in Bathurst with suburb coverage, free appraisals, and access to a national buyer database.',
      },
      {
        name: 'PRD Bathurst',
        url: 'https://www.prd.com.au/bathurst',
        title: 'PRD Bathurst | Residential Sales & Property Management',
        description: 'Data-driven residential sales with suburb reports and market insights for buyers and sellers in the Bathurst region.',
      },
    ],
  },
  {
    date: 'Jan 8, 2026',
    llm: 'ChatGPT',
    location: 'Parkes, NSW',
    prompt: 'Find real estate agencies near me specialising in residential property sales',
    response: `🏡 **Best Real Estate Agencies in Parkes, NSW for Residential Property Sales**

Looking for a reliable real estate agency in Parkes? These agencies are well-regarded for residential sales in the area:

**1. PRD Parkes**
PRD Parkes has been a cornerstone of the local property market for years. They offer no-obligation appraisals, strong marketing reach, and experienced agents with deep local knowledge.

**2. Ray White Parkes**
Ray White Parkes brings national network strength to the local market. Their residential listings include houses, rural lifestyle properties, and investment opportunities across Parkes and surrounds.

**3. First National Real Estate Parkes**
First National Parkes offers a personal approach to residential sales, with a focus on matching buyers and sellers effectively. They're consistently cited for their community engagement and local expertise.`,
    citations: [
      {
        name: 'PRD Parkes',
        url: 'https://www.prd.com.au/parkes',
        title: 'PRD Parkes | Residential Property Sales',
        description: 'No-obligation appraisals and strong residential sales reach across Parkes. Experienced agents with deep local knowledge.',
      },
      {
        name: 'Ray White Parkes',
        url: 'https://www.raywhite.com.au/offices/ray-white-parkes',
        title: 'Ray White Parkes | Residential & Rural Property',
        description: 'National network with local expertise. Residential listings including houses, rural lifestyle, and investment properties.',
      },
    ],
  },
]

/** Look up a response by date, LLM, and location */
export function findAiResponse(date: string, llm: string, location: string): AiResponseEntry | undefined {
  return AI_RESPONSES.find(
    r => r.date === date && r.llm === llm && r.location === location
  )
}
