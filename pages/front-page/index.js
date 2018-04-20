import { connect } from 'react-redux';

import Layout from 'components/layout';
import { H1 } from 'components/style';
import { Outer } from './styles';

const FrontPage = ({ router, frontpageHeading }) => (
  <Layout router={router} title="Front page">
    <Outer>
      <H1>{frontpageHeading}</H1>
    </Outer>
  </Layout>
);

const mapStateToProps = state => ({
  frontpageHeading: state.app.frontpageHeading
});

// Declare the required localization namespaces
FrontPage.l18namespaces = ['basket'];

export default connect(mapStateToProps)(FrontPage);
