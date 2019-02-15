import React from 'react';
import { translate } from 'react-i18next';

import { BasketConsumer } from '@crystallize/react-basket';
import { LayoutContext } from '@crystallize/react-layout';

import { IconBasket } from 'ui';

import { Basket, BasketQuantity } from './styles';

const Button = () => (
  <BasketConsumer>
    {({ state }) => {
      if (state.ready) {
        return (
          <LayoutContext.Consumer>
            {({ actions }) => (
              <Basket onClick={actions.showRight} type="button">
                <IconBasket />
                <BasketQuantity>{state.totalQuantity}</BasketQuantity>
              </Basket>
            )}
          </LayoutContext.Consumer>
        );
      }
      return '...';
    }}
  </BasketConsumer>
);

export default translate()(Button);
