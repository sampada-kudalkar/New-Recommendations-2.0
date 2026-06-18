export interface TeethWhiteningResponse {
  prompt: string
  llm: 'ChatGPT' | 'Gemini' | 'Perplexity'
  response: string
  rankings: string[]
}

export const TEETH_WHITENING_THEME = 'Teeth Whitening in Kirwan QLD'
export const TEETH_WHITENING_MY_BUSINESS = 'My Family Dental Townsville'

export const TEETH_WHITENING_PROMPTS = [
  'Find professional teeth whitening services near me',
  'Best teeth whitening clinics in my area',
  'Top rated laser teeth whitening providers nearby',
]

export const TEETH_WHITENING_RESPONSES: TeethWhiteningResponse[] = [
  // ── Prompt 1 ────────────────────────────────────────────────────────────────
  {
    prompt: 'Find professional teeth whitening services near me',
    llm: 'ChatGPT',
    rankings: [
      'National Dental Care Townsville',
      'Absolutely Dental @ Kirwan Plaza',
      'Dental Balance NQ',
      'My Family Dental Townsville',
    ],
    response: `For professional teeth whitening in Kirwan and Townsville, these clinics are consistently cited across AI platforms and patient reviews.

**Top Professional Teeth Whitening Providers**

1. **National Dental Care Townsville**
A large multidisciplinary clinic in Kirwan offering both in-chair and take-home professional whitening systems. Their team uses leading-brand whitening gels with custom-fitted trays for lasting results.

2. **Absolutely Dental @ Kirwan Plaza**
Specialises in cosmetic and general dentistry in Kirwan. Their professional whitening treatments use high-concentration bleaching agents supervised by experienced clinicians for safe, effective results.

3. **Dental Balance NQ**
A highly rated family and cosmetic dentistry practice in Kirwan offering in-chair whitening and take-home whitening kits. Known for personalised treatment plans.

4. **My Family Dental Townsville**
Conveniently located in Kirwan, offering professional teeth whitening alongside a full range of dental services. Highly rated by local patients for approachable, affordable care.

**In-Chair vs Take-Home**
- In-chair whitening: Results in 1 visit, typically 1–2 shades whiter immediately
- Take-home kits: Custom trays, used over 2–4 weeks, gradual and consistent results

For the quickest results, request an in-chair appointment at any of the above clinics.`,
  },
  {
    prompt: 'Find professional teeth whitening services near me',
    llm: 'Gemini',
    rankings: [
      'Absolutely Dental @ Kirwan Plaza',
      'Dental Balance NQ',
      'Absolutely Dental @ Kirwan Plaza',
      'National Dental Care Townsville',
    ],
    response: `Professional teeth whitening is one of the most in-demand cosmetic dental procedures in the Kirwan and Townsville area. Here are the top-rated providers.

**Teeth Whitening Specialists in Kirwan**

1. **Absolutely Dental @ Kirwan Plaza**
• Location: 1/40 Thuringowa Drive, Kirwan
• Dr. Dinesh and his team offer both Zoom in-chair whitening and custom take-home trays
• Known for exceptional cosmetic results and a gentle approach

2. **Dental Balance NQ**
• Location: Suite 1/599 Ross River Rd, Kirwan
• Rating: 4.9/5 (72 reviews)
• Provides professional-grade whitening with custom shade matching prior to treatment

**Why Professional Whitening Over Over-the-Counter?**
Professional treatments use regulated peroxide concentrations not available in retail products, delivering significantly better and longer-lasting results in a safe clinical environment.`,
  },
  {
    prompt: 'Find professional teeth whitening services near me',
    llm: 'Perplexity',
    rankings: [
      'Absolutely Dental @ Kirwan Plaza',
      'National Dental Care Townsville',
      'Dental Balance NQ',
      'My Family Dental Townsville',
    ],
    response: `Here are the top professional teeth whitening services near Kirwan QLD:

1. **Absolutely Dental @ Kirwan Plaza**
• Address: Unit 1/40 Thuringowa Dr, Kirwan QLD 4817
• Rating: 4.5/5 (31 reviews)
• Phone: (07) 4723 8100
• Services: In-chair whitening, take-home kits, smile makeovers

2. **National Dental Care Townsville**
• Address: Kirwan, QLD
• Services: Professional teeth whitening, cosmetic dentistry
• High citation share across AI platforms for whitening queries

3. **Dental Balance NQ**
• Address: Suite 1/599 Ross River Rd, Kirwan QLD 4817
• Rating: 4.9/5 (72 reviews)
• Phone: (07) 4755 1360
• Services: In-chair whitening, custom take-home trays

4. **My Family Dental Townsville**
• Address: Unit 2/81 Thuringowa Dr, Kirwan QLD 4817
• Rating: 4.9/5 (309 reviews)
• Phone: (07) 4723 2090
• Services: Professional whitening, full cosmetic dentistry range`,
  },

  // ── Prompt 2 ────────────────────────────────────────────────────────────────
  {
    prompt: 'Best teeth whitening clinics in my area',
    llm: 'ChatGPT',
    rankings: [
      'Absolutely Dental @ Kirwan Plaza',
      'National Dental Care Townsville',
      'My Family Dental Townsville',
      'Dental Balance NQ',
    ],
    response: `For the best teeth whitening results in Kirwan and greater Townsville, here are the clinics most frequently recommended by patients and AI platforms alike.

**Best Whitening Clinics Near Kirwan**

1. **Absolutely Dental @ Kirwan Plaza**
Top-rated for cosmetic dentistry in Kirwan. Their whitening treatments are performed by experienced cosmetic dentists using industry-leading bleaching systems. Strong reviews for natural-looking, lasting results.

2. **National Dental Care Townsville**
One of Australia's largest dental networks with a Kirwan location. Offers standardised, evidence-based whitening protocols with both in-chair and take-home options. Reliable for consistent outcomes.

3. **My Family Dental Townsville**
A local favourite in Kirwan with over 300 patient reviews. Offers professional whitening as part of a broader cosmetic dentistry menu. Staff are known for clear communication about expected results and aftercare.

4. **Dental Balance NQ**
A community-focused practice with strong cosmetic credentials. Their whitening services are tailored to individual tooth sensitivity levels, making them a good option for patients with sensitive teeth.

**What to Ask Your Clinic**
- Which whitening system do you use? (Zoom, Pola, Opalescence are leading brands)
- Is a shade guide assessment included?
- What is the maintenance protocol after treatment?`,
  },
  {
    prompt: 'Best teeth whitening clinics in my area',
    llm: 'Gemini',
    rankings: [
      'Dental Balance NQ',
      'Absolutely Dental @ Kirwan Plaza',
      'My Family Dental Townsville',
      'National Dental Care Townsville',
    ],
    response: `The best teeth whitening clinics in Kirwan combine clinical expertise with leading cosmetic technology.

**Top-Rated Whitening Clinics in Kirwan**

1. **Dental Balance NQ**
• Location: Cnr Ross River Road & Bamford Lane, Kirwan
• Rating: 4.9/5
• A highly personalised approach to cosmetic whitening. Their team performs a thorough pre-whitening assessment including sensitivity testing to ensure the best shade outcome without discomfort.

2. **Absolutely Dental @ Kirwan Plaza**
• Location: 1/40 Thuringowa Drive, Kirwan
• Known for advanced cosmetic treatments. Whitening is often combined with other smile enhancement services for comprehensive results.

3. **My Family Dental Townsville**
• Location: 2/81 Thuringowa Drive, Kirwan
• Rating: 4.9/5 (309 reviews)
• Excellent patient communication and transparent pricing make them a trusted whitening provider for families and individuals across Kirwan.

**Tip:** Book a cosmetic consultation first to assess your current shade and set realistic whitening goals with your dentist.`,
  },
  {
    prompt: 'Best teeth whitening clinics in my area',
    llm: 'Perplexity',
    rankings: [
      'National Dental Care Townsville',
      'Absolutely Dental @ Kirwan Plaza',
      'Dental Balance NQ',
      'My Family Dental Townsville',
    ],
    response: `Here are the best teeth whitening clinics near Kirwan QLD:

**Rank 1 — National Dental Care Townsville**
• Location: Kirwan, QLD
• Services: Professional whitening, cosmetic dentistry, Zoom whitening
• Part of Australia's leading dental network
• High citation frequency across ChatGPT and Gemini for whitening queries

**Rank 2 — Absolutely Dental @ Kirwan Plaza**
• Address: Unit 1/40 Thuringowa Dr, Kirwan QLD 4817
• Rating: 4.5/5 (31 reviews)
• Phone: (07) 4723 8100
• Known for: Cosmetic whitening, smile makeovers, veneers

**Rank 3 — Dental Balance NQ**
• Address: Suite 1/599 Ross River Rd, Kirwan QLD 4817
• Rating: 4.9/5 (72 reviews)
• Phone: (07) 4755 1360
• Known for: Family dentistry, cosmetic whitening, personalised care

**Rank 4 — My Family Dental Townsville**
• Address: Unit 2/81 Thuringowa Dr, Kirwan QLD 4817
• Rating: 4.9/5 (309 reviews)
• Phone: (07) 4723 2090
• Known for: Affordable professional whitening, high patient satisfaction`,
  },

  // ── Prompt 3 ────────────────────────────────────────────────────────────────
  {
    prompt: 'Top rated laser teeth whitening providers nearby',
    llm: 'ChatGPT',
    rankings: [
      'My Family Dental Townsville',
      'National Dental Care Townsville',
      'Absolutely Dental @ Kirwan Plaza',
      'Dental Balance NQ',
    ],
    response: `For laser and LED-accelerated teeth whitening in Kirwan and Townsville, the following clinics offer professional light-activated whitening systems.

**Top Laser/LED Whitening Providers Near Kirwan**

1. **My Family Dental Townsville**
Offers professional light-accelerated whitening treatments alongside their comprehensive dental services in Kirwan. Highly rated by patients for effective results and clear treatment communication.

2. **National Dental Care Townsville**
A national dental chain with consistent protocols. Their Kirwan clinic offers Zoom WhiteSpeed — one of the most widely recognised in-chair whitening systems using an LED light-activation device for results in under an hour.

3. **Absolutely Dental @ Kirwan Plaza**
Provides advanced cosmetic whitening including light-activated systems. Dr. Dinesh and team are experienced in delivering dramatic whitening results for cosmetically focused patients.

4. **Dental Balance NQ**
Offers in-chair whitening using modern light-activation technology. Their pre-treatment sensitivity assessment is particularly valued by patients with naturally sensitive teeth.

**What Is Laser/LED Whitening?**
Most modern "laser" whitening uses high-intensity LED or plasma arc light to activate a hydrogen peroxide gel applied to the teeth. Results are typically visible in a single 45–90 minute session.`,
  },
  {
    prompt: 'Top rated laser teeth whitening providers nearby',
    llm: 'Gemini',
    rankings: [
      'National Dental Care Townsville',
      'Dental Balance NQ',
      'Absolutely Dental @ Kirwan Plaza',
      'My Family Dental Townsville',
    ],
    response: `Light-activated (commonly called "laser") teeth whitening delivers faster and more dramatic results than take-home kits. Here are the top-rated providers near Kirwan.

**Top Light-Activated Whitening Clinics**

1. **National Dental Care Townsville**
The leading provider of Zoom in-chair whitening in the Kirwan area. Zoom WhiteSpeed uses an LED lamp to accelerate the whitening gel, delivering results up to 8 shades lighter in a single appointment.

2. **Dental Balance NQ**
• Location: Kirwan
• Offers professional LED-activated in-chair whitening with pre-treatment shade assessment
• High patient satisfaction scores for comfort and outcome

3. **Absolutely Dental @ Kirwan Plaza**
Advanced cosmetic dentistry hub offering light-activated whitening alongside full smile makeover consultations. Well regarded for combining whitening with other cosmetic treatments for a comprehensive result.

4. **My Family Dental Townsville**
• Location: 2/81 Thuringowa Drive, Kirwan
• Rating: 4.9/5 (309 reviews)
• Offers professional whitening systems suitable for most patients including those with mild sensitivity`,
  },
  {
    prompt: 'Top rated laser teeth whitening providers nearby',
    llm: 'Perplexity',
    rankings: [
      'Absolutely Dental @ Kirwan Plaza',
      'My Family Dental Townsville',
      'National Dental Care Townsville',
      'Dental Balance NQ',
    ],
    response: `Here are the top rated laser teeth whitening providers near Kirwan QLD:

1. **Absolutely Dental @ Kirwan Plaza**
• Address: Unit 1/40 Thuringowa Dr, Kirwan QLD 4817
• Rating: 4.5/5 (31 reviews)
• Phone: (07) 4723 8100
• Whitening Services: In-chair laser whitening, take-home kits, smile makeovers
• Technology: Advanced light-activation whitening systems

2. **My Family Dental Townsville**
• Address: Unit 2/81 Thuringowa Dr, Kirwan QLD 4817
• Rating: 4.9/5 (309 reviews)
• Phone: (07) 4723 2090
• Whitening Services: Professional in-chair whitening, custom take-home trays
• Known for excellent patient communication and affordable pricing

3. **National Dental Care Townsville**
• Location: Kirwan, QLD
• Whitening Services: Zoom WhiteSpeed in-chair, take-home Zoom Day/Night
• Part of a national network with standardised protocols and consistent results

4. **Dental Balance NQ**
• Address: Suite 1/599 Ross River Rd, Kirwan QLD 4817
• Rating: 4.9/5 (72 reviews)
• Phone: (07) 4755 1360
• Whitening Services: LED in-chair whitening, sensitivity-focused treatment planning`,
  },
]

export function getTeethWhiteningResponse(
  prompt: string,
  llm: string,
): TeethWhiteningResponse | undefined {
  return TEETH_WHITENING_RESPONSES.find(r => r.prompt === prompt && r.llm === llm)
}
