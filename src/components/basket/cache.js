const cacheKey = 'crystallize-app-basket';

export async function retrieveFromCache() {
  try {
    const cache = await localStorage.getItem(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }
  } catch (error) {
    // We might not have access to localStorage
  }
  return { cart: [] };
}

export function persistToCache(data) {
  try {
    return localStorage.setItem(cacheKey, JSON.stringify(data));
  } catch (error) {
    // We might not have access to localStorage
  }
}
