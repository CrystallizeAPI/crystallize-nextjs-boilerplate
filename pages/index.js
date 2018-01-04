import React from 'react';

import Api from '../isomorphic/api';
import FrontPage from '../components/frontpage';

export default class Page extends React.Component {
  static async getInitialProps() {
    const data = await Api.getFrontpageData();
    return data;
  }

  render() {
    return <FrontPage {...this.props} />;
  }
}
