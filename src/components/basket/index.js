import React, { useEffect, useReducer, useRef, useMemo } from 'react';

import ServiceApi from 'lib/service-api';

import { retrieveFromCache, persistToCache } from './cache';
import reducer, { initialState } from './reducer';
import { getChannel } from './shared-channel';
import GET_BASKET_QUERY from './get-basket-query';

const BasketContext = React.createContext();

export const useBasket = () => React.useContext(BasketContext);

function clientCartItemForAPI({ sku, path, quantity, priceVariantIdentifier }) {
  return { sku, path, quantity, priceVariantIdentifier };
}

export function BasketProvider({ locale, children }) {
  const [
    {
      status,
      clientBasket,
      serverBasket,
      totalQuantity,
      changeTriggeredByOtherTab,
      attentionCartItem
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const sharedChannelRef = useRef(getChannel());

  useEffect(() => {
    // Retrieve cached basket
    (async function init() {
      const cache = await retrieveFromCache();
      dispatch({ action: 'hydrate', ...cache });
    })();

    // Listen for channel updates
    if (sharedChannelRef.current) {
      sharedChannelRef.current.onmessage = function (event) {
        dispatch({ action: 'channel-update', ...JSON.parse(event.data) });
      };
    }
  }, []);

  // Persist the basket on the client
  useEffect(() => {
    if (status !== 'not-hydrated') {
      persistToCache({
        ...clientBasket,
        cart: clientBasket.cart.map(clientCartItemForAPI)
      });
    }
  }, [status, clientBasket]);

  /**
   * Broadcast this change to anyone listening to the channel
   * This is typically other tabs opened for this site, thus
   * enabling a synced cart across all open tabs
   */
  useEffect(() => {
    if (status === 'ready') {
      if (!changeTriggeredByOtherTab) {
        sharedChannelRef.current?.postMessage(
          JSON.stringify({
            clientBasket,
            serverBasket
          })
        );
      }
    }
  }, [status, clientBasket, serverBasket, changeTriggeredByOtherTab]);

  /**
   * Define the basketModel object.
   * Used here and in the checkout
   */
  const basketModel = useMemo(
    () => ({
      locale,
      cart: clientBasket.cart.map(clientCartItemForAPI),
      voucherCode: clientBasket.voucherCode,
      crystallizeOrderId: clientBasket.crystallizeOrderId,
      klarnaOrderId: clientBasket.klarnaOrderId
    }),
    [locale, clientBasket]
  );

  // Get server state on cart change
  useEffect(() => {
    let stale = false;

    async function getServerBasket() {
      try {
        const response = await ServiceApi({
          query: GET_BASKET_QUERY,
          variables: {
            basketModel
          }
        });

        if (!stale && response.data) {
          dispatch({
            action: 'set-server-basket',
            serverBasket: response.data.basket
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          action: 'server-update-failed'
        });
      }
    }

    let timeout;
    if (status === 'server-basket-is-stale') {
      timeout = setTimeout(getServerBasket, 250);
    }

    return () => {
      stale = true;
      clearTimeout(timeout);
    };
  }, [status, locale.crystallizeCatalogueLanguage, basketModel]);

  function dispatchCartItemAction(action) {
    return (data) => dispatch({ action, ...data });
  }

  function withLocalState(item) {
    // Exclude voucher codes
    if (item.sku.startsWith('--voucher--')) {
      return item;
    }

    const clientBasketCartItem = clientBasket.cart.find(
      (c) => c.sku === item.sku
    );

    /**
     * Don't show the cart item if it is not in
     * the client cache.
     **/
    if (!clientBasketCartItem) {
      return null;
    }

    return {
      ...item,
      quantity: clientBasketCartItem.quantity
    };
  }

  const cart = (serverBasket?.cart || []).map(withLocalState).filter(Boolean);

  /**
   * Something went wrong when fetching the basket from the Service API
   * You should not show this feedback in production, and rather deal
   * with Service API errors in a more smooth fashion
   */
  if (status === 'server-update-failed') {
    return (
      <div style={{ margin: '0 auto', maxWidth: 400, padding: 50 }}>
        Oh-uh. Something went wrong when getting data from the Service API
        <br />
        <br />
        <button onClick={() => dispatch({ action: 'retry-server-update' })}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <BasketContext.Provider
      value={{
        status,
        basketModel,
        cart,
        total: serverBasket?.total || {},
        totalQuantity,
        attentionCartItem,
        actions: {
          addVoucherCode: (voucherCode) =>
            dispatch({ action: 'add-voucher', voucherCode }),
          removeVoucherCode: () => dispatch({ action: 'remove-voucher' }),
          empty: () => dispatch({ action: 'empty' }),
          addItem: dispatchCartItemAction('add-item'),
          removeItem: dispatchCartItemAction('remove-item'),
          incrementItem: dispatchCartItemAction('increment-item'),
          decrementItem: dispatchCartItemAction('decrement-item'),
          drawAttention: (sku) => dispatch({ action: 'draw-attention', sku }),
          setCrystallizeOrderId: (crystallizeOrderId) =>
            dispatch({
              action: 'set-crystallize-order-id',
              crystallizeOrderId
            }),
          setKlarnaOrderId: (klarnaOrderId) =>
            dispatch({ action: 'set-klarna-order-id', klarnaOrderId })
        }
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
