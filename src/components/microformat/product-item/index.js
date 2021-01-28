import React from 'react';

import Link from 'next/link';
import { useT } from 'lib/i18n';
import { H3 } from 'ui';
import { useLocale } from 'lib/app-config';
import getRelativePriceVariants from 'lib/pricing';

import {
  Outer,
  Footer,
  ImageWrapper,
  Img,
  Price,
  Inner,
  BeforePrice,
  Percentage
} from './styles';

export default function ProductItem({ data }) {
  const t = useT();
  const locale = useLocale();
  if (!data) {
    return null;
  }

  const { name, path, type, variants, matchingVariant } = data;

  const variant =
    matchingVariant || variants?.find((variant) => variant.isDefault) || {};

  const pricing = getRelativePriceVariants({
    variant: variant,
    locale
  });
  const image = variant?.images?.[0] || variant?.image;
  return (
    <Link href={path} passHref>
      <Outer type={type}>
        <Inner>
          <ImageWrapper>
            {image && <Img {...image} alt={name} sizes="250px" />}
          </ImageWrapper>

          <Footer>
            <H3>{name}</H3>
            {pricing?.discountPrice ? (
              <Price discounted>
                <strong>
                  {t('common.price', {
                    value: pricing?.discountPrice?.price,
                    currency: pricing?.discountPrice?.currency
                  })}
                </strong>
                <BeforePrice>
                  {t('common.price', {
                    value: pricing?.defaultPrice?.price,
                    currency: pricing?.defaultPrice?.currency
                  })}
                </BeforePrice>
              </Price>
            ) : (
              <Price>
                <strong>
                  {t('common.price', {
                    value: pricing?.defaultPrice?.price,
                    currency: pricing?.defaultPrice?.currency
                  })}
                </strong>
              </Price>
            )}

            {!!pricing?.discountPercentage && (
              <Percentage>{`-${pricing?.discountPercentage}%`}</Percentage>
            )}
          </Footer>
        </Inner>
      </Outer>
    </Link>
  );
}
