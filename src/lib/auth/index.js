import Router from 'next/router';

import { doLogout } from 'lib/rest-api';

export const logout = async () => {
  await doLogout();
  Router.push('/login');
};
