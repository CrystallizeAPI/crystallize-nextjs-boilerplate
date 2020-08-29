import React from 'react';

import { useT } from 'lib/i18n';

import { useBasket } from '../context';
import { Totals } from '../totals';
import TinyBasketItem from './item';

import {
  Outer,
  Items,
  ItemOuter,
  BasketIsEmpty,
  RemainingUntilFreeShipping
} from './styles';

export const TinyBasket = ({
  hideTotals = false,
  hideRemainingUntilFreeShipping = false,
  itemImageSizes
}) => {
  const t = useT();
  const { state, actions } = useBasket();

  if (!state || !state.ready) {
    return null;
  }

  const { items, freeShipping, remainingUntilFreeShippingApplies } = state;

  if (!items?.length) {
    return (
      <Outer>
        <BasketIsEmpty>{t('basket.empty')}</BasketIsEmpty>
      </Outer>
    );
  }

  return (
    <Outer>
      <Items>
        {items.map((item) => (
          <ItemOuter key={item.basketId} item={item}>
            <TinyBasketItem
              actions={actions}
              item={item}
              itemImageSizes={itemImageSizes}
            />
          </ItemOuter>
        ))}
      </Items>
      <div>
        {!hideTotals && <Totals />}

        {!hideRemainingUntilFreeShipping &&
          !freeShipping &&
          remainingUntilFreeShippingApplies > 0 && (
            <RemainingUntilFreeShipping>
              {t('remainingUntilFreeShipping', {
                amount: remainingUntilFreeShippingApplies
              })}
            </RemainingUntilFreeShipping>
          )}
      </div>
    </Outer>
  );
};
