import React, { useEffect, useReducer, useRef, useMemo } from 'react';

import ServiceApi from 'lib/service-api';

import { retrieveFromCache, persistToCache } from './cache';
import reducer, { initialState } from './reducer';
import { getChannel } from './shared-channel';

const BasketContext = React.createContext();

export const useBasket = () => React.useContext(BasketContext);

function simpleCartItemForAPI({ sku, path, quantity, priceVariantIdentifier }) {
  return { sku, path, quantity, priceVariantIdentifier };
}

export function BasketProvider({ locale, children }) {
  const [
    { status, simpleCart, metadata, serverState, changeTriggeredByOtherTab },
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
        simpleCart: simpleCart.map(simpleCartItemForAPI),
        metadata
      });
    }
  }, [status, simpleCart, metadata]);

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
            simpleCart,
            metadata,
            serverState
          })
        );
      }
    }
  }, [status, simpleCart, serverState, metadata, changeTriggeredByOtherTab]);

  /**
   * Define the cartModel object.
   * It will be used for payments in checkout
   */
  const cartModel = useMemo(
    () => ({
      language: locale.crystallizeCatalogueLanguage,
      items: simpleCart.map(simpleCartItemForAPI),
      voucherCodes: []
    }),
    [locale, simpleCart]
  );

  // Get server state on cart change
  useEffect(() => {
    let stale = false;

    async function getServerState() {
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
            serverState: response.data.cart
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
      timeout = setTimeout(getServerState, 250);
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
    const simpleCartItem = simpleCart.find((c) => c.sku === item.sku);

    if (!simpleCartItem) {
      return null;
    }

    return {
      ...item,
      attentionTime: simpleCartItem.attentionTime,
      quantity: simpleCartItem.quantity
    };
  }

  return (
    <BasketContext.Provider
      value={{
        status,
        cartModel,
        cart: (serverState?.items || []).map(withLocalState).filter(Boolean),
        total: serverState?.total || {},
        metadata,
        actions: {
          empty: () => dispatch({ action: 'empty' }),
          setMetadata: (metadata) =>
            dispatch({ action: 'set-metadata', metadata }),
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
