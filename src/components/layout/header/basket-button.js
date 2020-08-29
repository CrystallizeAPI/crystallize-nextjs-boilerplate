import React from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { useBasket } from 'components/basket';
import IconBasket from 'ui/icons/basket';

import { Basket, BasketQuantity } from './styles';

const BasketButton = () => {
  const { status, total } = useBasket();
  const layout = React.useContext(LayoutContext);

  if (status === 'ready') {
    return (
      <Basket onClick={layout.actions.showRight} type="button">
        <IconBasket />
        <BasketQuantity>{total.quantity}</BasketQuantity>
      </Basket>
    );
  }

  return (
    <Basket type="button">
      <IconBasket />
      <BasketQuantity />
    </Basket>
  );
};

export default BasketButton;
