import { connect } from 'react-redux';
import withData from 'lib/with-data';
import FrontPage from 'components/front-page';

const mapStateToProps = state => ({
  frontpageHeading: state.app.frontpageHeading
});

export default withData(connect(mapStateToProps)(FrontPage));
