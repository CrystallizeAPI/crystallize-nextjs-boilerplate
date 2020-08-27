import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Layout from 'components/layout';
import { useBasket } from 'components/basket';
import OrderItems from 'components/order-items';
import { H1, H3, Outer, Header } from 'ui';
import { useT } from 'lib/i18n';
import { CurrencyValue } from 'components/currency-value';

import BillingDetails from './billing-details';

const CustomHeader = styled(Header)`
  margin-bottom: 0;
  padding-bottom: 0;
`;

const Line = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid var(--color-main-background);
`;

const Totals = styled.div`
  margin: 20px 0;
`;

const TotalLine = styled.div`
  text-align: right;
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

  const order = orderData.data.orders?.get;

  useEffect(() => {
    if (!order) {
      const t = setTimeout(() => window.location.reload(), 5000);

      return () => clearTimeout(t);
    }
  }, [order]);

  if (!order) {
    return <Layout loading />;
  }

  const items = order.cart.map((item) => ({
    ...item,
    image: {
      url: item.imageUrl
    },
    price: item.price.gross
  }));
  const email = order.customer.addresses?.[0]?.email;
  const { total } = order;

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
          <Totals>
            <TotalLine>
              {t('order.total')}: <CurrencyValue value={total.gross} />
            </TotalLine>
            <TotalLine>
              {t('common.vat', {
                value:
                  total.gross -
                  (total.gross / (100 + (total.tax?.percent || 0))) * 100
              })}
            </TotalLine>
          </Totals>
        </CustomHeader>
      </Outer>
    </Layout>
  );
}
