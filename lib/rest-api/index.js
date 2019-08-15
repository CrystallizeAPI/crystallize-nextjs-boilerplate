import { doPost, doGet } from './helpers';

export const loginRequest = options => doPost('api/login', options);
export const verifyRequest = options => doGet('api/verify', options);
// export const sendMagicLink = email => doPost(`api/magic-link/${email}`);
