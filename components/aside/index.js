import { TinyBasket } from '@crystallize/react-basket';
import { KlarnaGoToCheckout } from '@crystallize/react-checkout';

import { Button } from 'ui';

export default () => (
  <div>
    <TinyBasket />
    <KlarnaGoToCheckout>
      <Button type="submit">Go to checkout</Button>
    </KlarnaGoToCheckout>
  </div>
);
