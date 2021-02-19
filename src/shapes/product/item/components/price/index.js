import React from 'react';
import { useT } from 'lib/i18n';

import { Price, BeforePrice, Percentage } from './styles';

export default function Pricing({ pricing }) {
  const { discountPrice, defaultPrice, discountPercentage } = pricing;
  const hasDiscount = Boolean(discountPrice);
  const hasDiscountPercentage = Boolean(discountPercentage);

  return (
    <>
      {hasDiscount ? (
        <PriceWithDiscount
          currentPricing={discountPrice}
          oldPricing={defaultPrice}
        />
      ) : (
        <DefaultPricing pricing={defaultPrice} />
      )}

      {hasDiscountPercentage && (
        <Percentage>{`-${discountPercentage}%`}</Percentage>
      )}
    </>
  );
}

function DefaultPricing({ pricing }) {
  const { price, currency } = pricing;
  return (
    <Price>
      <strong>
        <TranslatedPrice amount={price} currency={currency} />
      </strong>
    </Price>
  );
}

function PriceWithDiscount({ currentPricing, oldPricing }) {
  const { price, currency } = currentPricing;
  return (
    <Price discounted>
      <strong>
        <TranslatedPrice amount={price} currency={currency} />
      </strong>
      <OldPricing pricing={oldPricing} />
    </Price>
  );
}

function OldPricing({ pricing }) {
  const { price, currency } = pricing;
  return (
    <BeforePrice>
      <TranslatedPrice amount={price} currency={currency} />
    </BeforePrice>
  );
}

function TranslatedPrice({ amount, currency }) {
  const t = useT();

  return t('common.price', { value: amount, currency });
}
