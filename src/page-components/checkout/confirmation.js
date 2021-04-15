import React, { useEffect } from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import { useRouter } from 'next/router';

import Layout from 'components/layout';
import { useBasket } from 'components/basket';
import OrderItems from 'components/order-items';
import { H1, H3, Outer, Header } from 'ui';
import { useTranslation } from 'next-i18next';

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
  margin: 10px 15px;
`;

const TotalLine = styled.div`
  text-align: right;
  margin-top: 5px;

  ${is('bold')`
    font-size: 1.2rem;
    font-weight: 600;
  `};
`;

export default function Confirmation({ order }) {
  const basket = useBasket();
  const { t } = useTranslation(['common', 'checkout', 'order']);
  const router = useRouter();

  // Empty the basket
  useEffect(() => {
    if (router.query) {
      if ('emptyBasket' in router.query) {
        basket.actions.empty();

        const url = new URL(location.href);

        url.searchParams.delete('emptyBasket');

        router.replace(
          {
            pathname: router.pathname,
            query: Object.fromEntries(url.searchParams)
          },
          url.pathname + url.search,
          { shallow: true }
        );
      }
    }
  });

  useEffect(() => {
    if (!order) {
      const t = setTimeout(() => window.location.reload(), 5000);

      return () => clearTimeout(t);
    }
  }, [order]);

  if (!order) {
    return <Layout loading />;
  }

  const cart = order.cart.map((item) => ({
    ...item,
    image: {
      url: item.imageUrl
    }
  }));
  const email = order.customer.addresses?.[0]?.email;
  const { total } = order;

  return (
    <Layout title={t('checkout:confirmation.title')}>
      <Outer>
        <CustomHeader>
          <H1>{t('checkout:confirmation.title')}</H1>
          <p>
            {t('checkout:confirmation.shortStatus', {
              context: email ? 'withEmail' : null,
              email
            })}
          </p>
          <Line />
          <BillingDetails order={order} />
          <Line />
          <H3>{t('order:item', { count: cart.length })}</H3>
          <OrderItems cart={cart} />
          <Totals>
            <TotalLine bold>
              {t('order:total')}:{' '}
              {t('price', {
                value: total.gross,
                currency: total.currency
              })}
            </TotalLine>
            <TotalLine>
              {t('tax', {
                value: total.gross - total.net,
                currency: total.currency
              })}
            </TotalLine>
          </Totals>
        </CustomHeader>
      </Outer>
    </Layout>
  );
}
