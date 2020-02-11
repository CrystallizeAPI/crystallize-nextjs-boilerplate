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

  WithBasket.getInitialProps = ctx => {
    // Enable Zeit Now edge caching
    if (ctx.res) {
      ctx.res.setHeader('cache-control', 's-maxage=1, stale-while-revalidate');
    }

    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return withUrqlClient({
    url: global.__crystallizeConfig.GRAPH_URL
  })(WithBasket);
};
