// Pool of realistic Australian locations (Suburb, STATE PostalCode)
export const AUSTRALIAN_LOCATIONS: string[] = [
  'Dubbo, NSW 2830',
  'Orange, NSW 2800',
  'Bathurst, NSW 2795',
  'Parkes, NSW 2870',
  'Forbes, NSW 2871',
  'Mudgee, NSW 2850',
  'Narromine, NSW 2821',
  'Wellington, NSW 2820',
  'Coonabarabran, NSW 2357',
  'Gilgandra, NSW 2827',
  'Molong, NSW 2866',
  'Canowindra, NSW 2804',
  'Cowra, NSW 2794',
  'Young, NSW 2594',
  'Griffith, NSW 2680',
  'Wagga Wagga, NSW 2650',
  'Tamworth, NSW 2340',
  'Armidale, NSW 2350',
  'Goulburn, NSW 2580',
  'Queanbeyan, NSW 2620',
  'Penrith, NSW 2750',
  'Liverpool, NSW 2170',
  'Campbelltown, NSW 2560',
  'Newcastle, NSW 2300',
  'Wollongong, NSW 2500',
  'Albury, NSW 2640',
  'Broken Hill, NSW 2880',
  'Lismore, NSW 2480',
  'Ballina, NSW 2478',
  'Byron Bay, NSW 2481',
  'Bondi Beach, NSW 2026',
  'Manly, NSW 2095',
  'Parramatta, NSW 2150',
  'Chatswood, NSW 2067',
  'Carlton, VIC 3053',
  'South Brisbane, QLD 4101',
  'North Adelaide, SA 5006',
  'Subiaco, WA 6008',
  'Battery Point, TAS 7004',
  'Alice Springs, NT 0870',
  'Civic, ACT 2601',
  'Cairns, QLD 4870',
]

// Simple LCG-based seeded PRNG so results are deterministic per recId
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let s = seed >>> 0
  const rand = () => {
    s = Math.imul(s ^ (s >>> 13), s | 1)
    s ^= s << 7
    s ^= s >>> 17
    return (s >>> 0) / 0x100000000
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function hashRecId(recId: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < recId.length; i++) {
    h ^= recId.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/**
 * Returns a deterministic list of `count` Australian location strings for the
 * given recommendation ID. The same recId always produces the same list.
 */
export function getLocationsForRec(recId: string, count: number): string[] {
  const seed = hashRecId(recId)
  const shuffled = seededShuffle(AUSTRALIAN_LOCATIONS, seed)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
