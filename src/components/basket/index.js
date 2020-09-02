import React, { useEffect, useReducer } from 'react';

import { retrieveFromCache, persistToCache } from './cache';
export { TinyBasket } from './tiny-basket';
import reducer, { initialState } from './reducer';
import { useExtendedProductVariants } from './extend-product-variants';

const BasketContext = React.createContext();

export const useBasket = () => React.useContext(BasketContext);

export function BasketProvider({ children }) {
  const [
    { cart, total, status, productsVariantsToExtend, metadata },
    dispatch
  ] = useReducer(reducer, initialState);

  // Retrieve cached cart
  useEffect(() => {
    (async function init() {
      const { cart, metadata } = await retrieveFromCache();
      dispatch({ action: 'hydrate', cart, metadata });
    })();
  }, [status]);

  // Get extended product data from the Catalogue API
  const extendedProductVariants = useExtendedProductVariants({
    productsVariantsToExtend
  });
  useEffect(() => {
    dispatch({ action: 'extended-product-variants', extendedProductVariants });
  }, [extendedProductVariants]);

  // Store cart on change
  useEffect(() => {
    if (status !== 'not-hydrated') {
      persistToCache({
        cart: cart.map(({ extended, ...rest }) => rest),
        metadata
      });
    }
  }, [status, cart, metadata]);

  function dispatchCartItemAction(action) {
    return (data) => dispatch({ action, ...data });
  }

  return (
    <BasketContext.Provider
      value={{
        status,
        cart: cart.map(({ extended, ...rest }) => ({
          ...extended,
          ...rest
        })),
        total,
        metadata,
        actions: {
          empty: () => dispatch({ action: 'empty' }),
          setMetadata: (metadata) =>
            dispatch({ action: 'set-metadata', metadata }),
          addItem: dispatchCartItemAction('add-item'),
          removeItem: dispatchCartItemAction('remove-item'),
          incrementItem: dispatchCartItemAction('increment-item'),
          decrementItem: dispatchCartItemAction('decrement-item')
        }
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
