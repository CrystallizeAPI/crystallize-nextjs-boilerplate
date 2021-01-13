import React from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { useBasket } from 'components/basket';
import IconBasket from 'ui/icons/basket';

import { Btn, BasketQuantity } from './styles';

const BasketButton = () => {
  const { cart } = useBasket();
  const layout = React.useContext(LayoutContext);

  return (
    <Btn onClick={layout.actions.showRight} type="button">
      <IconBasket />
      <BasketQuantity>
        {cart?.reduce((acc, curr) => acc + curr.quantity, 0)}
      </BasketQuantity>
    </Btn>
  );
};

export default BasketButton;
