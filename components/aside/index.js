import React from 'react';
import { BasketConsumer, TinyBasket } from '@crystallize/react-basket';

import { Button } from 'ui';

export default class Aside extends React.Component {
  state = { going: false };

  go = () => this.setState({ going: true });

  render() {
    const { going } = this.state;
    return (
      <>
        <TinyBasket />
        <BasketConsumer>
          {({ state }) => (
            <form method="post" action="/checkout">
              <input
                type="hidden"
                name="basket"
                value={JSON.stringify(state)}
              />
              {state.items.length > 0 && (
                <Button type="submit" loading={going} onClick={this.go}>
                  Go to checkout
                </Button>
              )}
            </form>
          )}
        </BasketConsumer>
      </>
    );
  }
}
