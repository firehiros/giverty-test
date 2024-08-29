import * as bcrypt from 'bcrypt';
import { BCRYPT_HASH_ROUND } from '@config/constants';

export const encryptPassword = (password: string) => {
  const hash = bcrypt.hashSync(password, BCRYPT_HASH_ROUND);
  return hash;
};

export const isPasswordMatch = (password: string, hash: string) => {
  const isMatch = bcrypt.compareSync(password, hash);
  return isMatch;
};
