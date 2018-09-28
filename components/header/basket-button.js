import React from 'react';
import { IconBasket } from 'ui';
import { translate } from 'react-i18next';
import { BasketConsumer } from '@crystallize/react-basket';
import { showRight } from '@crystallize/react-layout';

import { Basket, BasketQuantity } from './styles';

const Button = () => (
  <BasketConsumer>
    {({ state }) => {
      if (state.ready) {
        return (
          <Basket onClick={showRight} type="button">
            <IconBasket />
            <BasketQuantity>{state.totalQuantity}</BasketQuantity>
          </Basket>
        );
      }
      return '...';
    }}
  </BasketConsumer>
);

export default translate()(Button);
