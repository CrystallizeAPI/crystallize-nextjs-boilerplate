import React from 'react';

import { useTranslation } from 'next-i18next';

import { useBasket } from '../index';
import TinyBasketItem from './item';

import { Outer, Items, ItemOuter, BasketIsEmpty } from './styles';

export default function TinyBasket() {
  const { t } = useTranslation('basket');
  const { status, cart } = useBasket();

  if (status === 'not-hydrated') {
    return null;
  }

  if (!cart?.length) {
    return (
      <Outer>
        <BasketIsEmpty>{t('empty')}</BasketIsEmpty>
      </Outer>
    );
  }

  return (
    <Outer>
      <Items>
        {cart.map((item) => (
          <ItemOuter key={item.sku} item={item}>
            <TinyBasketItem item={item} />
          </ItemOuter>
        ))}
      </Items>
    </Outer>
  );
}
