import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useBasket, TinyBasket } from 'components/basket';
import { Button } from 'ui';

import { Basket, Header, Footer } from './styles';

const CheckoutBtn = styled(Button)`
  width: 100%;
  margin: 20px 0;
  border: 2px solid #000;
  padding: 10px 20px;
  display: block;
  font-size: 16px;
  font-weight: 600;
  text-align: center;

  &:hover {
    background: #000;
    color: #fff;
    text-decoration: none;
  }
`;

export default function Aside() {
  const basket = useBasket();
  const [going, setGoing] = useState(false);

  const onCheckoutClick = (evt) => {
    if (!basket.state.items.length) {
      evt.preventDefault();
      return;
    }
    setGoing(true);
  };

  if (!basket.state || !basket.state.ready) {
    return '...';
  }

  return (
    <Basket>
      <Header>Basket</Header>
      <TinyBasket />
      <Footer>
        <Link href="/checkout" passHref>
          <CheckoutBtn
            as="a"
            state={going ? 'loading' : null}
            disabled={!basket.state.items.length}
            onClick={onCheckoutClick}
          >
            Go to Checkout
          </CheckoutBtn>
        </Link>
      </Footer>
    </Basket>
  );
}
