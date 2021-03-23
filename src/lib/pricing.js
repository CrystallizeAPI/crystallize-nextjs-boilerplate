export default function getRelativePriceVariants({ variant, locale }) {
  const defaultPrice =
    variant?.priceVariants?.find(
      (pv) => pv.identifier === locale.crystallizePriceVariant
    ) || {};

  // Get price variant with identifier "sales" from Crystallize
  const discountPrice =
    variant?.priceVariants?.find(
      (pv) =>
        pv.identifier === 'sales' && pv.currency === defaultPrice?.currency
    ) || null;

  const discountPercentage = (100 * discountPrice?.price) / defaultPrice?.price;

  return {
    defaultPrice,
    discountPrice: discountPrice,
    discountPercentage: isNaN(discountPercentage)
      ? 0
      : 100 - Math.round(discountPercentage)
  };
}
