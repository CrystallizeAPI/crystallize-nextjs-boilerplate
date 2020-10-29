import { doGet } from './helpers';

export const sendMagicLink = (email) => doGet(`/api/user/magic-link/${email}`);
export const verifyToken = (token) => doGet(`/api/user/verify/${token}`);
export const authenticate = () => doGet(`/api/user/authenticate`);
export const doLogout = () => doGet(`/api/user/logout`);
