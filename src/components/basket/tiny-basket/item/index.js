import React from 'react';

import AttributeList from 'components/attribute-list';
import { CurrencyValue } from 'components/currency-value';
import { useT } from 'lib/i18n';

import {
  Item,
  Row,
  ItemInfo,
  PriceWrapper,
  ItemImage,
  ItemName,
  ItemQuantityChanger,
  ItemQuantity,
  ItemDelete,
  PriceWrap,
  Price,
  PriceVat
} from './styles';

export default function TinyBasketItem({ actions, item }) {
  const t = useT();
  const increment = () => {
    actions.incrementItem(item);
  };

  const decrement = () => {
    actions.decrementItem(item);
  };

  const remove = () => {
    actions.removeItem(item);
  };

  const { attributes } = item;

  return (
    <Item animate={item.animate}>
      <ItemImage {...item.images?.[0]} />
      <ItemInfo>
        <Row>
          <ItemName>{item.name}</ItemName>
          {attributes?.length > 0 && <AttributeList attributes={attributes} />}
        </Row>

        <PriceWrapper>
          <PriceWrap>
            <Price>
              <CurrencyValue value={item.price?.gross} />
            </Price>
          </PriceWrap>

          <PriceVat>
            <span>{t('common.vat', { value: item.price?.vat })}</span>
          </PriceVat>
        </PriceWrapper>
      </ItemInfo>
      <div>
        <ItemQuantityChanger>
          <button
            onClick={decrement}
            type="button"
            disabled={item.quantity === 1}
          >
            -
          </button>
          <ItemQuantity>{item.quantity}</ItemQuantity>
          <button onClick={increment} type="button">
            +
          </button>
        </ItemQuantityChanger>
      </div>
      <ItemDelete onClick={remove}>{t('basket.removeItem', item)}</ItemDelete>
    </Item>
  );
}
