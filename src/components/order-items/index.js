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

const OrderItems = ({ cart }) => (
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
            {item.quantity} x <CurrencyValue value={item.price.gross} />
          </ItemQuantity>
          <ItemPrice>
            <CurrencyValue value={item.price.gross * item.quantity} />
          </ItemPrice>
        </ItemAmount>
      </Item>
    ))}
  </Items>
);

export default OrderItems;
