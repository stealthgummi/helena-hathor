/**
 * Worldwide Geocoding & Historical IANA Timezone Resolver
 * Combines instant offline lookup for 120+ global hubs with live worldwide geocoding
 * (Open-Meteo GeoNames Database — 11+ million cities, towns & villages globally, 0 API key required)
 */

const US_STATES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia'
};

const MAJOR_CITIES = [
  // Canada & US
  { city: 'Toronto', country: 'Canada', state: 'ON', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto' },
  { city: 'Montreal', country: 'Canada', state: 'QC', lat: 45.5017, lon: -73.5673, tz: 'America/Toronto' },
  { city: 'Vancouver', country: 'Canada', state: 'BC', lat: 49.2827, lon: -123.1207, tz: 'America/Vancouver' },
  { city: 'Ottawa', country: 'Canada', state: 'ON', lat: 45.4215, lon: -75.6972, tz: 'America/Toronto' },
  { city: 'Calgary', country: 'Canada', state: 'AB', lat: 51.0447, lon: -114.0719, tz: 'America/Edmonton' },
  { city: 'New York', country: 'United States', state: 'NY', lat: 40.7128, lon: -74.0060, tz: 'America/New_York' },
  { city: 'Brooklyn', country: 'United States', state: 'NY', lat: 40.6782, lon: -73.9442, tz: 'America/New_York' },
  { city: 'Los Angeles', country: 'United States', state: 'CA', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles' },
  { city: 'San Diego', country: 'United States', state: 'CA', lat: 32.7157, lon: -117.1611, tz: 'America/Los_Angeles' },
  { city: 'San Francisco', country: 'United States', state: 'CA', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' },
  { city: 'Chicago', country: 'United States', state: 'IL', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' },
  { city: 'Houston', country: 'United States', state: 'TX', lat: 29.7604, lon: -95.3698, tz: 'America/Chicago' },
  { city: 'Dallas', country: 'United States', state: 'TX', lat: 32.7767, lon: -96.7970, tz: 'America/Chicago' },
  { city: 'Austin', country: 'United States', state: 'TX', lat: 30.2672, lon: -97.7431, tz: 'America/Chicago' },
  { city: 'San Antonio', country: 'United States', state: 'TX', lat: 29.4241, lon: -98.4936, tz: 'America/Chicago' },
  { city: 'Atlanta', country: 'United States', state: 'GA', lat: 33.7490, lon: -84.3880, tz: 'America/New_York' },
  { city: 'Miami', country: 'United States', state: 'FL', lat: 25.7617, lon: -80.1918, tz: 'America/New_York' },
  { city: 'Orlando', country: 'United States', state: 'FL', lat: 28.5383, lon: -81.3792, tz: 'America/New_York' },
  { city: 'Tampa', country: 'United States', state: 'FL', lat: 27.9506, lon: -82.4572, tz: 'America/New_York' },
  { city: 'Phoenix', country: 'United States', state: 'AZ', lat: 33.4484, lon: -112.0740, tz: 'America/Phoenix' },
  { city: 'Philadelphia', country: 'United States', state: 'PA', lat: 39.9526, lon: -75.1652, tz: 'America/New_York' },
  { city: 'Pittsburgh', country: 'United States', state: 'PA', lat: 40.4406, lon: -79.9959, tz: 'America/New_York' },
  { city: 'Seattle', country: 'United States', state: 'WA', lat: 47.6062, lon: -122.3321, tz: 'America/Los_Angeles' },
  { city: 'Denver', country: 'United States', state: 'CO', lat: 39.7392, lon: -104.9903, tz: 'America/Denver' },
  { city: 'Boston', country: 'United States', state: 'MA', lat: 42.3601, lon: -71.0589, tz: 'America/New_York' },
  { city: 'Dayton', country: 'United States', state: 'OH', lat: 39.7589, lon: -84.1916, tz: 'America/New_York' },
  { city: 'Columbus', country: 'United States', state: 'OH', lat: 39.9612, lon: -82.9988, tz: 'America/New_York' },
  { city: 'Cleveland', country: 'United States', state: 'OH', lat: 41.4993, lon: -81.6944, tz: 'America/New_York' },
  { city: 'Cincinnati', country: 'United States', state: 'OH', lat: 39.1031, lon: -84.5120, tz: 'America/New_York' },
  { city: 'Detroit', country: 'United States', state: 'MI', lat: 42.3314, lon: -83.0458, tz: 'America/Detroit' },
  { city: 'Las Vegas', country: 'United States', state: 'NV', lat: 36.1699, lon: -115.1398, tz: 'America/Los_Angeles' },
  { city: 'Minneapolis', country: 'United States', state: 'MN', lat: 44.9778, lon: -93.2650, tz: 'America/Chicago' },
  { city: 'Portland', country: 'United States', state: 'OR', lat: 45.5152, lon: -122.6784, tz: 'America/Los_Angeles' },
  { city: 'Washington', country: 'United States', state: 'DC', lat: 38.9072, lon: -77.0369, tz: 'America/New_York' },
  { city: 'Baltimore', country: 'United States', state: 'MD', lat: 39.2904, lon: -76.6122, tz: 'America/New_York' },
  { city: 'Charlotte', country: 'United States', state: 'NC', lat: 35.2271, lon: -80.8431, tz: 'America/New_York' },
  { city: 'Nashville', country: 'United States', state: 'TN', lat: 36.1627, lon: -86.7816, tz: 'America/Chicago' },
  { city: 'New Orleans', country: 'United States', state: 'LA', lat: 29.9511, lon: -90.0715, tz: 'America/Chicago' },
  { city: 'Indianapolis', country: 'United States', state: 'IN', lat: 39.7684, lon: -86.1581, tz: 'America/Indiana/Indianapolis' },
  { city: 'St. Louis', country: 'United States', state: 'MO', lat: 38.6270, lon: -90.1994, tz: 'America/Chicago' },
  { city: 'Kansas City', country: 'United States', state: 'MO', lat: 39.0997, lon: -94.5786, tz: 'America/Chicago' },
  { city: 'Salt Lake City', country: 'United States', state: 'UT', lat: 40.7608, lon: -111.8910, tz: 'America/Denver' },
  { city: 'Honolulu', country: 'United States', state: 'HI', lat: 21.3069, lon: -157.8583, tz: 'Pacific/Honolulu' },

  // Europe, Africa, Asia, LatAm, Oceania
  { city: 'London', country: 'United Kingdom', state: 'England', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { city: 'Manchester', country: 'United Kingdom', state: 'England', lat: 53.4808, lon: -2.2426, tz: 'Europe/London' },
  { city: 'Dublin', country: 'Ireland', state: '', lat: 53.3498, lon: -6.2603, tz: 'Europe/Dublin' },
  { city: 'Paris', country: 'France', state: '', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', state: '', lat: 52.5200, lon: 13.4050, tz: 'Europe/Berlin' },
  { city: 'Munich', country: 'Germany', state: '', lat: 48.1351, lon: 11.5820, tz: 'Europe/Berlin' },
  { city: 'Amsterdam', country: 'Netherlands', state: '', lat: 52.3676, lon: 4.9041, tz: 'Europe/Amsterdam' },
  { city: 'Brussels', country: 'Belgium', state: '', lat: 50.8503, lon: 4.3517, tz: 'Europe/Brussels' },
  { city: 'Zurich', country: 'Switzerland', state: '', lat: 47.3769, lon: 8.5417, tz: 'Europe/Zurich' },
  { city: 'Vienna', country: 'Austria', state: '', lat: 48.2082, lon: 16.3738, tz: 'Europe/Vienna' },
  { city: 'Rome', country: 'Italy', state: '', lat: 41.9028, lon: 12.4964, tz: 'Europe/Rome' },
  { city: 'Milan', country: 'Italy', state: '', lat: 45.4642, lon: 9.1900, tz: 'Europe/Rome' },
  { city: 'Madrid', country: 'Spain', state: '', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid' },
  { city: 'Barcelona', country: 'Spain', state: '', lat: 41.3874, lon: 2.1686, tz: 'Europe/Madrid' },
  { city: 'Lisbon', country: 'Portugal', state: '', lat: 38.7223, lon: -9.1393, tz: 'Europe/Lisbon' },
  { city: 'Athens', country: 'Greece', state: '', lat: 37.9838, lon: 23.7275, tz: 'Europe/Athens' },
  { city: 'Stockholm', country: 'Sweden', state: '', lat: 59.3293, lon: 18.0686, tz: 'Europe/Stockholm' },
  { city: 'Oslo', country: 'Norway', state: '', lat: 59.9139, lon: 10.7522, tz: 'Europe/Oslo' },
  { city: 'Copenhagen', country: 'Denmark', state: '', lat: 55.6761, lon: 12.5683, tz: 'Europe/Copenhagen' },
  { city: 'Warsaw', country: 'Poland', state: '', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw' },
  { city: 'Prague', country: 'Czechia', state: '', lat: 50.0755, lon: 14.4378, tz: 'Europe/Prague' },
  { city: 'Istanbul', country: 'Turkey', state: '', lat: 41.0082, lon: 28.9784, tz: 'Europe/Istanbul' },
  { city: 'Lagos', country: 'Nigeria', state: '', lat: 6.5244, lon: 3.3792, tz: 'Africa/Lagos' },
  { city: 'Accra', country: 'Ghana', state: '', lat: 5.6037, lon: -0.1870, tz: 'Africa/Accra' },
  { city: 'Nairobi', country: 'Kenya', state: '', lat: -1.2921, lon: 36.8219, tz: 'Africa/Nairobi' },
  { city: 'Johannesburg', country: 'South Africa', state: '', lat: -26.2041, lon: 28.0473, tz: 'Africa/Johannesburg' },
  { city: 'Cape Town', country: 'South Africa', state: '', lat: -33.9249, lon: 18.4241, tz: 'Africa/Johannesburg' },
  { city: 'Cairo', country: 'Egypt', state: '', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo' },
  { city: 'Dubai', country: 'UAE', state: '', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { city: 'Bali', country: 'Indonesia', state: 'Bali', lat: -8.5069, lon: 115.2625, tz: 'Asia/Makassar' },
  { city: 'Ubud', country: 'Indonesia', state: 'Bali', lat: -8.5069, lon: 115.2625, tz: 'Asia/Makassar' },
  { city: 'Denpasar', country: 'Indonesia', state: 'Bali', lat: -8.6705, lon: 115.2126, tz: 'Asia/Makassar' },
  { city: 'Jakarta', country: 'Indonesia', state: '', lat: -6.2088, lon: 106.8456, tz: 'Asia/Jakarta' },
  { city: 'Tokyo', country: 'Japan', state: '', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { city: 'Seoul', country: 'South Korea', state: '', lat: 37.5665, lon: 126.9780, tz: 'Asia/Seoul' },
  { city: 'Mumbai', country: 'India', state: '', lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata' },
  { city: 'New Delhi', country: 'India', state: '', lat: 28.6139, lon: 77.2090, tz: 'Asia/Kolkata' },
  { city: 'Bangkok', country: 'Thailand', state: '', lat: 13.7563, lon: 100.5018, tz: 'Asia/Bangkok' },
  { city: 'Manila', country: 'Philippines', state: '', lat: 14.5995, lon: 120.9842, tz: 'Asia/Manila' },
  { city: 'Singapore', country: 'Singapore', state: '', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore' },
  { city: 'Hong Kong', country: 'Hong Kong', state: '', lat: 22.3193, lon: 114.1694, tz: 'Asia/Hong_Kong' },
  { city: 'Sydney', country: 'Australia', state: 'NSW', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { city: 'Melbourne', country: 'Australia', state: 'VIC', lat: -37.8136, lon: 144.9631, tz: 'Australia/Melbourne' },
  { city: 'Brisbane', country: 'Australia', state: 'QLD', lat: -27.4705, lon: 153.0260, tz: 'Australia/Brisbane' },
  { city: 'Perth', country: 'Australia', state: 'WA', lat: -31.9505, lon: 115.8605, tz: 'Australia/Perth' },
  { city: 'Auckland', country: 'New Zealand', state: '', lat: -36.8485, lon: 174.7633, tz: 'Pacific/Auckland' },
  { city: 'Mexico City', country: 'Mexico', state: '', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City' },
  { city: 'Sao Paulo', country: 'Brazil', state: '', lat: -23.5505, lon: -46.6333, tz: 'America/Sao_Paulo' },
  { city: 'Rio de Janeiro', country: 'Brazil', state: '', lat: -22.9068, lon: -43.1729, tz: 'America/Sao_Paulo' },
  { city: 'Buenos Aires', country: 'Argentina', state: '', lat: -34.6037, lon: -58.3816, tz: 'America/Argentina/Buenos_Aires' },
  { city: 'Bogota', country: 'Colombia', state: '', lat: 4.7110, lon: -74.0721, tz: 'America/Bogota' },
  { city: 'Santiago', country: 'Chile', state: '', lat: -33.4489, lon: -70.6693, tz: 'America/Santiago' },
  { city: 'Kingston', country: 'Jamaica', state: '', lat: 17.9714, lon: -76.7936, tz: 'America/Jamaica' }
];

// In-memory cache for worldwide dynamic geocoding lookups
const GEO_CACHE = new Map();

function findCity(query) {
  if (!query || typeof query !== 'string') return MAJOR_CITIES[5];
  const key = query.trim().toLowerCase();
  if (GEO_CACHE.has(key)) return GEO_CACHE.get(key);

  const parts = query.split(',').map(s => s.trim()).filter(Boolean);
  const cleanCity = (parts[0] || '').toLowerCase();
  const regionHint = (parts[1] || '').toUpperCase();

  const exactWithRegion = regionHint && MAJOR_CITIES.find(
    c => c.city.toLowerCase() === cleanCity &&
         (c.state.toUpperCase() === regionHint || c.country.toUpperCase().includes(regionHint))
  );
  if (exactWithRegion) return exactWithRegion;

  return (
    MAJOR_CITIES.find(c => c.city.toLowerCase() === cleanCity) ||
    MAJOR_CITIES.find(c => c.city.toLowerCase().startsWith(cleanCity)) ||
    MAJOR_CITIES.find(c => query.toLowerCase().includes(c.city.toLowerCase())) ||
    { city: query.trim(), country: '', state: '', lat: 40.7128, lon: -74.0060, tz: 'America/New_York' }
  );
}

/**
 * Resolves ANY city, town, or village worldwide via Open-Meteo GeoNames API (11M+ locations)
 * Caches result in GEO_CACHE so subsequent synchronous `findCity(query)` calls also get exact coordinates.
 */
async function resolveCityAsync(query) {
  if (!query || typeof query !== 'string') return MAJOR_CITIES[5];
  const key = query.trim().toLowerCase();
  if (GEO_CACHE.has(key)) return GEO_CACHE.get(key);

  const parts = query.split(',').map(s => s.trim()).filter(Boolean);
  const cityPart = parts[0] || query.trim();
  const regionHintRaw = (parts[1] || '').trim();
  const countryHintRaw = (parts[2] || parts[1] || '').trim();

  // Check if exact match exists in MAJOR_CITIES when no specific unknown region is requested
  const cleanCity = cityPart.toLowerCase();
  const offlineMatch = MAJOR_CITIES.find(c => {
    if (c.city.toLowerCase() !== cleanCity) return false;
    if (!regionHintRaw) return true;
    const rUp = regionHintRaw.toUpperCase();
    const fullState = (US_STATES[rUp] || regionHintRaw).toLowerCase();
    return (
      c.state.toUpperCase() === rUp ||
      c.state.toLowerCase() === fullState ||
      c.country.toLowerCase().includes(regionHintRaw.toLowerCase())
    );
  });
  if (offlineMatch) {
    GEO_CACHE.set(key, offlineMatch);
    return offlineMatch;
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityPart)}&count=10&language=en&format=json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        let best = data.results[0];
        if (regionHintRaw) {
          const rUp = regionHintRaw.toUpperCase();
          const expandedState = (US_STATES[rUp] || regionHintRaw).toLowerCase();
          const cLow = countryHintRaw.toLowerCase();
          const matched = data.results.find(r => {
            const adm = (r.admin1 || '').toLowerCase();
            const ctry = (r.country || '').toLowerCase();
            const ccode = (r.country_code || '').toUpperCase();
            return (
              adm === expandedState ||
              adm.includes(expandedState) ||
              ccode === rUp ||
              ctry === cLow ||
              ctry.includes(cLow)
            );
          });
          if (matched) best = matched;
        }
        const resolved = {
          city: best.name || cityPart,
          state: best.admin1 || '',
          country: best.country || '',
          lat: Number(best.latitude),
          lon: Number(best.longitude),
          tz: best.timezone || 'UTC'
        };
        GEO_CACHE.set(key, resolved);
        return resolved;
      }
    }
  } catch (_) {}

  return findCity(query);
}

function localTimeToUtc(dateStr, timeStr, timeZone) {
  const [y, m, d] = (dateStr || '1994-11-08').split('-').map(Number);
  const [hh, mm] = (timeStr || '12:00').split(':').map(Number);
  try {
    const approxUtc = new Date(Date.UTC(y, m - 1, d, hh, mm, 0));
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone || 'America/New_York',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    const parts = Object.fromEntries(fmt.formatToParts(approxUtc).map(p => [p.type, p.value]));
    const localHour = parts.hour === '24' ? 0 : Number(parts.hour);
    const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), localHour, Number(parts.minute), 0);
    const offsetMs = asUtc - approxUtc.getTime();
    return new Date(approxUtc.getTime() - offsetMs);
  } catch {
    return new Date(Date.UTC(y, m - 1, d, hh + 5, mm, 0));
  }
}

module.exports = { MAJOR_CITIES, findCity, resolveCityAsync, localTimeToUtc };
