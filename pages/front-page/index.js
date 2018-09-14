import React from 'react';

import Layout from 'components/layout';
import { H1 } from 'ui';
import { Outer } from './styles';

export default class FrontPage extends React.Component {
  render() {
    const { router } = this.props;

    return (
      <Layout router={router} title="Front page">
        <Outer>
          <H1>Hello and welcome</H1>
        </Outer>
      </Layout>
    );
  }
}
