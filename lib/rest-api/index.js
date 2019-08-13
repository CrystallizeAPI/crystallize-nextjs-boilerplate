import { doPost, doGet } from './helpers';

export const sendMagicLink = email => doGet(`api/magic-link/${email}`);
export const logoutUser = () => doPost(`api/user/logout/`);
