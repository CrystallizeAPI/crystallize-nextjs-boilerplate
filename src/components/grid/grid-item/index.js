import React from 'react';
import Link from 'next/link';

import DocumentItem from 'components/items/document-item';
import { CurrencyValue } from 'components/currency-value';
import { screen, Button } from 'ui';

import { Outer, Text, ImageWrapper, Img, Price, Title } from './styles';

export default function GridItem({ data, gridCell }) {
  if (!data) {
    return null;
  }

  const { name, path, type, variants, defaultVariant = {} } = data;
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1);
  const cellSize = `cell-${gridCell?.layout?.rowspan}x${gridCell?.layout?.colspan}`;
  let image;
  let text;

  if (type === 'folder' || type === 'document') {
    const images = data.components.find((c) => c.type === 'images');
    image = images?.content?.images?.[0];
    text = <Title>{name}</Title>;
  } else {
    const { price, image: i } = variants
      ? variants.find((variant) => variant.isDefault)
      : defaultVariant;

    image = i;
    text = (
      <div>
        <Price>
          <CurrencyValue value={price} />
        </Price>
        <Title>{name}</Title>
        <Button>BUY</Button>
      </div>
    );
  }

  if (type === 'document') {
    return <DocumentItem data={data} colSpan="1" />;
  }

  return (
    <Link as={path} href="/[...catalogue]" passHref>
      <Outer className={cellSize} type={type}>
        <Text>{text}</Text>
        <ImageWrapper>
          {image && (
            <Img
              {...image}
              alt={name}
              sizes={`(min-width ${screen.md}px) ${imageMdWidth}px, 100vw`}
            />
          )}
        </ImageWrapper>
      </Outer>
    </Link>
  );
}
