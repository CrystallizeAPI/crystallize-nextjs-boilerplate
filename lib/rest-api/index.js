import { doPost } from './helpers';

export const loginRequest = username =>
  doPost('api/login', JSON.stringify({ username }));
// export const sendMagicLink = email => doPost(`api/magic-link/${email}`);
