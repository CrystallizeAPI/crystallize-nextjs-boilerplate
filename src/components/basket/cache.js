const localCacheKey = 'crystallize-bskt';

export async function retrieveBasketFromCache({ parseBasketItem }) {
  try {
    const basket = await localStorage.getItem(localCacheKey);
    if (basket) {
      const parsed = JSON.parse(basket);
      parsed.items.forEach(parseBasketItem);
      return parsed;
    }
  } catch (error) {
    console.warn('The basket was not retrieved', error); // eslint-disable-line
  }
  return null;
}

export async function persistBasketToCache({
  id,
  items,
  shipping,
  metadata,
  coupon,
  discount
}) {
  try {
    await localStorage.setItem(
      localCacheKey,
      JSON.stringify({ id, items, shipping, metadata, coupon, discount })
    );
  } catch (error) {
    console.warn('The basket was not persisted', error); // eslint-disable-line
  }
}
