import React from 'react';

import Link from 'components/link';
import DocumentItem from 'components/item-microformat/document-item';
import { screen, Button } from 'ui';
import { useT } from 'lib/i18n';

import { Outer, Text, ImageWrapper, Img, Price, Title } from './styles';

export default function GridItem({ data, gridCell }) {
  const t = useT();

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
        <Price>{t('common.price', { value: price })}</Price>
        <Title>{name}</Title>
        <Button>{t('product.buy')}</Button>
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
