export interface NsaTheme {
  label: string
  prompts: string[]
}

export const nsaThemesConfig: Record<string, NsaTheme> = {
  'property-appraisals': {
    label: 'Property Appraisals',
    prompts: [
      'Find local property appraisal experts near me for a free home value estimate.',
      'Looking for a professional property appraisal service for residential or rental properties in my area.',
      'Where can I get accurate online property appraisal or schedule an in-person property valuation?',
    ],
  },
  'rural-property-sales': {
    label: 'Rural Property Sales',
    prompts: [
      'Find real estate agencies specializing in rural property sales near me.',
      'What are the best businesses for buying and selling rural property in Australia?',
      'Looking for rural estate agents who can help with purchasing farm land or agri properties.',
    ],
  },
  'commercial-property-sales': {
    label: 'Commercial Property Sales',
    prompts: [
      'Find commercial property real estate agencies near me that specialize in property sales.',
      'Who are the top commercial property sales firms in Australia?',
      'Looking for companies that handle commercial property with land for sale in my area.',
    ],
  },
  'commercial-property-leasing': {
    label: 'Commercial Property Leasing',
    prompts: [
      'Find leading commercial property leasing agents near me for office and rental spaces.',
      'Connect with top-rated agents specializing in commercial property lease agreements and legal support in my city.',
      'Discover commercial property currently available for lease with an expert property management service.',
    ],
  },
  'real-estate-auctions': {
    label: 'Real Estate Auctions',
    prompts: [
      'Find real estate auction services near me for buying and selling properties.',
      'Search for a real estate agency specializing in property auctions in Australia.',
      'Connect with agents who organize and manage real estate auctions for residential and commercial properties.',
    ],
  },
  'residential-property-sales': {
    label: 'Residential Property Sales',
    prompts: [
      'Find real estate agencies near me specializing in residential property sales.',
      'Which property firms can help me buy or sell residential homes in my area?',
      'Contact a local realtor for professional assistance with selling my residential property.',
    ],
  },
  'residential-property-leasing': {
    label: 'Residential Property Leasing',
    prompts: [
      'Find residential property leasing agencies near me specializing in lease agreement and property management.',
      'Looking for real estate companies that offer residential properties for lease with comprehensive leasing services.',
      'Top-rated residential property leasing agents who assist with lease agreements and extensions.',
    ],
  },
}
