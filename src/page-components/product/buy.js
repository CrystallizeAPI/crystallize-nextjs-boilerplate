import React, { useContext } from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { Button } from 'ui';
import { CurrencyValue } from 'components/currency-value';
import { useBasket } from 'components/basket';
import { useT } from 'lib/i18n';

import { ProductFooter, Price } from './styles';

export default function BuyButton({ product, selectedVariant }) {
  const basket = useBasket();
  const layout = useContext(LayoutContext);
  const t = useT();

  async function buy() {
    await layout.actions.showRight();

    basket.actions.addItem({
      sku: selectedVariant.sku,
      path: product.path
    });
  }

  return (
    <ProductFooter>
      <Price>
        <strong>
          <CurrencyValue value={selectedVariant.price} />
        </strong>
      </Price>
      <Button width="200px" onClick={buy}>
        {t('product.addToBasket')}
      </Button>
    </ProductFooter>
  );
}
