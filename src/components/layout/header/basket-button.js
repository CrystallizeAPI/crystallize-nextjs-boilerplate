import React from 'react';
import { LayoutContext } from '@crystallize/react-layout';
import { useTranslation } from 'next-i18next';

import { useBasket } from 'components/basket';
import IconBasket from 'ui/icons/basket';

import { Btn, BasketQuantity } from './styles';

const BasketButton = () => {
  const { totalQuantity } = useBasket();
  const layout = React.useContext(LayoutContext);
  const { t } = useTranslation('basket');

  return (
    <Btn
      onClick={layout?.actions?.showRight}
      type="button"
      aria-label={t('title')}
    >
      <IconBasket />
      <BasketQuantity>{totalQuantity}</BasketQuantity>
    </Btn>
  );
};

export default BasketButton;
