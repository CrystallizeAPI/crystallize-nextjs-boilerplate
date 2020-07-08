import React, { useContext } from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { Button } from 'ui';
import { CurrencyValue } from 'components/currency-value';
import { useBasket, getVariantVATprops } from 'components/basket';
import { useT } from 'lib/i18n';

import { ProductFooter, Price } from './styles';

export default function BuyButton({ product, selectedVariant }) {
  const basket = useBasket();
  const t = useT();

  const layout = useContext(LayoutContext);

  const buy = async () => {
    const basketItemToAdd = {
      ...getVariantVATprops({ product, variant: selectedVariant }),
      ...selectedVariant,
      taxGroup: { ...product.vatType },
      id: product.id,
      variant_id: selectedVariant.id,
      name: product.name,
      path: product.path
    };

    basket.actions.addItem(basketItemToAdd);
    await layout.actions.showRight();
    basket.actions.pulsateItemInBasket(basketItemToAdd);
  };

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
