import React from 'react';
import Link from 'next/link';

import { CurrencyValue } from 'components/currency-value';
import { screen } from 'ui';
import {
  Outer,
  Inner,
  ImageWrapper,
  Img,
  Footer,
  Price,
  imageSize
} from './styles';

class CategoryItem extends React.Component {
  render() {
    const { data } = this.props;
    const { name, path, variants } = data;

    if (!data) {
      return null;
    }

    const { type } = data;

    if (type === 'folder' || type === 'document') {
      return (
        <Link as={path} href="/catalog" passHref>
          <Outer>
            <Inner onlytext>{name}</Inner>
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
