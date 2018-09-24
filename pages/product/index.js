/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { BasketConsumer, createBasketItem } from '@crystallize/react-basket';
import { showRight } from '@crystallize/react-layout';
import Img from '@crystallize/react-image';
import { translate } from 'react-i18next';
import { graphql } from 'react-apollo';

import { H1, Button, screen } from 'ui';
import Layout from 'components/layout';
import VariantSelector from 'components/variant-selector';

import graphSettings from './graph-settings';
import { Outer, Sections, Media, Info, Price } from './styles';

class ProductPage extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Determine the selected variant
    if (prevState && !prevState.selectedVariant) {
      const { catalogue } = nextProps.data;
      if (catalogue) {
        const { product } = catalogue;

        let selectedVariant;
        if (product.variations) {
          if (product.default_variation_id) {
            selectedVariant = product.variations.find(
              v => v.id === product.default_variation_id
            );
          }

          if (!selectedVariant) {
            [selectedVariant] = product.variations;
          }
        }

        return {
          selectedVariant
        };
      }
    }
    return {};
  }

  state = {
    selectedVariant: null
  };

  onDimensionValueChange = ({ dimension, value }) => {
    const { selectedVariant } = this.state;
    const newAttributes = selectedVariant.attributes.map(attr => {
      if (attr.attribute_key === dimension.name) {
        return {
          ...attr,
          attribute_value: value.name
        };
      }
      return attr;
    });

    // Find the variant that matches this new attribute set
    const { data } = this.props;
    const { product } = data.catalogue;
    const matchedVariant = product.variations.find(v => {
      let match = true;
      newAttributes.forEach(attr => {
        if (
          !v.attributes.find(
            a =>
              a.attribute_key === attr.attribute_key &&
              a.attribute_value === attr.attribute_value
          )
        ) {
          match = false;
        }
      });
      return match;
    });

    if (matchedVariant) {
      this.setState({
        selectedVariant: matchedVariant
      });
    }
  };

  buy = async () => {
    const { selectedVariant } = this.state;
    const { data, crystallizeBasket } = this.props;
    const { actions } = crystallizeBasket;

    const basketItemToAdd = createBasketItem({
      masterProduct: data.catalogue.product,
      variant: selectedVariant
    });

    actions.addItem(basketItemToAdd);
    await showRight();
    actions.animateItem(basketItemToAdd);
  };

  render() {
    const { data, t } = this.props;
    const { loading, error, catalogue } = data;
    const { selectedVariant } = this.state;

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
              <strong>
                {t('currency', { amount: selectedVariant.price_ex_vat })}
              </strong>
            </Price>
            <VariantSelector
              {...product}
              selectedVariant={selectedVariant}
              onDimensionValueChange={this.onDimensionValueChange}
            />
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
    // No product found on server. Show 404
    if (req && !graphData.catalogue) {
      req.throw404();
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
