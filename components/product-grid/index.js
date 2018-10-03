import React from 'react';
import styled from 'styled-components';

import Product from 'components/category-item';
import { translate } from 'react-i18next';

export const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1px 1px;
  grid-template-areas: '. . . .' '. . . .' '. . . .';
  a:nth-child(7n + 1) {
    grid-column: span 2;
    grid-row: span 2;
  }
`;

class ProductGrid extends React.Component {
  render() {
    const { products } = this.props;

    return (
      <Grid>
        {products.map(item => (
          <Product data={item} key={item.id} />
        ))}
      </Grid>
    );
  }
}

export default translate()(ProductGrid);
