import Router from 'next/router';
import cookie from 'js-cookie';

export const logout = () => {
  cookie.remove('token');
  Router.push('/login');
};
