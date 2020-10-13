import React from 'react';

import AttributeList from 'components/attribute-list';
import { useT } from 'lib/i18n';

import {
  Item,
  ItemAmount,
  ItemImage,
  ItemInfo,
  ItemName,
  Items,
  ItemQuantity,
  ItemPrice
} from './styles';

export default function OrderItems({ cart }) {
  const t = useT();

  return (
    <Items>
      {cart.map((item) => (
        <Item key={item.sku}>
          {item.images && (
            <ItemImage {...item.images[0]} alt={item.name} sizes="50vw" />
          )}
          <ItemInfo>
            <ItemName>{item.name}</ItemName>
            {item.attributes ? (
              <AttributeList attributes={item.attributes} />
            ) : (
              <p>{item.sku}</p>
            )}
          </ItemInfo>
          <ItemAmount>
            <ItemQuantity>
              {item.quantity} x{' '}
              {t('common.price', {
                value: item.price?.gross ?? 0,
                currency: item.price?.currency
              })}
            </ItemQuantity>
            <ItemPrice>
              {t('common.price', {
                value: (item.price?.gross ?? 0) * item.quantity,
                currency: item.price?.currency
              })}
            </ItemPrice>
          </ItemAmount>
        </Item>
      ))}
    </Items>
  );
}
