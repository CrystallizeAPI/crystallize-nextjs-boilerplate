import React from 'react';
import Link from 'next/link';
import ShapeComponents from 'components/shape/components';

import { CurrencyValue } from 'components/currency-value';

import { screen, H3 } from 'ui';
import {
  Outer,
  ProductOuter,
  Inner,
  ProductInner,
  MicroFormat,
  ImageWrapper,
  Img,
  ArticleImageWrapper,
  ArticleImg,
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
      const richText = data.components.find(c => c.type === 'richText');
      const image = images && images.content ? images.content.images[0] : null;
      return (
        <Link as={path} href="/catalog" passHref>
          <Outer type={type}>
            <Inner>
              <MicroFormat>
                <H3>{name}</H3>
                <ShapeComponents components={[richText]} />
              </MicroFormat>
              <ArticleImageWrapper>
                {image && (
                  <ArticleImg
                    {...image}
                    alt={name}
                    sizes={`(min-width ${screen.md}px) ${imageSize.lg}, ${imageSize.xs}`}
                  />
                )}
              </ArticleImageWrapper>
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
        <ProductOuter>
          <ProductInner>
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
          </ProductInner>
        </ProductOuter>
      </Link>
    );
  }
}

export default CategoryItem;
