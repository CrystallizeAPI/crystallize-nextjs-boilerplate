import React from 'react';

import { useBasket } from 'components/basket';
import Layout from 'components/layout';
import OrderItems from 'components/order-items';
import Totals from 'components/basket/totals';
import { useTranslation } from 'next-i18next';

import Payment from './payment';
import {
  Outer,
  Inner,
  SectionHeader,
  Container,
  CheckoutFormGroup
} from './styles';

function Checkout() {
  const basket = useBasket();
  const { t } = useTranslation('basket');

  if (basket.status === 'not-hydrated') {
    return <Outer center>{t('loading')}</Outer>;
  }

  const { cart } = basket;

  if (basket.status === 'ready' && !cart?.length) {
    return <Outer center>{t('empty', { context: 'inCheckout' })}</Outer>;
  }

  return (
    <Outer>
      <Inner>
        <Container>
          <Payment />
        </Container>
        <Container>
          <CheckoutFormGroup>
            <SectionHeader>{t('title')}</SectionHeader>
            <OrderItems cart={cart} />
            <Totals style={{ padding: '0 15px' }} />
          </CheckoutFormGroup>
        </Container>
      </Inner>
    </Outer>
  );
}

export default function CheckoutWithLayout(props) {
  const { t } = useTranslation('checkout');

  return (
    <Layout title={t('title')} simple>
      <Checkout {...props} />
    </Layout>
  );
}
