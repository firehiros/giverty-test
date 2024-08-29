import { MESSAGES } from './index';

export const USER_ERROR = {
  DUPLICATE_EMAIL: 'This mail address already exists',
  RECAPTCHA_INVALID: 'Please perform man-machine certification.',
  USER_INVALID: MESSAGES.MSG_043('Eメールあるいはパスワード'),
  USER_NOT_ACTIVE: 'User does not active yet.',
  USER_NOT_FOUND: 'User not found',
  URL_INVALID: 'Url invalid',
  LANGUAGE_NOT_FOUND: 'Language not found',
  EMAIL_EXIST: 'email already existed',
  OLD_PASSWORD: 'Input new Password same Old Password. Please try again!',
  WRONG_PASSWORD: MESSAGES.MSG_043('現在パスワード'),
  ROLE_NOT_FOUND: 'Role not found',
};
