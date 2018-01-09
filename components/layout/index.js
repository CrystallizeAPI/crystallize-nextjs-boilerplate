import React from 'react';
import PropTypes from 'prop-types';

import PropTypeCategory from 'lib/prop-types/category';
import Header from '../header';
import GraphData from './graph-data';
import { Outer, Main } from './styles';

class Layout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    categories: PropTypes.arrayOf(PropTypeCategory)
  };

  render() {
    const { children, categories } = this.props;
    return (
      <Outer>
        <Header categories={categories} />
        <Main>{children}</Main>
      </Outer>
    );
  }
}

export default GraphData(Layout);
