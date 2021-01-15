import produce from 'immer';

export const initialState = {
  status: 'not-hydrated',
  /**
   * A simplistic cart which gets stored on client side
   * Each client cart item consists of these fields:
   *  - sku
   *  - path
   *  - priceVariantIdentifier
   *  - quantity
   */
  clientCart: { items: [], voucher: null },
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
        draft.clientCart = rest.clientCart || initialState.clientCart;
        console.log(draft.clientCart);
        draft.status = 'server-state-is-stale';
      }
      break;
    }

    case 'channel-update': {
      draft.clientCart = rest.clientCart;
      draft.serverState = rest.serverState;
      draft.changeTriggeredByOtherTab = true;
      draft.status = 'ready';
      break;
    }

    case 'empty': {
      draft.clientCart = initialState.clientCart;
      draft.status = 'server-state-is-stale';
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

      const itemIndex = draft.clientCart.items.findIndex((i) => i.sku === sku);

      if (itemIndex !== -1) {
        if (action === 'remove-item') {
          draft.clientCart.items.splice(itemIndex, 1);
        } else {
          const item = draft.clientCart.items[itemIndex];

          if (action === 'decrement-item') {
            item.quantity -= 1;
          } else {
            item.quantity += 1;
          }
        }
      } else {
        if (!['remove-item', 'decrement-item'].includes(action)) {
          draft.clientCart.items.push({
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
      draft.attentionItem = {
        time: Date.now(),
        sku: rest.sku
      };
      break;
    }

    default: {
      throw new Error(`Action ${action} not supported`);
    }
  }

  // A cart item is only valid if we have path and sku
  draft.clientCart.items = draft.clientCart.items.filter(
    function validateCartItem({ path, sku }) {
      return path && sku;
    }
  );
});
