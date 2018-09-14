import React from 'react';
import Link from 'next/link';
import { translate } from 'react-i18next';

import { screen } from 'ui';
import { Outer, Inner, Figure, Img, Footer, Price, imageWidth } from './styles';

class CategoryItem extends React.Component {
  render() {
    const { data, t } = this.props;
    const { name, link, product } = data;

    if (!product) {
      return null;
    }

    const { price, product_image } = product;

    return (
      <Link as={link} href="/product" passHref>
        <Outer>
          <Inner>
            <Figure>
              <Img
                src={product_image}
                alt={name}
                sizes={`(min-width ${screen.md}px) ${imageWidth.lg}, ${
                  imageWidth.xs
                }`}
              />
            </Figure>
            <Footer>
              <div>
                <span>{name}</span>
                <Price>{t('currency', { amount: price })}</Price>
              </div>
            </Footer>
          </Inner>
        </Outer>
      </Link>
    );
  }
}

export default translate()(CategoryItem);
