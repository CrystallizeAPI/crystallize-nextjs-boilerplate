import React from 'react';

import Api from 'lib/rest-api';
import UserPage from 'components/userpage';

export default class Page extends React.Component {
  static async getInitialProps({ req }) {
    const data = await Api.getUserPageData(req);
    return data;
  }

  render() {
    return <UserPage {...this.props} />;
  }
}
