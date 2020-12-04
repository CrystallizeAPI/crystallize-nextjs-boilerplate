import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import DocumentItem from 'components/item-microformat/document-item';
import { screen, Button } from 'ui';
import { useT } from 'lib/i18n';
import { useLocale } from 'lib/app-config';

import { Outer, Text, ImageWrapper, Img, Price, Title } from './styles';

function getLowResVariant(variants) {
  return variants.sort((a, b) => a.width - b.width)[0];
}

function NotSoLazyImg({ variants: vars, ...rest }) {
  const std = vars.filter((v) => v.url && !v.url.endsWith('.webp'));
  const webp = vars.filter((v) => v.url && v.url.endsWith('.webp'));

  const [modifiedVariants, setModifiedVariants] = useState([
    getLowResVariant(std),
    getLowResVariant(webp)
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => setModifiedVariants(vars), 250);
    return () => clearTimeout(timeout);
  }, [vars]);

  return <Img variants={modifiedVariants} {...rest} />;
}

export default function GridItem({ data, gridCell }) {
  const t = useT();
  const locale = useLocale();

  if (!data) {
    return null;
  }

  const { name, path, type, variants, defaultVariant = {} } = data;
  const imageMdWidth = 100 / (gridCell?.layout?.colspan ?? 1);
  const cellSize = `cell-${gridCell?.layout?.rowspan}x${gridCell?.layout?.colspan}`;
  let image;
  let text;

  if (type === 'folder' || type === 'document') {
    const images = data.components?.find((c) => c.type === 'images');
    image = images?.content?.images?.[0];
    text = <Title>{name}</Title>;
  } else {
    const variant = variants
      ? variants.find((variant) => variant.isDefault)
      : defaultVariant;
    const { priceVariants, image: i } = variant;

    const { price, currency } =
      priceVariants?.find(
        (pv) => pv.identifier === locale.crystallizePriceVariant
      ) || {};

    image = i;
    text = (
      <div>
        <Price>
          {t('common.price', {
            value: price,
            currency
          })}
        </Price>
        <Title>{name}</Title>
        <Button>{t('product.buy')}</Button>
      </div>
    );
  }

  if (type === 'document') {
    return <DocumentItem data={data} colSpan="1" />;
  }

  return (
    <Link href={path} passHref>
      <Outer className={cellSize} type={type}>
        <Text>{text}</Text>
        <ImageWrapper>
          {image && (
            <NotSoLazyImg
              {...image}
              alt={name}
              sizes={`(min-width ${screen.md}px) ${imageMdWidth}vw, 60vw`}
            />
          )}
        </ImageWrapper>
      </Outer>
    </Link>
  );
}
