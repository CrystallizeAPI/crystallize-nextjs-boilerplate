import produce from 'immer';

export const initialState = {
  status: 'not-hydrated',
  // A simplistic cart which gets stored on client side
  simpleCart: [],
  // Any metadata will also get stored on the client side
  metadata: {},
  // The validated cart sent back from the Service API
  serverState: null
};

export default produce(function reducer(draft, { action, ...rest }) {
  /**
   * This flag helps keeping track of if the incoming
   * change is triggered by _this_ browser tab or a
   * different browser tab
   */
  draft.changeTriggeredByOtherTab = false;

  switch (action) {
    case 'hydrate': {
      if (draft.status === 'not-hydrated') {
        draft.simpleCart = rest.simpleCart || [];
        draft.metadata = rest.metadata;
        draft.status = 'server-state-is-stale';
      }
      break;
    }

    case 'channel-update': {
      draft.simpleCart = rest.simpleCart;
      draft.metadata = rest.metadata;
      draft.serverState = rest.serverState;
      draft.changeTriggeredByOtherTab = true;
      draft.status = 'ready';
      break;
    }

    case 'empty': {
      draft.simpleCart = [];
      draft.metadata = {};
      draft.status = 'hydrated';
      draft.status = 'server-state-is-stale';
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
      const { sku, path, priceVariantIdentifier = 'default' } = rest;

      if (!sku || !path) {
        throw new Error(`Please provide "sku" and "path" for ${action}`);
      }

      const itemIndex = draft.simpleCart.findIndex((i) => i.sku === sku);

      if (itemIndex !== -1) {
        if (action === 'remove-item') {
          draft.simpleCart.splice(itemIndex, 1);
        } else {
          const item = draft.simpleCart[itemIndex];

          if (action === 'decrement-item') {
            item.quantity -= 1;
          } else {
            item.quantity += 1;
          }
        }
      } else {
        if (!['remove-item', 'decrement-item'].includes(action)) {
          draft.simpleCart.push({
            sku,
            path,
            priceVariantIdentifier,
            quantity: 1
          });
        }
      }

      draft.status = 'server-state-is-stale';

      break;
    }

    case 'set-server-state': {
      draft.serverState = rest.serverState;
      draft.status = 'ready';
      break;
    }

    case 'draw-attention': {
      draft.simpleCart.find(
        (c) => c.sku === rest.sku
      ).attentionTime = Date.now();
      break;
    }

    default: {
      throw new Error(`Action ${action} not supported`);
    }
  }

  // A cart item is only valid if we have path and sku
  draft.simpleCart = draft.simpleCart.filter(function validateCartItem({
    path,
    sku
  }) {
    return path && sku;
  });
});
