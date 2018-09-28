import React from 'react';

import { translate } from 'react-i18next';

import { Grid } from './styles';

class ProductGrid extends React.Component {
  render() {
    return <Grid />;
  }
}

export default translate()(ProductGrid);
