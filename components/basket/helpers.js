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
    const p = i.quantity * (i.vat || 0);
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

export function createBasketItem({
  masterProduct,
  variant,
  metadata,
  subscription
}) {
  if (!masterProduct) {
    /* eslint-disable */
    throw new Error(
      'Could not the create basket item without a master product!'
    );
    /* eslint-enable */
  } else if (!variant) {
    /* eslint-disable */
    throw new Error(
      'Product variant must be provided while creating a basket item'
    );
    /* eslint-enable */
  }

  function getPriceWithVAT(priceWithVat) {
    const { vatType = {} } = masterProduct;
    const vatPercent =
      vatType.percent && vatType.percent === 0 ? 0 : vatType.percent;
    return {
      priceWithoutVat: priceWithVat / (1 + vatPercent / 100),
      /* eslint-disable */
      vatAmount: priceWithVat - priceWithVat / (1 + vatPercent / 100)
      /* eslint-enable */
    };
  }

  /* eslint-disable */
  let vat = 0;
  /* eslint-enable */
  let vatType;
  if (masterProduct && masterProduct.vatType) {
    ({ vatType = {} } = masterProduct);

    if (Number.isNaN(vatType.percent) && vatType && vatType.percent) {
      vat = vatType.percent;
    }

    if (Number.isNaN(vatType.percent) || vatType.percent === 0) {
      vat = 0;
    }
  }

  const basketItem = {
    masterId: masterProduct.id,
    name: masterProduct.name,
    sku: `${variant.sku}-standard`,
    product_image:
      variant.image && variant.image.url ? variant.image.url : undefined,
    price: variant.price,
    price_without_vat: getPriceWithVAT(variant.price).priceWithoutVat,
    attributes: [],
    vat: getPriceWithVAT(variant.price).vatAmount,
    metadata,
    subscription,
    placeholder_image: variant.placeholder_image
      ? variant.placeholder_image
      : undefined
  };

  basketItem.reference = basketItem.sku;

  if (basketItem.subscription) {
    if (!basketItem.variationplan_id) {
      basketItem.variationplan_id = basketItem.subscription.variationplan_id;
    }
  }

  return basketItem;
}
