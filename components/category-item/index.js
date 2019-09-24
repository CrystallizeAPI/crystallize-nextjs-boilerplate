import React from 'react';
import Link from 'next/link';

import { CurrencyValue } from 'components/currency-value';
import { screen } from 'ui';
import { Outer, ImageWrapper, Img, Footer, Price, imageSize } from './styles';

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
            <ImageWrapper>
              {image && (
                <Img
                  {...image}
                  alt={name}
                  sizes={`(min-width ${screen.md}px) ${imageSize.lg}, ${imageSize.xs}`}
                />
              )}
            </ImageWrapper>
            <Footer>
              <div>
                <span>{name}</span>
              </div>
            </Footer>
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
          <ImageWrapper>
            <Img
              {...image}
              alt={name}
              sizes={`(min-width ${screen.md}px) ${imageSize.lg}, ${imageSize.xs}`}
            />
          </ImageWrapper>
          <Footer>
            <div>
              <span>{name}</span>
              <Price>
                <CurrencyValue value={price} />
              </Price>
            </div>
          </Footer>
        </Outer>
      </Link>
    );
  }
}

export default CategoryItem;
