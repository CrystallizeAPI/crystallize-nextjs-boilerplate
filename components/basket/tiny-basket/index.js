import React from 'react';

import { useTranslation } from 'lib/i18n';

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
  const { state, actions } = useBasket();
  const { t } = useTranslation(['basket']);

  if (!state || !state.ready) {
    return null;
  }

  const { items, freeShipping, remainingUntilFreeShippingApplies } = state;

  if (!items.length) {
    return (
      <Outer>
        <BasketIsEmpty>{t('basket:empty', state)}</BasketIsEmpty>
      </Outer>
    );
  }

  return (
    <Outer>
      <Items>
        {items.map(item => (
          <ItemOuter key={item.basketId} item={item}>
            <TinyBasketItem
              actions={actions}
              item={item}
              t={t}
              itemImageSizes={itemImageSizes}
            />
          </ItemOuter>
        ))}
      </Items>

      {!hideTotals && <Totals />}

      {!hideRemainingUntilFreeShipping &&
        !freeShipping &&
        remainingUntilFreeShippingApplies > 0 && (
          <RemainingUntilFreeShipping>
            {t('basket:remainingUntilFreeShippingApplies', state)}
          </RemainingUntilFreeShipping>
        )}
    </Outer>
  );
};
