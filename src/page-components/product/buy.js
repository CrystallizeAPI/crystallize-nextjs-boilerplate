import React, { useContext } from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { Button } from 'ui';
import { useBasket } from 'components/basket';
import { useT } from 'lib/i18n';
import { useLocale } from 'lib/app-config';

import { ProductFooter, Price } from './styles';

export default function BuyButton({ product, selectedVariant }) {
  const basket = useBasket();
  const layout = useContext(LayoutContext);
  const t = useT();
  const locale = useLocale();

  const { identifier, price, currency } =
    selectedVariant.priceVariants.find(
      (pv) => pv.identifier === locale.crystallizePriceVariant
    ) || {};

  async function buy() {
    await layout.actions.showRight();

    basket.actions.addItem({
      sku: selectedVariant.sku,
      path: product.path,
      priceVariantIdentifier: identifier || locale.crystallizePriceVariant
    });
  }

  return (
    <ProductFooter>
      <Price>
        <strong>{t('common.price', { value: price, currency })}</strong>
      </Price>
      <Button width="200px" onClick={buy} disabled={!currency}>
        {t('product.addToBasket')}
      </Button>
    </ProductFooter>
  );
}
