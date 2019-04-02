import { doPost } from './helpers';

export const sendMagicLink = email => doPost(`api/magic-link/${email}`);
export const validateLogin = token => doPost(`api/validate-login/${token}`);
export const logoutUser = () => doPost(`api/user/logout/`);
