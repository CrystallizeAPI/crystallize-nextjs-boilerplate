import React from 'react';
import upper from 'upper-case-first';

import Layout from 'components/layout';
import { H1 } from 'components/style';
import CategoryItem from 'components/category-item';
import withData from 'lib/with-data';
import GraphData from './graph-data';

import { Outer, Loader, List } from './styles';

class CategoryPage extends React.PureComponent {
  render() {
    const { data, router } = this.props;
    const title = upper(router.asPath.replace('/', ''));

    return (
      <Layout {...this.props} title={title}>
        <Outer>
          <H1>Category page</H1>
          {!data || !data.children ? (
            <Loader>Loading...</Loader>
          ) : (
            <List>
              {data.children.map(p => <CategoryItem key={p.id} data={p} />)}
            </List>
          )}
        </Outer>
      </Layout>
    );
  }
}

export default withData(GraphData(CategoryPage));
