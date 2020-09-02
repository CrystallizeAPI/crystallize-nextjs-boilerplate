import produce from 'immer';

export const initialState = {
  status: 'not-hydrated',
  cart: [],
  total: {},
  metadata: {}
};

export default produce(function reducer(draft, { action, ...rest }) {
  switch (action) {
    case 'hydrate': {
      if (draft.status === 'not-hydrated') {
        draft.cart = rest.cart;
        draft.metadata = rest.metadata;
        draft.status = 'hydrated';
      }
      break;
    }

    case 'empty': {
      draft.cart = [];
      draft.status = 'hydrated';
      break;
    }

    case 'set-metadata': {
      draft.metadata = rest.metadata;
      break;
    }

    case 'add-item':
    case 'remove-item':
    case 'increment-item':
    case 'decrement-item': {
      const { sku, path } = rest;

      if (!sku || !path) {
        throw new Error(`Please provide "sku" and "path" for ${action}`);
      }

      const itemIndex = draft.cart.findIndex((i) => i.sku === sku);

      if (itemIndex !== -1) {
        if (action === 'remove-item') {
          draft.cart.splice(itemIndex, 1);
        } else {
          const item = draft.cart[itemIndex];

          if (action === 'decrement-item') {
            item.quantity -= 1;
          } else {
            item.quantity += 1;
          }
        }
      } else {
        if (!['remove-item', 'decrement-item'].includes(action)) {
          draft.cart.push({
            sku,
            path
          });
        }
      }
      break;
    }

    case 'extended-product-variants': {
      draft.extendedProductVariants = rest.extendedProductVariants;
      break;
    }

    default: {
      throw new Error(`Action ${action} not supported`);
    }
  }

  // A cart item is only valid if we have path and sku
  draft.cart = draft.cart.filter(function validateCartItem({ path, sku }) {
    return path && sku;
  });

  // Extend with data from the API
  draft.cart = draft.cart.map(function extendAndMakeValid({
    quantity = 1,
    priceVariantIdentifier = 'default',
    sku,
    ...rest
  }) {
    return {
      ...rest,
      sku,
      quantity,
      priceVariantIdentifier,
      extended: draft.extendedProductVariants?.find((e) => e.sku === sku)
    };
  });

  // Calculate totals
  draft.total = draft.cart.reduce(
    (acc, { quantity, extended }) => {
      if (extended) {
        acc.gross += extended.price.gross * quantity;
        acc.net += extended.price.net * quantity;
      }
      acc.quantity += quantity;
      return acc;
    },
    { gross: 0, net: 0, quantity: 0 }
  );

  draft.total.vat =
    parseInt((draft.total.gross - draft.total.net) * 100, 10) / 100;

  draft.productsVariantsToExtend = draft.cart.map(({ sku, path }) => ({
    sku,
    path
  }));

  if (
    draft.status === 'hydrated' &&
    (draft.cart.length === 0 || draft.extendedProductVariants?.length > 0)
  ) {
    draft.status = 'ready';
  }
});
