import React from 'react';

import Link from 'components/link';
import { useT } from 'lib/i18n';
import { H3 } from 'ui';
import { useLocale } from 'lib/app-config';

import { Outer, Text, ImageWrapper, Img, Price, Inner } from './styles';

export default function ProductItem({ data }) {
  const t = useT();
  const locale = useLocale();

  if (!data) {
    return null;
  }

  const { name, path, type, variants } = data;

  const { priceVariants, image } = variants
    ? variants.find((variant) => variant.isDefault)
    : {};
  const { price, currency } =
    priceVariants.find((pv) => pv.identifier === locale.priceVariant) || {};

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer type={type}>
        <Inner>
          <ImageWrapper>
            {image && <Img {...image} alt={name} sizes="250px" />}
          </ImageWrapper>

          <Text>
            <Price>
              {t('common.price', {
                value: price,
                currency
              })}
            </Price>
            <H3>{name}</H3>
          </Text>
        </Inner>
      </Outer>
    </Link>
  );
}
