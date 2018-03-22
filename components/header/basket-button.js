import React from 'react';

import { BasketConsumer } from '@crystallize/react-basket';
import { showRight } from '@crystallize/react-layout';

export default () => (
  <BasketConsumer>
    {({ state }) => (
      <button onClick={showRight}>
        {state.totalQuantity
          ? `Your basket (${state.totalQuantity} items, ${state.totalPrice},-)`
          : 'Your basket is empty'}
      </button>
    )}
  </BasketConsumer>
);
