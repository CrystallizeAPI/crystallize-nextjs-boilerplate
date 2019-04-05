import { doPost } from './helpers';

export const sendMagicLink = email => doPost(`api/magic-link/${email}`);
export const logoutUser = () => doPost(`api/user/logout/`);
