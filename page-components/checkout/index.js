/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';

import { useBasket } from 'components/basket';
import { CurrencyValue } from 'components/currency-value';
import Layout from 'components/layout';
import { H1, Outer } from 'ui';
import PaymentGateway from './payment-gateway';
import {
  // Outer,
  Inner,
  Item,
  ItemAmount,
  ItemImage,
  ItemInfo,
  ItemName,
  Items,
  ItemQuantity,
  ItemPrice,
  ItemAttributes,
  Attribute
} from './styles';

const Checkout = () => {
  const basket = useBasket();

  if (!basket.state.ready) {
    return (
      <Layout title="Checkout" simple loading>
        Getting basket...
      </Layout>
    );
  }

  const { items } = basket.state;

  if (!items.length) {
    return (
      <Layout title="Checkout" simple>
        <Outer>Basket is empty</Outer>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout" simple>
      <Outer>
        <H1>Checkout</H1>
        <Inner>
          <Items>
            {items.map(item => (
              <Item key={item.id}>
                <ItemImage {...item.image} alt={item.name} />
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemAttributes>
                    {item.attributes.map(({ attribute, value }) => (
                      <Attribute key={attribute}>{value}</Attribute>
                    ))}
                  </ItemAttributes>
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
          <PaymentGateway items={items} />
        </Inner>
      </Outer>
    </Layout>
  );
};

export default Checkout;
