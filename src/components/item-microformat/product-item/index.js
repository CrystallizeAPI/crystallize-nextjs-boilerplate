import React from 'react';

import Link from 'components/link';
import { useT } from 'lib/i18n';
import { H3 } from 'ui';

import { Outer, Text, ImageWrapper, Img, Price, Inner } from './styles';

export default function ProductItem({ data }) {
  const t = useT();

  if (!data) {
    return null;
  }
  const { name, path, type, variants } = data;
  const { price, image } = variants
    ? variants.find((variant) => variant.isDefault)
    : {};

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer type={type}>
        <Inner>
          <ImageWrapper>
            {image && <Img {...image} alt={name} sizes="250px" />}
          </ImageWrapper>

          <Text>
            <Price>{t('common.price', { value: price })}</Price>
            <H3>{name}</H3>
          </Text>
        </Inner>
      </Outer>
    </Link>
  );
}
