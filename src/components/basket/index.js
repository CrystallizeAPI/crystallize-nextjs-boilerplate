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
      clientCart,
      serverCart,
      changeTriggeredByOtherTab,
      attentionItem
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const sharedChannelRef = useRef(getChannel());

  useEffect(() => {
    // Retrieve cached cart
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

  // Persist the cart on the client
  useEffect(() => {
    if (status !== 'not-hydrated') {
      persistToCache({
        ...clientCart,
        items: clientCart.items.map(clientCartItemForAPI)
      });
    }
  }, [status, clientCart]);

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
            clientCart,
            serverCart
          })
        );
      }
    }
  }, [status, clientCart, serverCart, changeTriggeredByOtherTab]);

  /**
   * Define the cartModel object.
   * It will be used for payments in checkout
   */
  const cartModel = useMemo(
    () => ({
      language: locale.crystallizeCatalogueLanguage,
      items: clientCart.items.map(clientCartItemForAPI),
      voucher: clientCart.voucher
    }),
    [locale, clientCart]
  );

  // Get server state on cart change
  useEffect(() => {
    let stale = false;

    async function getServerCart() {
      try {
        const response = await ServiceApi({
          query: `
            query getServerCart($cartModel: CartModelInput!) {
              cart(cartModel: $cartModel) {
                total {
                  gross
                  net
                  tax {
                    name
                    percent
                  }
                  currency
                }
                items {
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
            cartModel
          }
        });

        if (!stale) {
          dispatch({
            action: 'set-server-state',
            serverCart: response.data.cart
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
      timeout = setTimeout(getServerCart, 250);
    }

    return () => {
      stale = true;
      clearTimeout(timeout);
    };
  }, [status, locale.crystallizeCatalogueLanguage, cartModel]);

  function dispatchCartItemAction(action) {
    return (data) => dispatch({ action, ...data });
  }

  function withLocalState(item) {
    const clientCartItem = clientCart.items.find((c) => c.sku === item.sku);

    if (!clientCartItem) {
      return null;
    }

    return {
      ...item,
      quantity: clientCartItem.quantity
    };
  }

  return (
    <BasketContext.Provider
      value={{
        status,
        cartModel,
        cart: (serverCart?.items || []).map(withLocalState).filter(Boolean),
        total: serverCart?.total || {},
        metadata: { attentionItem },
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
