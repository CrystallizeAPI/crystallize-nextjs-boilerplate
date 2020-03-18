import React from 'react';
import Link from 'next/link';

import { CurrencyValue } from 'components/currency-value';

import { screen, H3 } from 'ui';
import { Outer, Text, ImageWrapper, Img, Price } from './styles';

export default function CatalogueItem({ data, gridCell }) {
  if (!data) {
    return null;
  }

  const { name, path, type, variants } = data;
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1);

  let image;
  let text;

  if (type === 'folder' || type === 'document') {
    const images = data.components.find(c => c.type === 'images');
    image = images?.content?.images?.[0];
    text = <H3>{name}</H3>;
  } else {
    const { price, image: i } = variants
      ? variants.find(variant => variant.isDefault)
      : {};

    image = i;

    text = (
      <>
        <H3>{name}</H3>
        <Price>
          <CurrencyValue value={price} />
        </Price>
      </>
    );
  }

  return (
    <Link as={path} href={`/${type}`} passHref>
      <Outer>
        <ImageWrapper>
          {image && (
            <Img
              {...image}
              alt={name}
              sizes={`(min-width ${screen.md}px) ${imageMdWidth}px, 100vw`}
            />
          )}
        </ImageWrapper>

        <Text>{text}</Text>
      </Outer>
    </Link>
  );
}
