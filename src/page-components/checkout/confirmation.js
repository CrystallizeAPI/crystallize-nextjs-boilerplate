import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from 'components/layout';
import { useBasket } from 'components/basket';
import OrderItems from 'components/order-items';
import { H1, H3, Outer, Header } from 'ui';
import { useT } from 'lib/i18n';

import BillingDetails from './billing-details';

const CustomHeader = styled(Header)`
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Line = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-main-background);
`;

export default function Confirmation({ order: orderData }) {
  const basket = useBasket();
  const t = useT();

  const [emptied, setEmptied] = useState(false);

  useEffect(() => {
    if (!emptied) {
      basket.actions.empty();
      setEmptied(true);
    }
  }, [emptied, basket.actions]);

  const order = orderData.data.orders.get;
  const items = order.cart.map((item) => ({
    ...item,
    image: {
      url: item.imageUrl
    },
    price: item.price.net
  }));
  const email = order.customer.addresses?.[0]?.email;

  return (
    <Layout title={t('checkout.confirmation.title')}>
      <Outer>
        <CustomHeader>
          <H1>{t('checkout.confirmation.title')}</H1>
          <p>
            {t('checkout.confirmation.shortStatus', {
              context: email ? 'withEmail' : null,
              email
            })}
          </p>
          <Line />
          <BillingDetails order={order} />
          <Line />
          <H3>{t('order.item', { count: items.length })}</H3>
          <OrderItems items={items} />
        </CustomHeader>
      </Outer>
    </Layout>
  );
}
