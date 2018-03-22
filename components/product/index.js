import React from 'react';
import PropTypes from 'prop-types';
import { showRight } from '@crystallize/react-layout';

import ProductPropType from 'lib/prop-types/product';
import { Button } from 'components/style';
import { Outer, Inner, Figure, Img, Footer, Price } from './styles';

export default class Product extends React.Component {
  static propTypes = {
    data: ProductPropType,
    addToBasket: PropTypes.func
  };

  add = () => {
    this.props.addToBasket(this.props.data);
    showRight();
  };

  render() {
    const {
      name,
      // link,
      price,
      product_image_resized
    } = this.props.data;

    return (
      <Outer>
        <Inner>
          <Figure>
            <Img src={product_image_resized} alt={name} />
          </Figure>
          <Footer>
            <div>
              <span>{name}</span>
              <Price>{price},-</Price>
            </div>
            <div>
              <Button small onClick={this.add}>
                Add to basket
              </Button>
            </div>
          </Footer>
        </Inner>
      </Outer>
    );
  }
}
