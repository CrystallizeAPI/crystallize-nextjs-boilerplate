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

  // Google recommendations result
  if (!variants && data.images) {
    const { images, price } = data;
    return (
      <Link href={path} passHref>
        <Outer type={type}>
          <Inner>
            <ImageWrapper>
              <figure>
                <picture>
                  <source
                    srcSet={images.map((i) => `${i.uri} ${i.width}w`)}
                    type={
                      images[0].uri.endsWith('.jpg')
                        ? 'image/jpeg'
                        : 'image/png'
                    }
                    sizes="250px"
                  />
                  <img src={images[0].uri} />
                </picture>
              </figure>
            </ImageWrapper>

            <Footer>
              <H3>{name}</H3>
              <Price pricing={{ defaultPrice: price }} />
            </Footer>
          </Inner>
        </Outer>
      </Link>
    );
  }

  const variant = matchingVariant || findDefaultVariant(variants) || {};
  const image = variant?.images?.[0] || variant?.image;
  const pricing = getRelativePriceVariants({ variant, locale });

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
