import React from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { useBasket } from 'components/basket';
import IconBasket from 'ui/icons/basket';

import { Btn, BasketQuantity } from './styles';

const BasketButton = () => {
  const { status, total } = useBasket();
  const layout = React.useContext(LayoutContext);

  if (status === 'ready') {
    return (
      <Btn onClick={layout.actions.showRight} type="button">
        <IconBasket />
        <BasketQuantity>{total.quantity}</BasketQuantity>
      </Btn>
    );
  }

  return (
    <Btn type="button">
      <IconBasket />
      <BasketQuantity />
    </Btn>
  );
};

export default BasketButton;
