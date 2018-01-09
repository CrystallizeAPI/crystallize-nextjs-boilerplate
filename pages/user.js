import React from 'react';

import withGraphData from 'lib/with-graph-data';
import Api from 'lib/rest-api';
import UserPage from 'components/userpage';

class Page extends React.Component {
  static async getInitialProps({ req }) {
    const data = await Api.getUserPageData(req);
    return data;
  }

  render() {
    return <UserPage {...this.props} />;
  }
}

export default withGraphData(Page);
