import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BasketConsumer, createBasketItem } from '@crystallize/react-basket';
import { showRight } from '@crystallize/react-layout';

import Layout from 'components/layout';
import { H1, Button, screen } from 'components/style';
import withData from 'lib/with-data';
import PropTypeProduct from 'lib/prop-types/product';
import GraphData from './graph-data';

import { Outer, Loader, Sections, Media, Info, Price } from './styles';

class ProductPage extends React.PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypeProduct)
  };

  static getDerivedStateFromProps(newProps) {
    if (!newProps.data || newProps.data.loading) {
      return {};
    }
    const masterProduct = newProps.data;
    const firstVariation = masterProduct.variations[0];
    return {
      basketItemToAdd: createBasketItem({
        masterProduct,
        variant: firstVariation
      })
    };
  }

  state = {};

  render() {
    const { data } = this.props;
    const { basketItemToAdd } = this.state;

    if (!data || data.loading) {
      return (
        <Layout>
          <Outer>Loading...</Outer>
        </Layout>
      );
    }

    return (
      <Layout {...this.props} title={data.name}>
        <Outer>
          {!data ? (
            <Loader>Loading product page...</Loader>
          ) : (
            <Fragment>
              <H1>{data.name}</H1>
              <Sections>
                <Media>
                  <img
                    src={data.product_image_resized}
                    alt={data.name}
                    srcSet={`
                      ${data.product_image} 750w,
                      ${data.product_image_resized} 500w
                    `}
                    sizes={`
                      (max-width: ${screen.sm}px) 200px,
                      400px
                    `}
                  />
                </Media>
                <Info>
                  <Price>Price: {basketItemToAdd.unit_price},-</Price>
                  <BasketConsumer>
                    {({ actions }) => (
                      <Button
                        type="button"
                        onClick={async () => {
                          actions.addItem(basketItemToAdd);
                          try {
                            await showRight();
                            actions.animateItem(basketItemToAdd);
                          } catch (error) {
                            console.log(error); // eslint-disable-line
                          }
                        }}
                      >
                        Add to basket
                      </Button>
                    )}
                  </BasketConsumer>
                </Info>
              </Sections>
            </Fragment>
          )}
        </Outer>
      </Layout>
    );
  }
}

export default withData(GraphData(ProductPage));
