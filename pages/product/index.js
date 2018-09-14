/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { BasketConsumer, createBasketItem } from '@crystallize/react-basket';
import { showRight } from '@crystallize/react-layout';
import Img from '@crystallize/react-image';
import { translate } from 'react-i18next';
import { graphql } from 'react-apollo';

import Layout from 'components/layout';
import { H1, Button, screen } from 'ui';

import graphSettings from './graph-settings';
import { Outer, Sections, Media, Info, Price } from './styles';

class ProductPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Determine the selected variation
    if (prevState && !prevState.selectedVariation) {
      const { catalogue } = nextProps.data;
      if (catalogue) {
        const { product } = catalogue;

        let selectedVariation;
        if (product.variations) {
          if (product.default_variation_id) {
            selectedVariation = product.variations.find(
              v => v.id === product.default_variation_id
            );
          }

          if (!selectedVariation) {
            [selectedVariation] = product.variations;
          }
        }

        return {
          selectedVariation
        };
      }
    }
    return {};
  }

  state = {};

  buy = async () => {
    const { selectedVariation } = this.state;
    const { data, crystallizeBasket } = this.props;
    const { actions } = crystallizeBasket;

    const basketItemToAdd = createBasketItem({
      masterProduct: data.catalogue.product,
      variant: selectedVariation
    });

    actions.addItem(basketItemToAdd);
    await showRight();
    actions.animateItem(basketItemToAdd);
  };

  render() {
    const { data, t } = this.props;
    const { loading, error, catalogue } = data;
    const { selectedVariation } = this.state;

    if (loading) {
      return <Layout loading>Loading...</Layout>;
    }

    if (error || !catalogue) {
      return <Layout error>Error getting product</Layout>;
    }

    const { product } = catalogue;

    return (
      <Outer>
        <H1>{product.name}</H1>
        <Sections>
          <Media>
            <Img
              src={product.product_image}
              alt={product.name}
              sizes={`(max-width: ${screen.sm}px) 200px, 400px`}
            />
          </Media>
          <Info>
            <Price>
              Price:
              {t('currency', { amount: selectedVariation.price_ex_vat })}
            </Price>
            <Button type="button" onClick={this.buy}>
              Add to basket
            </Button>
          </Info>
        </Sections>
      </Outer>
    );
  }
}

class ProductPageDataLoader extends React.Component {
  static getInitialProps({ req, graphData }) {
    if (req) {
      // No product found. Show 404
      if (!graphData.catalogue) {
        const err = new Error();
        err.code = 'ENOENT';
        throw err;
      }
    }
    return {};
  }

  static graph = graphSettings;

  render() {
    const { data, t } = this.props;

    let title = t('Loading');
    if (data.catalogue) {
      title = data.catalogue.product.name;
    }

    return (
      <Layout {...this.props} title={title}>
        <BasketConsumer>
          {basketProps => (
            <ProductPage crystallizeBasket={basketProps} {...this.props} />
          )}
        </BasketConsumer>
      </Layout>
    );
  }
}

export default graphql(
  ProductPageDataLoader.graph.query,
  ProductPageDataLoader.graph
)(translate()(ProductPageDataLoader));
