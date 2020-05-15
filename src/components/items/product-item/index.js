import React from 'react';
import Link from 'next/link';

import { CurrencyValue } from 'components/currency-value';
import { H3 } from 'ui';

import { Outer, Text, ImageWrapper, Img, Price, Inner } from './styles';

export default function ProductItem({ data }) {
  if (!data) {
    return null;
  }
  let image;

  const { name, path, type, variants } = data;
  const { price, image: i } = variants
    ? variants.find((variant) => variant.isDefault)
    : {};

  image = i;

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer type={type}>
        <Inner>
          <ImageWrapper>
            {image && <Img {...image} alt={name} sizes={`250px`} />}
          </ImageWrapper>

          <Text>
            <Price>
              <CurrencyValue value={price} />
            </Price>
            <H3>{name}</H3>
          </Text>
        </Inner>
      </Outer>
    </Link>
  );
}
