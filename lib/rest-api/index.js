import { doPost } from './helpers';

export const loginUser = email => doPost(`api/login-user/${email}`);
