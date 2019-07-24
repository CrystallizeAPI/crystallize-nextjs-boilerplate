import React from 'react';

import { BasketProvider } from 'components/basket';

const WrappedBasketProvider = ({ children }) => (
  <BasketProvider shippingCost="199" freeShippingMinimumPurchaseAmount="800">
    {children}
  </BasketProvider>
);

export default WrappedBasketProvider;
