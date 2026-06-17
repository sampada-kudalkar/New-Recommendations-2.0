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
  // HTML-formatted response (rendered via dangerouslySetInnerHTML)
  htmlResponse?: string
  // For other LLMs — markdown-like plain text
  response: string
  citations: AiCitation[]
  // Position of our business in this response (1-indexed); null = not mentioned
  ourPosition?: number | null
  // Competitor businesses cited in this response (not including our business)
  mentionedCompetitors?: string[]
  // Competitor citation stats for the modal sidebar
  competitorStats?: { name: string; citations: number; percentage: number }[]
}

export function findResponseByPromptAndLlm(prompt: string, llm: string): AiResponseEntry | undefined {
  return AI_RESPONSES.find(r => r.prompt === prompt && r.llm === llm)
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
    competitorStats: [
      { name: 'Raine & Horne Dubbo', citations: 12, percentage: 96 },
      { name: 'Ray White Dubbo', citations: 8, percentage: 72 },
      { name: 'McGrath Dubbo', citations: 5, percentage: 58 },
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

// ── Teeth Whitening — Kirwan QLD ──────────────────────────────────────────────

AI_RESPONSES.push(
  // ── Prompt 1: "Find professional teeth whitening services near me" ──────────
  {
    date: 'Jan 10, 2026',
    llm: 'ChatGPT',
    location: 'Kirwan, QLD',
    prompt: 'Find professional teeth whitening services near me',
    ourPosition: 1,
    mentionedCompetitors: ['National Dental Care Townsville', 'Absolutely Dental @ Kirwan Plaza', 'Dental Balance NQ', 'Enhance Teeth Whitening'],
    chatGptIntro: "If you're looking for professional teeth whitening in Kirwan, these are some of the strongest local options:",
    chatGptBullets: [
      {
        agencyName: 'My Family Dental Townsville',
        agencyUrl: 'https://myfamilydentalqld.com.au/teeth-whitening-service',
        description: 'Offers professional in-chair and take-home whitening treatments, along with a full range of cosmetic dental services. The clinic has a large number of positive patient reviews and specifically advertises professional teeth whitening services.',
      },
      {
        agencyName: 'National Dental Care Townsville',
        description: 'Provides both in-chair and take-home whitening options. Their dentists assess your oral health and whitening goals before recommending a treatment plan.',
      },
      {
        agencyName: 'Absolutely Dental @ Kirwan Plaza, Townsville',
        description: 'Offers cosmetic dentistry services including professional teeth whitening and smile-enhancement treatments.',
      },
      {
        agencyName: 'Dental Balance NQ',
        description: 'A highly rated Kirwan dental practice offering cosmetic dental treatments and consultations that can include whitening options.',
      },
      {
        agencyName: 'Enhance Teeth Whitening',
        description: 'A dedicated teeth whitening provider in Kirwan focused specifically on whitening services.',
      },
    ],
    chatGptOutro: [
      'Before booking, it\'s worth asking:',
      'Cost of in-chair vs take-home whitening',
      'Expected shade improvement',
      'Whether a cleaning is recommended beforehand',
      'Any current whitening promotions or packages available.',
    ],
    response: '',
    citations: [],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Gemini',
    location: 'Kirwan, QLD',
    prompt: 'Find professional teeth whitening services near me',
    ourPosition: null,
    mentionedCompetitors: ['Absolutely Dental @ Kirwan Plaza', 'Dental Balance NQ', 'Aspire Dental', 'Casey Dentists'],
    response: `Several professional dental clinics in and around Kirwan, QLD offer teeth whitening services, ranging from fast in-chair laser treatments to custom take-home kits.

**Dental Clinics Located in Kirwan**

**1. Absolutely Dental @ Kirwan Plaza**
Location: 1/40 Thuringowa Drive, Kirwan QLD 4817
Contact: (07) 4723 8100
Whitening Options:
• In-Chair Whitening: They offer the popular Zoom Whitening system for fast, immediate results in a single visit.
• Custom Take-Home Trays: They create personalized dental trays and provide professional-strength bleaching gel. They recommend this approach as a highly controlled, cost-effective option that minimizes tooth sensitivity.

**2. Dental Balance NQ**
Location: 1/599 Ross River Road (Corner of Ross River Road & Bamford Lane), Kirwan QLD 4817
Contact: (07) 4755 1360
Whitening Options:
• Custom Take-Home Kits: They specialize in custom-molded trays paired with the premium Opalescence dental-grade bleaching gel range.
• Opalescence Go (15%): Pre-filled, grab-and-go professional whitening trays over the counter, complete with clinic guidance on how to use them safely.

**Nearby Clinics Servicing Kirwan**

• Aspire Dental: Offers complete cosmetic "smile design" consultations, which include professional teeth whitening procedures tailored to your facial features. Contact: (07) 4773 3662
• Casey Dentists: Located a short distance away, they frequently run cosmetic packages, such as an In-Chair Teeth Whitening special that includes a complimentary take-home touch-up kit.

**Important Considerations Before You Go**
• Dental Health Check: In Australia, professional dental guidelines require a brief assessment of your teeth and gums before any strong whitening treatment is applied.
• Health Funds & Rebates: Both Absolutely Dental and Dental Balance NQ are equipped with HICAPS, allowing you to claim instant, on-the-spot rebates.
• Payment Plans: Options like Zip, Afterpay, and Humm are widely accepted at these practices.`,
    citations: [],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Perplexity',
    location: 'Kirwan, QLD',
    prompt: 'Find professional teeth whitening services near me',
    ourPosition: 1,
    mentionedCompetitors: ['Absolutely Dental @ Kirwan Plaza', 'National Dental Care Townsville', 'Dental Balance NQ'],
    response: `Here are the professional teeth whitening services located in Kirwan QLD:

**1. My Family Dental Townsville (Kirwan)**
Address: Unit 2/81 Thuringowa Dr, Kirwan QLD 4817
Phone: (07) 4723 2090
Rating: 4.9/5 (309 reviews)
Categories: Teeth whitening service, Cosmetic dentist, Dental clinic
Hours: Mon–Wed & Thu–Fri: 8:30am–5:00pm
Book online: www.myfamilydentalqld.com.au

**2. Absolutely Dental @ Kirwan Plaza**
Address: Unit 1/40 Thuringowa Dr, Kirwan QLD 4817
Phone: (07) 4723 8100
Rating: 4.5/5 (31 reviews)
Categories: Teeth whitening service, Cosmetic dentist, Dental implants periodontist
Hours: Mon, Wed & Fri: 8:00am–5:00pm

**3. National Dental Care Townsville (Confidence Dental Kirwan)**
Address: 69 Thuringowa Dr, Kirwan QLD 4817
Phone: (07) 4773 1455
Rating: 4.8/5 (119 reviews)
Categories: Cosmetic dentist, Dental clinic
Hours: Mon–Wed & Thu–Fri: 8:00am–5:00pm; Sat: 8:00am–1:00pm
Services: Teeth whitening and smile improvements

**4. Dental Balance NQ**
Address: 599 Ross River Rd, Kirwan QLD
Phone: (07) 4755 1106
Description: Townsville's newest dental centre offering family and cosmetic dentistry including teeth whitening

Note: All of these are dental clinics offering professional in-chair or take-home teeth whitening treatments. Appointments are recommended for all.`,
    citations: [],
  },

  // ── Prompt 2: "Best teeth whitening clinics in my area" ────────────────────
  {
    date: 'Jun 9, 2026',
    llm: 'ChatGPT',
    location: 'Kirwan QLD',
    prompt: 'Best teeth whitening clinics in my area',
    ourPosition: 1,
    mentionedCompetitors: ['National Dental Care Townsville', 'Absolutely Dental @ Kirwan Plaza', 'Dental Balance NQ', 'Enhance Teeth Whitening'],
    htmlResponse: `<p>If you're seeking professional teeth whitening services in Kirwan, Australia, here are two reputable dental clinics to consider:</p>
<p><strong><a href="http://www.absolutelydental.com.au/?utm_source=openai">Absolutely Dental @ Kirwan Plaza, Townsville</a></strong><br>
<strong><span class="rec-exec-status-closed">Closed</span> · Cosmetic dentist · 4.5 (31 reviews)</strong><br>
<em>Unit 1/40 Thuringowa Dr, Kirwan QLD 4817, Australia</em><br>
Offers cosmetic and general dentistry services, including teeth whitening. Located at 1/40 Thuringowa Drive, Kirwan, QLD 4817. Open Monday, Wednesday, and Friday from 8:00 AM to 5:00 PM.</p>
<p><strong><a href="https://www.nationaldentalcare.com.au/townsville?utm_source=openai">National Dental Care Townsville</a></strong><br>
<strong><span class="rec-exec-status-closed">Closed</span> · Dentist · 4.8 (119 reviews)</strong><br>
<em>69 Thuringowa Dr, Kirwan QLD 4817, Australia</em><br>
Provides a range of dental services such as check-ups, hygiene cleans, and teeth whitening. Located at 69 Thuringowa Drive, Kirwan, QLD 4817. Open Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 8:00 AM to 1:00 PM.</p>
<p>Both clinics are well-regarded in the Kirwan area for their professional dental services. It's advisable to contact them directly to discuss your teeth whitening needs and to schedule an appointment.</p>`,
    response: '',
    citations: [
      {
        name: 'Absolutelydental',
        url: 'https://www.absolutelydental.com.au/?utm_source=openai',
        title: 'Absolutely Dental @ Kirwan Plaza, Townsville',
        description: '',
      },
      {
        name: 'Nationaldentalcare',
        url: 'https://www.nationaldentalcare.com.au/townsville?utm_source=openai',
        title: 'Your Local Townsville Dentist',
        description: 'Our Townsville dentists and hygienists at Confidence Dental (part of National Dental Care) work with you to improve your overall dental health. Book online.',
      },
    ],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Gemini',
    location: 'Kirwan, QLD',
    prompt: 'Best teeth whitening clinics in my area',
    ourPosition: 2,
    mentionedCompetitors: ['Absolutely Dental @ Kirwan Plaza', 'Dental Balance NQ', 'Casey Dentists', 'Aspire Dental'],
    response: `When looking for the best professional teeth whitening in Kirwan, the top-rated clinics are chosen based on their patient reviews, cosmetic expertise, and advanced technology.

**Top-Rated Clinics in Kirwan QLD**

**1. Absolutely Dental (Kirwan Plaza)**
Widely regarded as a premier choice for cosmetic dentistry in Townsville, Absolutely Dental specializes in "Smile Makeovers." They are highly rated for their modern facilities and use of advanced technology to deliver efficient whitening results.
Location: 1/40 Thuringowa Drive, Kirwan
Why it's top-rated: They offer tailored aesthetic plans, seamless HICAPS instant health fund rebates, and a flexible array of interest-free payment plans.
Payment Flexibility: Accepts Zip, Afterpay, and Humm.

**2. My Family Dental Townsville (Kirwan Clinic)**
Boasting over 230+ glowing Google reviews across their Townsville presence, this clinic is a local favourite. It combines the 30+ year local legacy with modern cosmetic techniques.
Location: 2/81 Thuringowa Drive, Kirwan
Why it's top-rated: Patient reviews consistently praise their incredibly gentle, anxiety-free approach. If you have sensitive teeth but still want a bright smile, their tailored whitening protocols minimize discomfort.

**3. Dental Balance**
If you prefer supporting independent, locally owned businesses, Dental Balance is highly recommended. Located right on the corner of Ross River Road, they focus heavily on relationship-based care and ethical cosmetic dentistry.
Location: Cnr Ross River Road & Bamford Lane, Kirwan
Why it's top-rated: They don't use high-pressure corporate sales tactics. They focus on custom-molded whitening trays using premium-grade gels like Opalescence.

**Top Premium Alternatives Near Kirwan**

• Casey Dentists: Renowned for luxury-tier cosmetic work. They frequently bundle complimentary professional teeth whitening kits with their larger veneer or smile design packages.
• Aspire Dental: Known for their comprehensive "Smile Design" consultations, where teeth whitening is precisely calibrated against your natural facial features.

**A Quick Tip on Timing:** If you have a major event coming up, In-Chair Laser Whitening (offered at Absolutely Dental) will give you immediate results in about an hour. If you have a few weeks to spare, Custom Take-Home Kits (favoured by Dental Balance) take about 7–14 days but often result in less temporary tooth sensitivity.`,
    citations: [],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Perplexity',
    location: 'Kirwan, QLD',
    prompt: 'Best teeth whitening clinics in my area',
    ourPosition: 1,
    mentionedCompetitors: ['Dental Balance NQ', 'National Dental Care Townsville', 'Absolutely Dental @ Kirwan Plaza'],
    response: `Here are the best teeth whitening clinics in Kirwan QLD, ranked by reviews and ratings:

**1. My Family Dental Townsville — 4.9/5 (309 reviews)**
Address: Unit 2/81 Thuringowa Dr, Kirwan QLD 4817
Phone: (07) 4723 2090
Offers professional in-chair & take-home teeth whitening
Hours: Mon–Fri 8:30am–5:00pm
Book online: myfamilydentalqld.com.au

**2. Dental Balance NQ — 4.9/5 (72 reviews)**
Address: Suite 1/599 Ross River Rd, Kirwan QLD 4817
Phone: (07) 4755 1360
Kirwan's newest dental centre with cosmetic dentistry
Hours: Mon 8:30am–5pm, Tue 9am–5:30pm, Wed 8:30am–5pm, Thu 9am–5:30pm, Fri 9am–1pm

**3. National Dental Care Townsville — 4.8/5 (119 reviews)**
Address: 69 Thuringowa Dr, Kirwan QLD 4817
Phone: (07) 4773 1455
Comprehensive general & cosmetic dentistry
Hours: Mon–Fri 8am–5pm, Sat 8am–1pm

**4. Absolutely Dental @ Kirwan Plaza — 4.5/5 (31 reviews)**
Address: Unit 1/40 Thuringowa Dr, Kirwan QLD 4817
Phone: (07) 4723 8100

All clinics require appointments and accept credit/debit cards and NFC payments.`,
    citations: [],
  },

  // ── Claude entries ─────────────────────────────────────────────────────────
  {
    date: 'Jan 10, 2026',
    llm: 'Claude',
    location: 'Kirwan, QLD',
    prompt: 'Find professional teeth whitening services near me',
    ourPosition: null,
    mentionedCompetitors: ['Dental Balance NQ', 'Aspire Dental'],
    response: `For professional teeth whitening in Kirwan QLD, I'd recommend checking out **Dental Balance NQ** and **Aspire Dental**. Both offer in-chair whitening treatments with qualified practitioners.`,
    citations: [],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Claude',
    location: 'Kirwan, QLD',
    prompt: 'Best teeth whitening clinics in my area',
    ourPosition: null,
    mentionedCompetitors: ['National Dental Care Townsville', 'Casey Dentists', 'Enhance Teeth Whitening'],
    response: `Based on reviews and ratings in the Kirwan area, **National Dental Care Townsville**, **Casey Dentists**, and **Enhance Teeth Whitening** are highly regarded for cosmetic whitening treatments.`,
    citations: [],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Claude',
    location: 'Kirwan, QLD',
    prompt: 'Top rated laser teeth whitening providers nearby',
    ourPosition: null,
    mentionedCompetitors: ['Absolutely Dental @ Kirwan Plaza', 'Dental Balance NQ'],
    response: `For laser teeth whitening near Kirwan, **Absolutely Dental @ Kirwan Plaza** and **Dental Balance NQ** both offer advanced whitening technology with experienced cosmetic dentists.`,
    citations: [],
  },

  // ── Google AI mode entries ─────────────────────────────────────────────────
  {
    date: 'Jan 10, 2026',
    llm: 'Google AI mode',
    location: 'Kirwan, QLD',
    prompt: 'Find professional teeth whitening services near me',
    ourPosition: null,
    mentionedCompetitors: ['Aspire Dental', 'Casey Dentists', 'Enhance Teeth Whitening'],
    response: `Professional teeth whitening services near Kirwan QLD include **Aspire Dental**, **Casey Dentists**, and **Enhance Teeth Whitening** — all offering both in-chair and take-home whitening options.`,
    citations: [],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Google AI mode',
    location: 'Kirwan, QLD',
    prompt: 'Best teeth whitening clinics in my area',
    ourPosition: null,
    mentionedCompetitors: ['Dental Balance NQ', 'Enhance Teeth Whitening'],
    response: `Top-rated teeth whitening clinics near you include **Dental Balance NQ** and **Enhance Teeth Whitening**, known for their modern facilities and strong patient satisfaction scores.`,
    citations: [],
  },
  {
    date: 'Jan 10, 2026',
    llm: 'Google AI mode',
    location: 'Kirwan, QLD',
    prompt: 'Top rated laser teeth whitening providers nearby',
    ourPosition: null,
    mentionedCompetitors: ['National Dental Care Townsville', 'Aspire Dental', 'Casey Dentists'],
    response: `For laser whitening near Kirwan, **National Dental Care Townsville**, **Aspire Dental**, and **Casey Dentists** are top-rated options with advanced cosmetic dental technology.`,
    citations: [],
  },
)
