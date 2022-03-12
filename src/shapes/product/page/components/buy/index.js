import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '@crystallize/react-layout';

import { Button } from 'ui';
import { useBasket } from 'components/basket';
import { useTranslation } from 'next-i18next';
import { useLocale } from 'lib/app-config';

import {
  ProductFooter,
  Price,
  DiscountDetails,
  BeforePrice,
  Percentage
} from './styles';

export default function BuyButton({ product, selectedVariant, pricing }) {
  const [buying, setBuying] = useState(false);
  const basket = useBasket();
  const layout = useContext(LayoutContext);
  const { t } = useTranslation(['common', 'product']);
  const locale = useLocale();

  function buy() {
    /**
     * Give user immidiate feedback that they've triggered
     * the buy action. This is important for user gratification
     * and conveys trust in the service
     */
    setBuying(true);

    basket.actions.addItem({
      sku: selectedVariant.sku,
      path: product.path,
      priceVariantIdentifier: pricing?.discountPrice
        ? pricing?.discountPrice?.identifier
        : pricing?.defaultPrice.identifier || locale.crystallizePriceVariant
    });
  }

  const textDefaultPrice = t('price', {
    value: pricing?.defaultPrice?.price,
    currency: pricing?.defaultPrice?.currency
  });

  /**
   * Draw attention to the item when the server state has
   * been updated
   */
  useEffect(() => {
    async function drawAttentionToItemInBasket() {
      setBuying(false);

      // Wait for the layout menu to open
      await layout.actions.showRight();

      /**
       * Give the user time to rest their eyes after the
       * right layou menu has been shown
       */
      setTimeout(() => {
        basket.actions.drawAttention(selectedVariant.sku);
      }, 250);
    }
    if (buying && basket.status === 'ready') {
      drawAttentionToItemInBasket();
    }
  }, [buying, basket.status, basket.actions, selectedVariant, layout]);

  return (
    <ProductFooter>
      {pricing?.discountPrice ? (
        <Price discounted>
          <strong>
            {t('price', {
              value: pricing?.discountPrice?.price,
              currency: pricing?.discountPrice?.currency
            })}
          </strong>
          <DiscountDetails>
            <BeforePrice>{textDefaultPrice}</BeforePrice>
            <Percentage>{`-${pricing?.discountPercentage}%`}</Percentage>
          </DiscountDetails>
        </Price>
      ) : (
        <Price>
          <strong>{textDefaultPrice}</strong>
        </Price>
      )}
      <Button
        width="250px"
        onClick={buy}
        disabled={!pricing?.defaultPrice.currency}
        state={buying && 'loading'}
      >
        {t('product:addToBasket')}
      </Button>
    </ProductFooter>
  );
}
