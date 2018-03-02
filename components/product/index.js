/* eslint camelcase: 0 */
import React from 'react';

import ProductPropType from 'lib/prop-types/product';
import { Outer, Inner, Figure, Img, Footer, Price } from './styles';

export default class Product extends React.PureComponent {
  static propTypes = {
    data: ProductPropType
  };

  render() {
    const {
      name,
      // link,
      price,
      product_image,
      product_image_resized
    } = this.props.data;

    return (
      <Outer>
        <Inner>
          <Figure>
            <Img
              product_image={product_image}
              product_image_resized={product_image_resized}
              alt={name}
            />
          </Figure>
          <Footer>
            <span>{name}</span>
            <Price>{price},-</Price>
          </Footer>
        </Inner>
      </Outer>
    );
  }
}
