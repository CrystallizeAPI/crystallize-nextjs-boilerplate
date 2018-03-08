/**
 * We have to keep a index.js file in here since
 * Next does not map /index/index.js to root atm.
 */

import withData from 'lib/with-data';
import FrontPage from './front-page';

export default withData(FrontPage);
