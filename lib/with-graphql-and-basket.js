import { withUrqlClient } from 'next-urql';

import { BasketProvider } from 'components/basket';

export default Component =>
  withUrqlClient({
    url: global.__crystallizeConfig.GRAPH_URL
  })(({ ...rest }) => (
    <BasketProvider shippingCost="199" freeShippingMinimumPurchaseAmount="800">
      <Component {...rest} />
    </BasketProvider>
  ));
