import React from 'react';
import AttributeList from 'components/attribute-list';
import { CurrencyValue } from 'components/currency-value';

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

const OrderItems = ({ items }) => (
  <Items>
    {items.map(item => (
      <Item key={item.sku}>
        {item.image && (
          <ItemImage {...item.image} alt={item.name} sizes="50vw" />
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
            {item.quantity} x <CurrencyValue value={item.price} />
          </ItemQuantity>
          <ItemPrice>
            <CurrencyValue value={item.price * item.quantity} />
          </ItemPrice>
        </ItemAmount>
      </Item>
    ))}
  </Items>
);

export default OrderItems;
