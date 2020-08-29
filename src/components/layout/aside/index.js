import React, { useState } from 'react';
import styled from 'styled-components';

import Link from 'components/link';
import { useBasket, TinyBasket } from 'components/basket';
import { Button } from 'ui';
import { useT } from 'lib/i18n';

import { Basket, Header, Footer } from './styles';

const CheckoutBtn = styled(Button)`
  width: 100%;
  margin: 20px 0;
  border: 2px solid var(--color-text-main);
  padding: 10px 20px;
  display: block;
  font-size: 16px;
  font-weight: 600;
  text-align: center;

  &:not([disabled]):hover {
    background: var(--color-text-main);
    color: var(--color-main-background);
    text-decoration: none;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;
    text-decoration: none;
  }
`;

export default function Aside() {
  const t = useT();
  const basket = useBasket();
  const [going, setGoing] = useState(false);

  const onCheckoutClick = (evt) => {
    if (!basket.cart.length) {
      evt.preventDefault();
      return;
    }
    setGoing(true);
  };

  if (basket.status !== 'ready') {
    return t('basket.loading');
  }

  return (
    <Basket>
      <Header>{t('basket.title')}</Header>
      <TinyBasket />
      <Footer>
        <Link href="/checkout" passHref>
          <CheckoutBtn
            as="a"
            state={going ? 'loading' : null}
            disabled={!basket.cart.length}
            onClick={onCheckoutClick}
          >
            {t('basket.goToCheckout')}
          </CheckoutBtn>
        </Link>
      </Footer>
    </Basket>
  );
}
