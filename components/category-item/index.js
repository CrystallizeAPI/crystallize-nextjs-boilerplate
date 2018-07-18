import React from 'react';
import Link from 'next/link';

import ProductPropType from 'lib/prop-types/product';
import { Outer, Inner, Figure, Img, Footer, Price } from './styles';

export default class CategoryItem extends React.Component {
  static propTypes = {
    data: ProductPropType
  };

  render() {
    const { name, link, product } = this.props.data;

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
                <Price>{price},-</Price>
              </div>
            </Footer>
          </Inner>
        </Outer>
      </Link>
    );
  }
}
