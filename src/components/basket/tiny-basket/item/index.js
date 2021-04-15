import React, { useEffect, useState } from 'react';

import { useBasket } from 'components/basket';
import AttributeList from 'components/attribute-list';
import { useTranslation } from 'next-i18next';

import {
  Item,
  Row,
  ItemInfo,
  PriceWrapper,
  ImageImageEmpty,
  ItemImage,
  ItemName,
  ItemQuantityChanger,
  ItemQuantity,
  ItemDelete,
  PriceWrap,
  Price,
  drawAttentionDuration
} from './styles';

export default function TinyBasketItem({ item }) {
  const { t } = useTranslation(['common', 'basket']);
  const [drawAttention, setDrawAttention] = useState(false);
  const { attentionCartItem, actions } = useBasket();

  const { attributes, images } = item;

  // Draw users attention when the item is added to the basket
  useEffect(() => {
    if (attentionCartItem.sku === item.sku) {
      setDrawAttention(true);

      let timeout = setTimeout(
        () => setDrawAttention(false),
        drawAttentionDuration
      );
      return () => clearTimeout(timeout);
    }
  }, [attentionCartItem.sku, item.sku]);

  function increment() {
    actions.incrementItem(item);
  }

  function decrement() {
    actions.decrementItem(item);
  }

  function remove() {
    actions.removeItem(item);
  }

  if (item.sku.startsWith('--voucher--')) {
    return (
      <Item>
        <ImageImageEmpty>{item.name}</ImageImageEmpty>
        <PriceWrapper>
          <PriceWrap>
            <Price>
              {t('price', {
                value: item.price.gross,
                currency: item.price.currency
              })}
            </Price>
          </PriceWrap>
        </PriceWrapper>
        <ItemDelete onClick={actions.removeVoucherCode}>
          {t('basket:removeItem', item)}
        </ItemDelete>
      </Item>
    );
  }

  return (
    <Item animate={drawAttention}>
      <ItemImage {...images?.[0]} />
      <ItemInfo>
        <Row>
          <ItemName>{item.name}</ItemName>
          {attributes?.length > 0 && <AttributeList attributes={attributes} />}
        </Row>

        <PriceWrapper>
          <PriceWrap>
            <Price>
              {t('price', {
                value: item.price.gross,
                currency: item.price.currency
              })}
            </Price>
          </PriceWrap>
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
      <ItemDelete onClick={remove}>{t('basket:removeItem', item)}</ItemDelete>
    </Item>
  );
}
