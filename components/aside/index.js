import { TinyBasket } from '@crystallize/react-basket';
import { KlarnaGoToCheckout } from '@crystallize/react-checkout';

import { Button } from 'components/style';

export default () => (
  <div>
    <TinyBasket />
    <KlarnaGoToCheckout>
      <Button type="submit">Go to checkout</Button>
    </KlarnaGoToCheckout>
  </div>
);
