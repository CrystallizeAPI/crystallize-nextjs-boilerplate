import React from 'react';

import { useT } from 'lib/i18n';

import { useBasket } from '../index';
import { Totals } from '../totals';
import TinyBasketItem from './item';

import { Outer, Items, ItemOuter, BasketIsEmpty } from './styles';

export function TinyBasket() {
  const t = useT();
  const { status, cart, actions } = useBasket();

  if (status !== 'ready') {
    return null;
  }

  if (!cart?.length) {
    return (
      <Outer>
        <BasketIsEmpty>{t('basket.empty')}</BasketIsEmpty>
      </Outer>
    );
  }

  return (
    <Outer>
      <Items>
        {cart.map((item) => (
          <ItemOuter key={item.sku} item={item}>
            <TinyBasketItem item={item} actions={actions} />
          </ItemOuter>
        ))}
      </Items>
      <div style={{ height: 15 }} />
      <Totals />
    </Outer>
  );
}
