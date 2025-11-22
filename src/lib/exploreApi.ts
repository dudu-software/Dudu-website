/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const CORS_PROXY = "https://corsproxy.io/?";

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function buildPhotoUrl(
  photoRef?: string | null,
  maxWidth = 400,
  apiKey?: string
) {
  if (!photoRef || !apiKey) return null;
  return `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoRef}&key=${apiKey}`;
}

// -------------------------
// FETCH COUNTRIES
// -------------------------
export async function fetchCountries(input: string, apiKey?: string) {
  if (!apiKey) return [];
  const url = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&types=(regions)&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return (data.predictions || []).filter((p: any) =>
    p.types?.includes("country")
  );
}

// -------------------------
// FETCH PLACE DETAILS
// -------------------------
export async function fetchPlaceDetails(placeId: string, apiKey: string) {
  const detailsUrl = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,international_phone_number,types,photos,rating,user_ratings_total&key=${apiKey}`;
  const res = await fetch(detailsUrl);
  const data = await res.json();
  return data.result;
}

// -------------------------
// FETCH TEXT SEARCH PAGE
// -------------------------
export async function fetchTextSearchPage({
  query,
  pagetoken,
  apiKey,
}: {
  query: string;
  pagetoken?: string | null;
  apiKey: string;
}) {
  let url = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
  if (pagetoken) url += `&pagetoken=${encodeURIComponent(pagetoken)}`;
  const res = await fetch(url);
  return await res.json();
}

// -------------------------
// FETCH PLACES WITH DETAILS (MAIN SEARCH)
// -------------------------
export async function fetchPlacesWithDetails({
  location,
  keyword,
  additionalKeyword,
  apiKey,
  pagetoken,
}: {
  location: string;
  keyword: string;
  additionalKeyword?: string;
  apiKey: string;
  pagetoken?: string | null;
}) {
  if (!apiKey) return { results: [], nextPageToken: null };
  
  // Build query with additional keyword if provided
  const keywordPart = additionalKeyword 
    ? `${keyword} ${additionalKeyword}` 
    : keyword;
  const q = `${keywordPart} in ${location}`;
  const query = encodeURIComponent(q);
  
  // Fetch page with retry for pagetoken
  let data;
  if (pagetoken) {
    let attempts = 0;
    while (attempts < 6) {
      data = await fetchTextSearchPage({ query, pagetoken, apiKey });
      if (data.status === "OK" || data.status === "ZERO_RESULTS") break;
      attempts++;
      await sleep(1000);
    }
  } else {
    data = await fetchTextSearchPage({ query, pagetoken: null, apiKey });
  }
  
  const places = data.results || [];
  const nextPageToken = data.next_page_token || null;
  
  // Fetch details for each place
  const detailed = await Promise.all(
    places.map(async (p: any) => {
      try {
        const d = await fetchPlaceDetails(p.place_id, apiKey);
        const photoRef =
          d.photos?.[0]?.photo_reference || p.photos?.[0]?.photo_reference;
        return {
          id: p.place_id,
          name: d?.name || p.name,
          address: d?.formatted_address || p.formatted_address,
          phone:
            d?.formatted_phone_number ||
            d?.international_phone_number ||
            null,
          types: d?.types || p.types || [],
          photoReference: photoRef || null,
          rating: d?.rating || p.rating || null,
          userRatingsTotal: d?.user_ratings_total || p.user_ratings_total || null,
        };
      } catch (err) {
        const photoRef = p.photos?.[0]?.photo_reference || null;
        return {
          id: p.place_id,
          name: p.name,
          address: p.formatted_address,
          phone: null,
          types: p.types || [],
          photoReference: photoRef,
          rating: p.rating || null,
          userRatingsTotal: p.user_ratings_total || null,
        };
      }
    })
  );
  
  return {
    results: detailed,
    nextPageToken,
  };
}