/**
 * Offline Geocoding & Historical Timezone Database for ShawtyAstrology PWA
 */

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
  { city: 'Chicago', country: 'United States', state: 'IL', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago' },
  { city: 'Houston', country: 'United States', state: 'TX', lat: 29.7604, lon: -95.3698, tz: 'America/Chicago' },
  { city: 'Atlanta', country: 'United States', state: 'GA', lat: 33.7490, lon: -84.3880, tz: 'America/New_York' },
  { city: 'Miami', country: 'United States', state: 'FL', lat: 25.7617, lon: -80.1918, tz: 'America/New_York' },
  { city: 'Phoenix', country: 'United States', state: 'AZ', lat: 33.4484, lon: -112.0740, tz: 'America/Phoenix' },
  { city: 'Philadelphia', country: 'United States', state: 'PA', lat: 39.9526, lon: -75.1652, tz: 'America/New_York' },
  { city: 'Dallas', country: 'United States', state: 'TX', lat: 32.7767, lon: -96.7970, tz: 'America/Chicago' },
  { city: 'Austin', country: 'United States', state: 'TX', lat: 30.2672, lon: -97.7431, tz: 'America/Chicago' },
  { city: 'San Francisco', country: 'United States', state: 'CA', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' },
  { city: 'Seattle', country: 'United States', state: 'WA', lat: 47.6062, lon: -122.3321, tz: 'America/Los_Angeles' },
  { city: 'Denver', country: 'United States', state: 'CO', lat: 39.7392, lon: -104.9903, tz: 'America/Denver' },
  { city: 'Boston', country: 'United States', state: 'MA', lat: 42.3601, lon: -71.0589, tz: 'America/New_York' },
  { city: 'Dayton', country: 'United States', state: 'OH', lat: 39.7589, lon: -84.1916, tz: 'America/New_York' },
  { city: 'Columbus', country: 'United States', state: 'OH', lat: 39.9612, lon: -82.9988, tz: 'America/New_York' },
  { city: 'Cleveland', country: 'United States', state: 'OH', lat: 41.4993, lon: -81.6944, tz: 'America/New_York' },
  { city: 'Cincinnati', country: 'United States', state: 'OH', lat: 39.1031, lon: -84.5120, tz: 'America/New_York' },
  { city: 'Bali', country: 'Indonesia', state: 'Bali', lat: -8.5069, lon: 115.2625, tz: 'Asia/Makassar' },
  { city: 'Ubud', country: 'Indonesia', state: 'Bali', lat: -8.5069, lon: 115.2625, tz: 'Asia/Makassar' },
  { city: 'Detroit', country: 'United States', state: 'MI', lat: 42.3314, lon: -83.0458, tz: 'America/Detroit' },
  { city: 'Las Vegas', country: 'United States', state: 'NV', lat: 36.1699, lon: -115.1398, tz: 'America/Los_Angeles' },
  { city: 'Minneapolis', country: 'United States', state: 'MN', lat: 44.9778, lon: -93.2650, tz: 'America/Chicago' },
  { city: 'Portland', country: 'United States', state: 'OR', lat: 45.5152, lon: -122.6784, tz: 'America/Los_Angeles' },
  { city: 'Washington', country: 'United States', state: 'DC', lat: 38.9072, lon: -77.0369, tz: 'America/New_York' },
  { city: 'Nashville', country: 'United States', state: 'TN', lat: 36.1627, lon: -86.7816, tz: 'America/Chicago' },
  { city: 'New Orleans', country: 'United States', state: 'LA', lat: 29.9511, lon: -90.0715, tz: 'America/Chicago' },

  // Europe, Africa, Asia, LatAm, Oceania
  { city: 'London', country: 'United Kingdom', state: 'England', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { city: 'Paris', country: 'France', state: '', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', state: '', lat: 52.5200, lon: 13.4050, tz: 'Europe/Berlin' },
  { city: 'Amsterdam', country: 'Netherlands', state: '', lat: 52.3676, lon: 4.9041, tz: 'Europe/Amsterdam' },
  { city: 'Rome', country: 'Italy', state: '', lat: 41.9028, lon: 12.4964, tz: 'Europe/Rome' },
  { city: 'Madrid', country: 'Spain', state: '', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid' },
  { city: 'Lagos', country: 'Nigeria', state: '', lat: 6.5244, lon: 3.3792, tz: 'Africa/Lagos' },
  { city: 'Accra', country: 'Ghana', state: '', lat: 5.6037, lon: -0.1870, tz: 'Africa/Accra' },
  { city: 'Nairobi', country: 'Kenya', state: '', lat: -1.2921, lon: 36.8219, tz: 'Africa/Nairobi' },
  { city: 'Johannesburg', country: 'South Africa', state: '', lat: -26.2041, lon: 28.0473, tz: 'Africa/Johannesburg' },
  { city: 'Cairo', country: 'Egypt', state: '', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo' },
  { city: 'Dubai', country: 'UAE', state: '', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { city: 'Tokyo', country: 'Japan', state: '', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { city: 'Seoul', country: 'South Korea', state: '', lat: 37.5665, lon: 126.9780, tz: 'Asia/Seoul' },
  { city: 'Mumbai', country: 'India', state: '', lat: 19.0760, lon: 72.8777, tz: 'Asia/Kolkata' },
  { city: 'Singapore', country: 'Singapore', state: '', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore' },
  { city: 'Sydney', country: 'Australia', state: 'NSW', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { city: 'Melbourne', country: 'Australia', state: 'VIC', lat: -37.8136, lon: 144.9631, tz: 'Australia/Melbourne' },
  { city: 'Auckland', country: 'New Zealand', state: '', lat: -36.8485, lon: 174.7633, tz: 'Pacific/Auckland' },
  { city: 'Mexico City', country: 'Mexico', state: '', lat: 19.4326, lon: -99.1332, tz: 'America/Mexico_City' },
  { city: 'Sao Paulo', country: 'Brazil', state: '', lat: -23.5505, lon: -46.6333, tz: 'America/Sao_Paulo' },
  { city: 'Kingston', country: 'Jamaica', state: '', lat: 17.9714, lon: -76.7936, tz: 'America/Jamaica' }
];

function findCity(query) {
  if (!query || typeof query !== 'string') return MAJOR_CITIES[0];
  const clean = query.split(',')[0].trim().toLowerCase();
  return (
    MAJOR_CITIES.find(c => c.city.toLowerCase() === clean) ||
    MAJOR_CITIES.find(c => c.city.toLowerCase().startsWith(clean)) ||
    MAJOR_CITIES.find(c => query.toLowerCase().includes(c.city.toLowerCase())) ||
    { city: query.trim(), country: '', state: '', lat: 40.7128, lon: -74.0060, tz: 'America/New_York' }
  );
}

function localTimeToUtc(dateStr, timeStr, timeZone) {
  const [y, m, d] = (dateStr || '1998-08-24').split('-').map(Number);
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

module.exports = { MAJOR_CITIES, findCity, localTimeToUtc };

