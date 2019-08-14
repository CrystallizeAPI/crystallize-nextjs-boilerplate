import Router from 'next/router';
import cookie from 'js-cookie';

export const login = ({ token }) => {
  cookie.set('token', token, { expires: 1 });
  Router.push('/');
};

export const logout = () => {
  cookie.remove('token');
  Router.push('/login');
};
