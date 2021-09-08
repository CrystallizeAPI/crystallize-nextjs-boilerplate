import React from 'react';

import Link from 'next/link';
import { H3 } from 'ui';
import { useLocale } from 'lib/app-config';
import getRelativePriceVariants from 'lib/pricing';
import TopicTag from 'components/topic-tag';
import Price from './components/price';

import { Outer, Footer, ImageWrapper, Img, Inner, Tags } from './styles';
import { findDefaultVariant } from '../utils';

export default function ProductItem({ data }) {
  const locale = useLocale();

  if (!data) {
    return null;
  }

  const { name, path, type, variants, matchingVariant } = data;
  const variant = matchingVariant || findDefaultVariant(variants) || {};
  let image = variant?.images?.[0] || variant?.image;
  if (!image) {
    image = variants.find((v) => v.sku === variant.sku)?.images?.[0];
  }
  const pricing = getRelativePriceVariants({ variant, locale });
  console.log({ image2: image });

  return (
    <Link href={path} passHref>
      <Outer type={type}>
        <Inner>
          <ImageWrapper>
            <Tags>
              {data?.topics?.map((topic) => (
                <TopicTag {...topic} key={`listing-${topic.id}-${data?.id}`} />
              ))}
            </Tags>

            {image && <Img {...image} alt={name} sizes="250px" />}
          </ImageWrapper>

          <Footer>
            <H3>{name}</H3>
            <Price pricing={pricing} />
          </Footer>
        </Inner>
      </Outer>
    </Link>
  );
}
