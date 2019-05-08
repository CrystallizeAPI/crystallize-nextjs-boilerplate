import React from 'react';
import { BasketContext, TinyBasket } from '@crystallize/react-basket';

// import { Button } from 'ui';
import { Basket, Header, Footer } from './styles';

export default class Aside extends React.Component {
  static contextType = BasketContext;

  // state = { going: false };

  // go = () => this.setState({ going: true });

  render() {
    const { state } = this.context || {};
    // const { going } = this.state;

    if (!state) {
      return null;
    }

    return (
      <Basket>
        <Header>Basket</Header>
        <TinyBasket />
        <Footer>
          {/* <form method="post" action="/checkout">
            <input type="hidden" name="basket" value={JSON.stringify(state)} />
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
          </form> */}
        </Footer>
      </Basket>
    );
  }
}
