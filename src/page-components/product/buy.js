import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { Button } from 'ui';
import { useBasket } from 'components/basket';
import { useT } from 'lib/i18n';
import { useLocale } from 'lib/app-config';

import { ProductFooter, Price } from './styles';

export default function BuyButton({ product, selectedVariant }) {
  const [buying, setBuying] = useState(false);
  const basket = useBasket();
  const layout = useContext(LayoutContext);
  const t = useT();
  const locale = useLocale();

  const { identifier, price, currency } =
    selectedVariant.priceVariants.find(
      (pv) => pv.identifier === locale.crystallizePriceVariant
    ) || {};

  function buy() {
    setBuying(true);

    basket.actions.addItem({
      sku: selectedVariant.sku,
      path: product.path,
      priceVariantIdentifier: identifier || locale.crystallizePriceVariant
    });
  }

  /**
   * Draw attention to the item when the server state has
   * been updated
   */
  useEffect(() => {
    async function showItemInBasket() {
      setBuying(false);
      await layout.actions.showRight();
      setTimeout(() => {
        basket.actions.drawAttention(selectedVariant.sku);
      }, 250);
    }
    if (buying && basket.status === 'ready') {
      showItemInBasket();
    }
  }, [buying, basket.status, basket.actions, selectedVariant, layout]);

  return (
    <ProductFooter>
      <Price>
        <strong>{t('common.price', { value: price, currency })}</strong>
      </Price>
      <Button
        width="200px"
        onClick={buy}
        disabled={!currency}
        state={buying ? 'loading' : null}
      >
        {t('product.addToBasket')}
      </Button>
    </ProductFooter>
  );
}
