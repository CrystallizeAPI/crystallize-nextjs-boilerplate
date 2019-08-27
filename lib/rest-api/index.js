import { doGet } from './helpers';

export const sendMagicLink = email => doGet(`api/magic-link/${email}`);
export const verifyToken = token => doGet(`api/verify/${token}`);
export const authenticate = () => doGet(`api/authenticate`);
export const doLogout = () => doGet(`api/logout`);
