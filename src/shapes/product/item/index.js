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
  const image = variant?.images?.[0] || variant?.image;
  const pricing = getRelativePriceVariants({ variant, locale });

  return (
    <Link href={path} passHref>
      <Outer type={type}>
        <Inner>
          <ImageWrapper>
            <Tags>
              {data?.topics?.map((topic, index) => (
                <TopicTag
                  {...topic}
                  key={`listing-${topic.id}-${data?.id}-${index}`}
                />
              ))}
            </Tags>

            {image && (
              <Img
                {...image}
                alt={name}
                sizes="(min-width: 1000px) 250px, 45vw"
              />
            )}
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
