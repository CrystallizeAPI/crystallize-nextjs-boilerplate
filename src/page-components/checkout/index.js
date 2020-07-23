import React from 'react';

import { useSettings } from 'components/settings-context';
import { useBasket } from 'components/basket';
import Layout from 'components/layout';
import OrderItems from 'components/order-items';
import { useT } from 'lib/i18n';

import Payment from './payment';
import { Outer, Inner, SectionHeader, Container } from './styles';

function Checkout() {
  const basket = useBasket();
  const settings = useSettings();
  const t = useT();

  if (!basket.state.ready) {
    return <Outer center>{t('basket.loading')}</Outer>;
  }

  const { items } = basket.state;
  const { currency } = settings;

  if (!items?.length) {
    return <Outer center>{t('basket.empty', { context: 'inCheckout' })}</Outer>;
  }

  return (
    <Outer>
      <Inner>
        <Container>
          <SectionHeader>{t('checkout.title')}</SectionHeader>
          <Payment items={items} currency={currency} />
        </Container>
        <Container>
          <SectionHeader>{t('basket.title')}</SectionHeader>
          <OrderItems items={items} currency={currency} />
        </Container>
      </Inner>
    </Outer>
  );
}

export default function CheckoutWithLayout(props) {
  const t = useT();

  return (
    <Layout title={t('checkout.title')} simple>
      <Checkout {...props} />
    </Layout>
  );
}
