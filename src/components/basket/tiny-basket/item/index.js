import React, { useEffect, useState } from 'react';

import { useBasket } from 'components/basket';
import AttributeList from 'components/attribute-list';
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
  PriceVat,
  drawAttentionDuration
} from './styles';

export default function TinyBasketItem({ actions, item }) {
  const t = useT();
  const [drawAttention, setDrawAttention] = useState(false);
  const { attentionCartItem } = useBasket();

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
              {t('common.price', {
                value: item.price.gross,
                currency: item.price.currency
              })}
            </Price>
          </PriceWrap>

          <PriceVat>
            <span>
              {t('common.tax', {
                value: item.price.gross - item.price.net,
                currency: item.price?.currency
              })}
            </span>
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
