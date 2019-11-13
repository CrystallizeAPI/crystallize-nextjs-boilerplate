import React from 'react';
import Link from 'next/link';

import { CurrencyValue } from 'components/currency-value';
import { screen } from 'ui';
import {
  Outer,
  Inner,
  ImageWrapper,
  Img,
  ContentLine,
  Price,
  imageSize
} from './styles';

class CategoryItem extends React.Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return null;
    }

    const { name, path, type, variants } = data;

    if (type === 'folder' || type === 'document') {
      const images = data.components.find(c => c.type === 'images');
      const image = images && images.content ? images.content.images[0] : null;

      return (
        <Link as={path} href="/catalog" passHref>
          <Outer>
            <Inner>
              <ContentLine>
                <div>
                  <span>{name}</span>
                </div>
              </ContentLine>
              <ImageWrapper>
                {image && (
                  <Img
                    {...image}
                    alt={name}
                    sizes={`(min-width ${screen.md}px) ${imageSize.lg}, ${imageSize.xs}`}
                  />
                )}
              </ImageWrapper>
            </Inner>
          </Outer>
        </Link>
      );
    }

    const { price, image } = variants
      ? variants.find(variant => variant.isDefault)
      : {};

    return (
      <Link as={path} href="/catalog" passHref>
        <Outer>
          <Inner>
            <ContentLine>
              <span>{name}</span>
            </ContentLine>
            <ImageWrapper>
              <Img
                {...image}
                alt={name}
                sizes={`(min-width ${screen.md}px) ${imageSize.lg}, ${imageSize.xs}`}
              />
            </ImageWrapper>
            <ContentLine right>
              <Price>
                <CurrencyValue value={price} />
              </Price>
            </ContentLine>
          </Inner>
        </Outer>
      </Link>
    );
  }
}

export default CategoryItem;
