import React from 'react';
import { BasketConsumer } from '@crystallize/react-basket';
import { LayoutContext } from '@crystallize/react-layout';

import { withNamespaces } from 'lib/i18n';
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

export default withNamespaces(['common', 'basket'])(Button);
