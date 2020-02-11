import { withUrqlClient } from 'next-urql';

import { BasketProvider } from 'components/basket';

export default Component => {
  function WithBasket(props) {
    return (
      <BasketProvider
        shippingCost="199"
        freeShippingMinimumPurchaseAmount="800"
      >
        <Component {...props} />
      </BasketProvider>
    );
  }

  WithBasket.getInitialProps = Component.getInitialProps;

  return withUrqlClient({
    url: global.__crystallizeConfig.GRAPH_URL
  })(WithBasket);
};
