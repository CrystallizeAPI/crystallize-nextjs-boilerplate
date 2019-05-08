import React from 'react';
import { BasketProvider } from '@crystallize/react-basket';

import { withNamespaces } from 'lib/i18n';

const WrappedBasketProvider = ({ t, children }) => (
  <BasketProvider
    shippingCost="199"
    freeShippingMinimumPurchaseAmount="800"
    validateEndpoint="/checkout/validate-basket"
    t={t}
  >
    {children}
  </BasketProvider>
);

export default withNamespaces(['common', 'basket'])(WrappedBasketProvider);
