import React, { useState } from 'react';
import Link from 'next/link';
import { BasketContext, TinyBasket } from '@crystallize/react-basket';

import { Button } from 'ui';
import { Basket, Header, Footer } from './styles';

const Aside = () => {
  const [going, setGoing] = useState(false);

  return (
    <BasketContext.Consumer>
      {({ state }) => {
        if (!state || !state.ready) {
          return '...';
        }

        return (
          <Basket>
            <Header>Basket</Header>
            <TinyBasket />
            <Footer>
              <Link href="/checkout">
                <Button
                  as="a"
                  buy
                  block
                  fullWidth
                  loading={going}
                  disabled={!state.items.length}
                  onClick={() => setGoing(true)}
                >
                  Go to checkout
                </Button>
              </Link>
            </Footer>
          </Basket>
        );
      }}
    </BasketContext.Consumer>
  );
};

export default Aside;
