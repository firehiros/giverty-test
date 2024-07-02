import { config } from 'dotenv';

config();

export const LIMIT_PAGE = 25;

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRED_IN,
};

export const RECAPTCHA_CONFIG = {
  SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || '',
  IS_DISABLED: process.env.RECAPTCHA_DISABLED === 'true' ? true : false,
};

export const REDIS_CONFIG = {
  uri: process.env.REDIS_URI,
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};
