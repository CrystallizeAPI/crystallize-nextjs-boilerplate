import React from 'react';
import Link from 'next/link';
import { translate } from 'react-i18next';

import ProductPropType from 'lib/prop-types/product';
import { Outer, Inner, Figure, Img, Footer, Price } from './styles';

class CategoryItem extends React.Component {
  static propTypes = {
    data: ProductPropType
  };

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
              <Img src={product_image} alt={name} />
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
