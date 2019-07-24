/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';

import { BasketContext } from 'components/basket';
import Layout from 'components/layout';

import PaymentGateway from './payment-gateway';
import {
  Outer,
  Inner,
  Item,
  ItemImage,
  ItemName,
  Items,
  ItemQuantity,
  ItemPrice
} from './styles';

const Checkout = () => (
  <Layout title="Checkout" simple>
    <BasketContext.Consumer>
      {({ state }) => {
        if (!state.ready) {
          return 'Getting basket...';
        }

        const { items } = state;

        if (!items.length) {
          return <Outer>Basket is empty</Outer>;
        }

        return (
          <Outer>
            <Inner>
              <Items>
                {state.items.map(item => (
                  <Item key={item.masterId}>
                    <ItemImage src={item.placeholder_image} alt={item.name} />
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity>
                      {item.quantity}
                      pcs
                    </ItemQuantity>
                    <ItemPrice>{item.unit_price}</ItemPrice>
                  </Item>
                ))}
              </Items>
            </Inner>
            <PaymentGateway />
          </Outer>
        );
      }}
    </BasketContext.Consumer>
  </Layout>
);

Checkout.getInitialProps = ({ asPath }) => {
  return {
    namespacesRequired: ['common', 'basket', 'product'],
    asPath
  };
};

export default Checkout;
