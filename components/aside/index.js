import React from 'react';
import { BasketConsumer, TinyBasket } from '@crystallize/react-basket';

import { Button } from 'ui';
import { Basket, Header, Footer } from './styles';

export default class Aside extends React.Component {
  state = { going: false };

  go = () => this.setState({ going: true });

  render() {
    const { going } = this.state;
    return (
      <Basket>
        <Header>Basket</Header>
        <TinyBasket />
        <Footer>
          <BasketConsumer>
            {({ state }) => (
              <form method="post" action="/checkout">
                <input
                  type="hidden"
                  name="basket"
                  value={JSON.stringify(state)}
                />
                {state.items.length > 0 && (
                  <Button
                    buy
                    block
                    fullWidth
                    type="submit"
                    loading={going}
                    onClick={this.go}
                  >
                    Go to checkout
                  </Button>
                )}
              </form>
            )}
          </BasketConsumer>
        </Footer>
      </Basket>
    );
  }
}
