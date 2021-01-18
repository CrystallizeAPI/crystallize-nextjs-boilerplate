import React, { useEffect, useReducer, useRef, useMemo } from 'react';

import ServiceApi from 'lib/service-api';

import { retrieveFromCache, persistToCache } from './cache';
import reducer, { initialState } from './reducer';
import { getChannel } from './shared-channel';

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
      language: locale.crystallizeCatalogueLanguage,
      cart: clientBasket.cart.map(clientCartItemForAPI),
      voucher: clientBasket.voucher
    }),
    [locale, clientBasket]
  );

  // Get server state on cart change
  useEffect(() => {
    let stale = false;

    async function getServerBasket() {
      try {
        const response = await ServiceApi({
          query: `
            query getServerBasket($basketModel: BasketModelInput!) {
              basket(basketModel: $basketModel) {
                total {
                  gross
                  net
                  tax {
                    name
                    percent
                  }
                  currency
                }
                cart {
                  id
                  name
                  sku
                  path
                  quantity
                  attributes {
                    attribute
                    value
                  }
                  price {
                    gross
                    net
                    tax {
                      name
                      percent
                    }
                    currency
                  }
                  images {
                    url
                    variants {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
        `,
          variables: {
            basketModel
          }
        });

        if (!stale) {
          dispatch({
            action: 'set-server-state',
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
    if (status === 'server-state-is-stale') {
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

  return (
    <BasketContext.Provider
      value={{
        status,
        basketModel,
        cart: (serverBasket?.cart || []).map(withLocalState).filter(Boolean),
        total: serverBasket?.total || {},
        attentionCartItem,
        actions: {
          empty: () => dispatch({ action: 'empty' }),
          addItem: dispatchCartItemAction('add-item'),
          removeItem: dispatchCartItemAction('remove-item'),
          incrementItem: dispatchCartItemAction('increment-item'),
          decrementItem: dispatchCartItemAction('decrement-item'),
          drawAttention: (sku) => dispatch({ action: 'draw-attention', sku })
        }
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
