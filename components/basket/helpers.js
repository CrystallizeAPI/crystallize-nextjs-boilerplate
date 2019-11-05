export const animationSpeedMs = 300;

export function getSupportedOptionsFromProps(props) {
  const {
    freeShippingMinimumPurchaseAmount = -1,
    onEmpty,
    onAddToBasket,
    onRemoveFromBasket
  } = props;

  return {
    freeShippingMinimumPurchaseAmount: parseFloat(
      freeShippingMinimumPurchaseAmount
    ),
    onEmpty,
    onAddToBasket,
    onRemoveFromBasket
  };
}

export const generateUniqueId = (function iife() {
  let idIncremenet = 0;

  return name => `crystallize-${name}-${idIncremenet++}`;
})();

export function calculateTotals({ items, discount, options, shipping }) {
  const { freeShippingMinimumPurchaseAmount = -1 } = options;

  const totalQuantity = items.reduce((acc, i) => acc + i.quantity, 0);

  const totalPrice = items.reduce((acc, i) => {
    const p =
      i.quantity * (i.subscription ? i.subscription.initial_price : i.price);
    return acc + p;
  }, 0);

  const totalVatAmount = items.reduce((acc, i) => {
    const p = i.quantity * (i.vatAmount || 0);
    return acc + p;
  }, 0);

  const totalPriceMinusDiscount = totalPrice - Math.abs(discount || 0);

  // Determine shipping related variables
  let freeShipping = false;
  let remainingUntilFreeShippingApplies = 0;
  if (
    freeShippingMinimumPurchaseAmount &&
    freeShippingMinimumPurchaseAmount > 0
  ) {
    remainingUntilFreeShippingApplies =
      freeShippingMinimumPurchaseAmount - totalPriceMinusDiscount;
    if (remainingUntilFreeShippingApplies <= 0) {
      remainingUntilFreeShippingApplies = 0;
      freeShipping = true;
    }
  }

  const shippingCost = shipping ? shipping.price : 0;

  let totalToPay = totalPriceMinusDiscount;
  if (!freeShipping && shippingCost) {
    totalToPay += shippingCost;
  }

  return {
    totalPrice,
    totalPriceMinusDiscount,
    totalVatAmount,
    totalToPay,
    totalQuantity,
    freeShipping,
    remainingUntilFreeShippingApplies,
    items
  };
}

export function getVariantVATprops({ product, variant }) {
  const { vatType = {} } = product;
  const vatPercent =
    vatType.percent && vatType.percent === 0 ? 0 : vatType.percent;
  const priceWithoutVat = variant.price / (1 + vatPercent / 100);

  return {
    priceWithoutVat,
    vatAmount: variant.price - priceWithoutVat
  };
}
